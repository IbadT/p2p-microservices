import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { 
  Chat, 
  Comment, 
  GetChatMessagesResponse, 
  GetChatHistoryResponse,
  GetDisputeCommentsResponse,
  AddModeratorCommentRequest
} from '../../proto/generated/chat.pb';

interface ChatService {
  createDisputeChat(request: { disputeId: string; initiatorId: string }): Observable<Chat>;
  addModeratorToChat(request: { chatId: string; moderatorId: string }): Observable<Chat>;
  sendMessage(request: { chatId: string; senderId: string; content: string }): Observable<Comment>;
  getChatMessages(request: { chatId: string; userId: string; page: number; limit: number }): Observable<GetChatMessagesResponse>;
  getDisputeChat(request: { disputeId: string; userId: string; page: number; limit: number }): Observable<GetChatHistoryResponse>;
  addModeratorComment(request: AddModeratorCommentRequest): Observable<Comment>;
  getDisputeComments(request: { disputeId: string; userId: string; page: number; limit: number }): Observable<GetDisputeCommentsResponse>;
}

@Injectable()
export class ChatGrpcClient {
  private chatService: ChatService;

  constructor(
    @Inject('CHAT_PACKAGE') private client: ClientGrpc,
  ) {
    this.chatService = this.client.getService<ChatService>('ChatService');
  }

  createDisputeChat(disputeId: string, initiatorId: string): Observable<Chat> {
    return this.chatService.createDisputeChat({ disputeId, initiatorId });
  }

  addModeratorToChat(chatId: string, moderatorId: string): Observable<Chat> {
    return this.chatService.addModeratorToChat({ chatId, moderatorId });
  }

  sendMessage(chatId: string, senderId: string, content: string): Observable<Comment> {
    return this.chatService.sendMessage({ chatId, senderId, content });
  }

  getChatMessages(chatId: string, userId: string, page = 1, limit = 50): Observable<GetChatMessagesResponse> {
    return this.chatService.getChatMessages({ chatId, userId, page, limit });
  }

  getDisputeChat(request: { disputeId: string; userId: string; page: number; limit: number }): Observable<GetChatHistoryResponse> {
    return this.chatService.getDisputeChat(request);
  }

  addModeratorComment(request: AddModeratorCommentRequest): Observable<Comment> {
    return this.chatService.addModeratorComment(request);
  }

  getDisputeComments(request: { disputeId: string; userId: string; page: number; limit: number }): Observable<GetDisputeCommentsResponse> {
    return this.chatService.getDisputeComments(request);
  }
} 