import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { KafkaService } from '../shared/kafka.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  async createUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isExchanger: boolean;
  }) {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        isExchanger: data.isExchanger,
        isExchangerActive: false,
        isFrozen: false,
      },
    });

    await this.kafka.emit('user.created', {
      userId: user.id,
      email: user.email,
      isExchanger: user.isExchanger,
    });

    return user;
  }

  async updateUser(userId: string, data: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    isExchanger?: boolean;
    isExchangerActive?: boolean;
  }) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
    });

    await this.kafka.emit('user.updated', {
      userId: user.id,
      isExchanger: user.isExchanger,
      isExchangerActive: user.isExchangerActive,
    });

    return user;
  }

  async getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
