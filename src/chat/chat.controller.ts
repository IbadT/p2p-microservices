import { Controller, Get, Post, Body, Param, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Roles, UserRole } from '../shared/decorators/roles.decorator';
import { User } from '../shared/decorators/user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { 
  ApiCreateDisputeChat, 
  ApiAddModeratorToChat, 
  ApiSendMessage, 
  ApiGetChatMessages, 
  ApiGetDisputeChat 
} from '../client/swagger/chat.swagger';

@ApiTags('Chats')
@ApiBearerAuth()
@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiCreateDisputeChat()
  @Post('dispute/:disputeId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER)
  async createDisputeChat(
    @Param('disputeId') disputeId: string,
    @User('id') userId: string,
  ) {
    return this.chatService.createDisputeChat(disputeId, userId);
  }

  @ApiAddModeratorToChat()
  @Post(':chatId/moderator')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async addModerator(
    @Param('chatId') chatId: string,
    @Body('moderatorId') moderatorId: string,
  ) {
    return this.chatService.addModeratorToChat(chatId, moderatorId);
  }

  @ApiSendMessage()
  @Post(':chatId/messages')
  async sendMessage(
    @Param('chatId') chatId: string,
    @User('id') userId: string,
    @Body('content') content: string,
  ) {
    return this.chatService.sendMessage(chatId, userId, content);
  }

  @ApiGetChatMessages()
  @Get(':chatId/messages')
  async getMessages(
    @Param('chatId') chatId: string,
    @User('id') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ) {
    return this.chatService.getChatMessages(chatId, userId, page, limit);
  }

  @ApiGetDisputeChat()
  @Get('dispute/:disputeId')
  async getDisputeChat(
    @Param('disputeId') disputeId: string,
    @User('id') userId: string,
  ) {
    return this.chatService.getDisputeChat(disputeId, userId);
  }

  @Get(':chatId/history')
  @UseGuards(RolesGuard)
  @Roles(UserRole.MODERATOR)
  @ApiOperation({ summary: 'Get chat history' })
  @ApiResponse({ status: 200, description: 'Returns chat history' })
  async getChatHistory(
    @Param('chatId') chatId: string,
    @User('id') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ) {
    try {
      return await this.chatService.getChatHistory(chatId, userId, page, limit);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post(':disputeId/moderator-comment')
  @UseGuards(RolesGuard)
  @Roles(UserRole.MODERATOR)
  @ApiOperation({ summary: 'Add moderator comment to dispute' })
  @ApiResponse({ status: 201, description: 'Comment added successfully' })
  async addModeratorComment(
    @Param('disputeId') disputeId: string,
    @User('id') moderatorId: string,
    @Body('text') text: string,
  ) {
    try {
      return await this.chatService.addModeratorComment(disputeId, moderatorId, text);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * gRPC method to create a dispute chat
   * @param data - Object containing disputeId and userId
   * @returns Created chat
   */
  @GrpcMethod('ChatService', 'CreateDisputeChat')
  async createDisputeChatGrpc(data: { disputeId: string; userId: string }) {
    return this.chatService.createDisputeChat(data.disputeId, data.userId);
  }

  /**
   * gRPC method to add a moderator to a chat
   * @param data - Object containing chatId and moderatorId
   * @returns Updated chat
   */
  @GrpcMethod('ChatService', 'AddModeratorToChat')
  async addModeratorToChatGrpc(data: { chatId: string; moderatorId: string }) {
    return this.chatService.addModeratorToChat(data.chatId, data.moderatorId);
  }

  /**
   * gRPC method to send a message
   * @param data - Object containing chatId, senderId and content
   * @returns Created message
   */
  @GrpcMethod('ChatService', 'SendMessage')
  async sendMessageGrpc(data: { chatId: string; senderId: string; content: string }) {
    return this.chatService.sendMessage(data.chatId, data.senderId, data.content);
  }

  /**
   * gRPC method to get chat messages
   * @param data - Object containing chatId, userId, page and limit
   * @returns Paginated messages
   */
  @GrpcMethod('ChatService', 'GetChatMessages')
  async getChatMessagesGrpc(data: { chatId: string; userId: string; page?: number; limit?: number }) {
    return this.chatService.getChatMessages(data.chatId, data.userId, data.page, data.limit);
  }

  /**
   * gRPC method to get a dispute chat
   * @param data - Object containing disputeId and userId
   * @returns Chat with participants
   */
  @GrpcMethod('ChatService', 'GetDisputeChat')
  async getDisputeChatGrpc(data: { disputeId: string; userId: string }) {
    return this.chatService.getDisputeChat(data.disputeId, data.userId);
  }

  /**
   * gRPC method to add a comment to a dispute
   * @param data - Object containing disputeId, userId and text
   * @returns Created comment
   */
  @GrpcMethod('ChatService', 'AddDisputeComment')
  async addDisputeCommentGrpc(data: { disputeId: string; userId: string; text: string }) {
    return this.chatService.addDisputeComment(data.disputeId, data.userId, data.text);
  }

  /**
   * gRPC method to get all comments for a dispute
   * @param data - Object containing disputeId and userId
   * @returns Array of comments
   */
  @GrpcMethod('ChatService', 'GetDisputeComments')
  async getDisputeCommentsGrpc(data: { disputeId: string; userId: string }) {
    return this.chatService.getDisputeComments(data.disputeId, data.userId);
  }

  @GrpcMethod('ChatService', 'GetChatHistory')
  async getChatHistoryGrpc(data: { chatId: string; userId: string; page?: number; limit?: number }) {
    return this.chatService.getChatHistory(data.chatId, data.userId, data.page, data.limit);
  }

  @GrpcMethod('ChatService', 'AddModeratorComment')
  async addModeratorCommentGrpc(data: { disputeId: string; moderatorId: string; text: string }) {
    return this.chatService.addModeratorComment(data.disputeId, data.moderatorId, data.text);
  }
} 