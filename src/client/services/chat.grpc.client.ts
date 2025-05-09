import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface ChatService {
  createDisputeChat(request: { disputeId: string; initiatorId: string }): Observable<any>;
  addModeratorToChat(request: { chatId: string; moderatorId: string }): Observable<any>;
  sendMessage(request: { chatId: string; senderId: string; content: string }): Observable<any>;
  getChatMessages(request: { chatId: string; userId: string; page: number; limit: number }): Observable<any>;
  getDisputeChat(request: { disputeId: string; userId: string }): Observable<any>;
}

@Injectable()
export class ChatGrpcClient {
  private chatService: ChatService;

  constructor(
    @Inject('CHAT_PACKAGE') private client: ClientGrpc,
  ) {
    this.chatService = this.client.getService<ChatService>('ChatService');
  }

  createDisputeChat(disputeId: string, initiatorId: string): Observable<any> {
    return this.chatService.createDisputeChat({ disputeId, initiatorId });
  }

  addModeratorToChat(chatId: string, moderatorId: string): Observable<any> {
    return this.chatService.addModeratorToChat({ chatId, moderatorId });
  }

  sendMessage(chatId: string, senderId: string, content: string): Observable<any> {
    return this.chatService.sendMessage({ chatId, senderId, content });
  }

  getChatMessages(chatId: string, userId: string, page = 1, limit = 50): Observable<any> {
    return this.chatService.getChatMessages({ chatId, userId, page, limit });
  }

  getDisputeChat(disputeId: string, userId: string): Observable<any> {
    return this.chatService.getDisputeChat({ disputeId, userId });
  }
} 