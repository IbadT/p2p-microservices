import { Controller, Post, Body, UseGuards, Req, Logger, Get, BadRequestException, Param } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RateLimitGuard } from '../shared/guards/rate-limit.guard';
import { UserGrpcClient } from './services/user.grpc.client';
import { CreateUserDto, UpdateUserDto } from './interfaces/client.swagger';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './interfaces/grpc.interfaces';
import { SecurityManager } from '../shared/utils/security.utils';
import { QueueManager } from '../shared/utils/queue.utils';
import { AuthenticatedRequest } from '../shared/interfaces/request.interface';
import { UsersService } from '../users/users.service';
import { userSchema } from '../shared/schemas/user.schema';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(RateLimitGuard)
export class UsersGatewayController {
  private readonly logger = new Logger(UsersGatewayController.name);

  constructor(private readonly userClient: UserGrpcClient, private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    try {
      const result = await this.userClient.createUser(dto);
      return result as User;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async updateUser(@Body() dto: UpdateUserDto): Promise<User> {
    try {
      const result = await this.userClient.updateUser(dto);
      return result as User;
    } catch (error) {
      this.logger.error(`Failed to update user: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async getProfile(@Req() req: AuthenticatedRequest): Promise<User> {
    if (!req.ip) {
      throw new BadRequestException('IP address is required');
    }
    
    await SecurityManager.checkRateLimit(req.ip, 'getProfile');
    const result = await QueueManager.addToQueue('user', async () => {
      return this.userClient.getUser(req.user.id);
    });
    return result as User;
  }

  @Post('online')
  @ApiOperation({ summary: 'Set user online status' })
  @ApiResponse({ status: 200, description: 'Online status updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async setOnline(@Req() req: AuthenticatedRequest, @Body('isOnline') isOnline: boolean): Promise<void> {
    if (!req.ip) {
      throw new BadRequestException('IP address is required');
    }

    if (!SecurityManager.validateInput({ isOnline }, userSchema.isOnline)) {
      throw new BadRequestException('Invalid input');
    }

    await SecurityManager.checkRateLimit(req.ip, 'setOnline');
    const result = await QueueManager.addToQueue('user', async () => {
      return this.userClient.setOnline(req.user.id, isOnline);
    });
    return result as void;
  }

  @Post('unfreeze')
  @ApiOperation({ summary: 'Unfreeze user account' })
  @ApiResponse({ status: 200, description: 'Account unfrozen successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async unfreeze(@Req() req: AuthenticatedRequest): Promise<void> {
    if (!req.ip) {
      throw new BadRequestException('IP address is required');
    }

    await SecurityManager.checkRateLimit(req.ip, 'unfreeze');
    const result = await QueueManager.addToQueue('user', async () => {
      return this.userClient.unfreeze(req.user.id);
    });
    return result as void;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post(':id/update')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Post(':id/activate')
  @ApiOperation({ summary: 'Activate a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully activated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async activate(@Param('id') id: string) {
    return this.usersService.updateUser(id, { isExchangerActive: true });
  }

  @Post(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deactivated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deactivate(@Param('id') id: string) {
    return this.usersService.updateUser(id, { isExchangerActive: false });
  }
} 