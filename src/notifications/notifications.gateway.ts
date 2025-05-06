import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  notifyUser(userId: string, event: string, payload: any) {
    this.server.to(userId).emit(event, payload);
  }
} 