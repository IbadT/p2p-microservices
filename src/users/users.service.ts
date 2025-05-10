import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaProducerService } from '../kafka/kafka.producer';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from '@prisma/client';
import { NotificationType } from '../client/interfaces/enums';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private prisma: PrismaService,
    private readonly kafkaProducer: KafkaProducerService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role?: UserRole;
    isExchanger?: boolean;
  }) {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          password: data.password,
          name: `${data.firstName} ${data.lastName}`,
          role: data.role || UserRole.CUSTOMER,
          isExchangerActive: data.isExchanger || false,
        },
      });

      await this.kafkaProducer.sendMessage('users', {
        type: 'CREATE',
        data: user,
        timestamp: new Date().toISOString()
      });

      await this.notificationsGateway.notifyUser(user.id, NotificationType.SYSTEM, {
        message: 'Welcome to our platform!'
      });

      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw error;
    }
  }

  async updateUser(data: {
    userId: string;
    email?: string;
    password?: string;
    role?: UserRole;
  }) {
    try {
      const user = await this.prisma.user.update({
        where: { id: data.userId },
        data: {
          email: data.email,
          password: data.password,
          role: data.role,
        },
      });

      await this.kafkaProducer.sendMessage('users', {
        type: 'UPDATE',
        data: user,
        timestamp: new Date().toISOString()
      });

      await this.notificationsGateway.notifyUser(user.id, NotificationType.SYSTEM, {
        message: 'Your profile has been updated'
      });

      return user;
    } catch (error) {
      this.logger.error(`Failed to update user ${data.userId}: ${error.message}`);
      throw error;
    }
  }

  async getUser(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.kafkaProducer.sendMessage('users', {
        type: 'GET',
        data: { id: userId },
        timestamp: new Date().toISOString()
      });

      return user;
    } catch (error) {
      this.logger.error(`Failed to get user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async setExchangerStatus(data: {
    exchangerId: string;
    online: boolean;
  }) {
    try {
      const user = await this.prisma.user.update({
        where: { id: data.exchangerId },
        data: {
          isExchangerActive: data.online,
        },
      });

      await this.kafkaProducer.sendMessage('users', {
        type: 'UPDATE',
        data: user,
        timestamp: new Date().toISOString()
      });

      return user;
    } catch (error) {
      this.logger.error(`Failed to update exchanger status for ${data.exchangerId}: ${error.message}`);
      throw error;
    }
  }

  async freezeUser(data: {
    userId: string;
    reason: string;
    duration?: number;
  }) {
    try {
      const user = await this.prisma.user.update({
        where: { id: data.userId },
        data: {
          isFrozen: true,
          frozenUntil: data.duration ? new Date(Date.now() + data.duration) : null,
        },
      });

      await this.kafkaProducer.sendMessage('users', {
        type: 'UPDATE',
        data: user,
        timestamp: new Date().toISOString()
      });

      await this.notificationsGateway.notifyUser(user.id, NotificationType.SECURITY, {
        message: `Your account has been frozen: ${data.reason}`
      });

      return user;
    } catch (error) {
      this.logger.error(`Failed to freeze user ${data.userId}: ${error.message}`);
      throw error;
    }
  }

  async unfreezeUser(userId: string) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          isFrozen: false,
          frozenUntil: null,
        },
      });

      await this.kafkaProducer.sendMessage('users', {
        type: 'UPDATE',
        data: user,
        timestamp: new Date().toISOString()
      });

      await this.notificationsGateway.notifyUser(user.id, NotificationType.SYSTEM, {
        message: 'Your account has been unfrozen'
      });

      return user;
    } catch (error) {
      this.logger.error(`Failed to unfreeze user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return null;
      }

      await this.kafkaProducer.sendMessage('users', {
        type: 'GET',
        data: { id },
        timestamp: new Date().toISOString()
      });

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        isExchangerActive: user.isExchangerActive,
        isFrozen: user.isFrozen,
        frozenUntil: user.frozenUntil,
        missedOffersCount: user.missedOffersCount,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      this.logger.error(`Failed to get user by id ${id}: ${error.message}`);
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany();

      await this.kafkaProducer.sendMessage('users', {
        type: 'LIST',
        data: { count: users.length },
        timestamp: new Date().toISOString()
      });

      return users.map(user => ({
        id: user.id,
        email: user.email,
        role: user.role,
        isExchangerActive: user.isExchangerActive,
        isFrozen: user.isFrozen,
        frozenUntil: user.frozenUntil,
        missedOffersCount: user.missedOffersCount,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));
    } catch (error) {
      this.logger.error(`Failed to fetch users: ${error.message}`);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: { id }
      });

      await this.kafkaProducer.sendMessage('users', {
        type: 'DELETE',
        data: { id },
        timestamp: new Date().toISOString()
      });

      return user;
    } catch (error) {
      this.logger.error(`Failed to delete user ${id}: ${error.message}`);
      throw error;
    }
  }
}
