import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserRequest, GetUserRequest } from '../proto/generated/user.pb';
import { UserRole } from '@prisma/client';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UsersService', 'CreateUser')
  async createUser(data: CreateUserRequest) {
    return this.usersService.createUser({
      email: data.email,
      password: data.password,
      role: data.role as UserRole,
      isExchangerActive: data.isExchanger,
    });
  }

  @GrpcMethod('UsersService', 'GetUser')
  async getUser(data: GetUserRequest) {
    return this.usersService.getUserById(data.userId);
  }
}