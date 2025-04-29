import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserRequest, UpdateUserRequest, GetUserRequest } from '../proto/generated/user.pb';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: CreateUserRequest) {
    return this.usersService.createUser({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      isExchanger: data.isExchanger,
    });
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(data: UpdateUserRequest) {
    return this.usersService.updateUser(data.userId, {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      isExchanger: data.isExchanger,
      isExchangerActive: data.isExchangerActive,
    });
  }

  @GrpcMethod('UserService', 'GetUser')
  async getUser(data: GetUserRequest) {
    return this.usersService.getUser(data.userId);
  }
}