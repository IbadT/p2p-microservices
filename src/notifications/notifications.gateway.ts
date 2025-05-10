import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationType } from '../client/interfaces/enums';

@Injectable()
@WebSocketGateway({
  namespace: 'notifications',
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  notifyUser(userId: string, event: NotificationType, payload: Record<string, unknown>) {
    this.server.to(userId).emit(event, payload);
  }
} 