import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from '@prisma/client';
import { NotificationType } from '../client/interfaces/enums';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createUser(data: {
    email: string;
    password: string;
    role?: UserRole;
    isExchanger?: boolean;
  }) {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        role: data.role || UserRole.CUSTOMER,
        isExchangerActive: data.isExchanger || false,
      },
    });

    await this.kafka.sendEvent({
      type: NotificationType.SYSTEM,
      payload: { userId: user.id }
    });

    this.notificationsGateway.notifyUser(user.id, NotificationType.SYSTEM, {
      message: 'Welcome to our platform!'
    });

    return user;
  }

  async updateUser(data: {
    userId: string;
    email?: string;
    password?: string;
    role?: UserRole;
  }) {
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: {
        email: data.email,
        password: data.password,
        role: data.role,
      },
    });

    await this.kafka.sendEvent({
      type: NotificationType.SYSTEM,
      payload: { userId: user.id }
    });

    this.notificationsGateway.notifyUser(user.id, NotificationType.SYSTEM, {
      message: 'Your profile has been updated'
    });

    return user;
  }

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async setExchangerStatus(data: {
    exchangerId: string;
    online: boolean;
  }) {
    const user = await this.prisma.user.update({
      where: { id: data.exchangerId },
      data: {
        isExchangerActive: data.online,
      },
    });

    await this.kafka.sendEvent({
      type: NotificationType.EXCHANGER_STATUS_CHECKED,
      payload: { exchangerId: user.id, online: data.online }
    });

    return user;
  }

  async freezeUser(data: {
    userId: string;
    reason: string;
    duration?: number;
  }) {
    const user = await this.prisma.user.update({
      where: { id: data.userId },
      data: {
        isFrozen: true,
        frozenUntil: data.duration ? new Date(Date.now() + data.duration) : null,
      },
    });

    await this.kafka.sendEvent({
      type: NotificationType.EXCHANGER_STATUS_FROZEN,
      payload: { userId: user.id, reason: data.reason }
    });

    this.notificationsGateway.notifyUser(user.id, NotificationType.SECURITY, {
      message: `Your account has been frozen: ${data.reason}`
    });

    return user;
  }

  async unfreezeUser(userId: string) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        isFrozen: false,
        frozenUntil: null,
      },
    });

    await this.kafka.sendEvent({
      type: NotificationType.SYSTEM,
      payload: { userId: user.id }
    });

    this.notificationsGateway.notifyUser(user.id, NotificationType.SYSTEM, {
      message: 'Your account has been unfrozen'
    });

    return user;
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

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
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
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
  }
}
