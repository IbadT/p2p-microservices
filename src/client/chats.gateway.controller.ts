import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ChatGrpcClient } from './services/chat.grpc.client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { UserRole } from 'src/shared/decorators/roles.decorator';
import {
  CreateDisputeChatDto,
  AddModeratorDto,
  SendMessageDto,
  GetMessagesQueryDto,
  GetDisputeChatQueryDto,
} from './dto/chat.dto';
import {
  ApiCreateDisputeChat,
  ApiAddModeratorToChat,
  ApiSendMessage,
  ApiGetChatMessages,
  ApiGetDisputeChat,
} from './swagger/chat.swagger';

@ApiTags('Chats')
@Controller('chats')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ChatsGatewayController {
  constructor(private readonly chatGrpcClient: ChatGrpcClient) {}

  @Post('dispute/:disputeId')
  @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER)
  @ApiCreateDisputeChat()
  async createDisputeChat(
    @Param('disputeId') disputeId: string,
    @Body() createDisputeChatDto: CreateDisputeChatDto,
  ) {
    return this.chatGrpcClient.createDisputeChat(disputeId, createDisputeChatDto.initiatorId);
  }

  @Post(':chatId/moderator')
  @Roles(UserRole.ADMIN)
  @ApiAddModeratorToChat()
  async addModeratorToChat(
    @Param('chatId') chatId: string,
    @Body() addModeratorDto: AddModeratorDto,
  ) {
    return this.chatGrpcClient.addModeratorToChat(chatId, addModeratorDto.moderatorId);
  }

  @Post(':chatId/messages')
  @ApiSendMessage()
  async sendMessage(
    @Param('chatId') chatId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.chatGrpcClient.sendMessage(chatId, sendMessageDto.senderId, sendMessageDto.content);
  }

  @Get(':chatId/messages')
  @ApiGetChatMessages()
  async getChatMessages(
    @Param('chatId') chatId: string,
    @Query() query: GetMessagesQueryDto,
  ) {
    return this.chatGrpcClient.getChatMessages(chatId, query.userId, query.page, query.limit);
  }

  @Get('dispute/:disputeId')
  @ApiGetDisputeChat()
  async getDisputeChat(
    @Param('disputeId') disputeId: string,
    @Query() query: GetDisputeChatQueryDto,
  ) {
    return this.chatGrpcClient.getDisputeChat({
      disputeId,
      userId: query.userId,
      page: query.page || 1,
      limit: query.limit || 20
    });
  }
} 