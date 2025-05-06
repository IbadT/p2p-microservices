import { Controller, Post, Body, UseGuards, Req, Logger, Get, BadRequestException, Param, Put } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RateLimitGuard } from '../shared/guards/rate-limit.guard';
import { UserGrpcClient } from './services/user.grpc.client';
import { CreateUserDto, UpdateUserDto } from './interfaces/client.swagger';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './interfaces/grpc.interfaces';
import { SecurityManager } from '../shared/utils/security.utils';
import { QueueManager } from '../shared/utils/queue.utils';
import { AuthenticatedRequest } from '../shared/interfaces/request.interface';
import { UsersService } from '../users/users.service';
import { userSchema } from '../shared/schemas/user.schema';
import { firstValueFrom } from 'rxjs';
import {
  ApiCreateUser,
  ApiUpdateUser,
  ApiGetUserProfile,
  ApiSetOnline,
  ApiUnfreeze,
  ApiGetAllUsers,
  ApiGetUserById,
  ApiActivateExchanger,
  ApiDeactivateExchanger
} from './swagger/client.swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(RateLimitGuard)
export class UsersGatewayController {
  private readonly logger = new Logger(UsersGatewayController.name);

  constructor(private readonly userClient: UserGrpcClient, private readonly usersService: UsersService) {}

  @Post()
  @ApiCreateUser()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    try {
      return await firstValueFrom(this.userClient.createUser(dto));
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiUpdateUser()
  async updateUser(@Body() dto: UpdateUserDto): Promise<User> {
    try {
      return await firstValueFrom(this.userClient.updateUser(dto));
    } catch (error) {
      this.logger.error(`Failed to update user: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get('profile')
  @ApiGetUserProfile()
  async getProfile(@Req() req: AuthenticatedRequest): Promise<User> {
    if (!req.ip) {
      throw new BadRequestException('IP address is required');
    }
    
    await SecurityManager.checkRateLimit(req.ip, 'getProfile');
    const result = await QueueManager.addToQueue('user', async () => {
      return firstValueFrom(this.userClient.getUser(req.user.id));
    });
    return result;
  }

  @Post('online')
  @ApiSetOnline()
  async setOnline(@Req() req: any, @Body('isOnline') isOnline: boolean): Promise<void> {
    return firstValueFrom(this.userClient.setOnline({ id: req.user.id, isOnline }));
  }

  @Post('unfreeze')
  @ApiUnfreeze()
  async unfreeze(@Req() req: any): Promise<void> {
    return firstValueFrom(this.userClient.unfreeze({ id: req.user.id }));
  }

  @Get()
  @ApiGetAllUsers()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiGetUserById()
  async findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @ApiUpdateUser()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const { email, password, role } = updateUserDto;
    return this.usersService.updateUser({ userId: id, email, password, role });
  }

  @Put(':id/activate')
  @ApiActivateExchanger()
  async activateExchanger(@Param('id') id: string): Promise<User> {
    return this.usersService.setExchangerStatus({ exchangerId: id, online: true });
  }

  @Put(':id/deactivate')
  @ApiDeactivateExchanger()
  async deactivateExchanger(@Param('id') id: string): Promise<User> {
    return this.usersService.setExchangerStatus({ exchangerId: id, online: false });
  }
} 