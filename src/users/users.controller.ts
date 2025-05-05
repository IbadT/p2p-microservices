import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: {
    email: string;
    password: string;
    role: UserRole;
    isExchangerActive?: boolean;
  }) {
    return this.usersService.createUser(data);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: {
      email?: string;
      password?: string;
      role?: UserRole;
      isExchangerActive?: boolean;
      isFrozen?: boolean;
      frozenUntil?: Date;
      missedOffersCount?: number;
    }
  ) {
    return this.usersService.updateUser(id, data);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}