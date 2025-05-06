import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationType } from '../client/interfaces/enums';

@WebSocketGateway({
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