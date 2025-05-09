import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UserRole } from '@prisma/client';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isExchanger: boolean;
    role: UserRole;
  }) {
    return this.usersService.createUser({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      isExchanger: data.isExchanger,
      role: data.role,
    });
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(data: {
    userId: string;
    email?: string;
    password?: string;
    role?: UserRole;
  }) {
    return this.usersService.updateUser({
      userId: data.userId,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  }

  @GrpcMethod('UserService', 'GetUser')
  async getUser(data: { userId: string }) {
    return this.usersService.getUser(data.userId);
  }
}