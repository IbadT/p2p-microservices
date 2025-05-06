import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  async createUser(data: {
    email: string;
    password: string;
    role: UserRole;
    isExchangerActive?: boolean;
  }) {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        role: data.role,
        isExchangerActive: data.isExchangerActive || false,
      },
    });

    await this.kafka.sendEvent({
      type: "user.created",
      payload: {
        userId: user.id,
        email: user.email,
        isExchangerActive: user.isExchangerActive,
      }
    })

    return user;
  }

  async updateUser(id: string, data: {
    email?: string;
    password?: string;
    role?: UserRole;
    isExchangerActive?: boolean;
    isFrozen?: boolean;
    frozenUntil?: Date;
    missedOffersCount?: number;
  }) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        password: data.password,
        role: data.role,
        isExchangerActive: data.isExchangerActive,
        isFrozen: data.isFrozen,
        frozenUntil: data.frozenUntil,
        missedOffersCount: data.missedOffersCount,
      },
    });

    await this.kafka.sendEvent({
      type: "user.updated",
      payload: {
        userId: user.id,
        isExchangerActive: user.isExchangerActive,
      }
    })

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

  async getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
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
