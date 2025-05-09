import { Injectable, Logger, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { KafkaService } from '../kafka/kafka.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { ChatType, ChatParticipantRole, UserRole, Comment as PrismaComment, Message as PrismaMessage } from '@prisma/client';
import { NotificationType } from '../client/interfaces/enums';

type Comment = PrismaComment & {
  user: {
    id: string;
    name: string;
    role: UserRole;
  };
};

type Message = PrismaMessage & {
  sender: {
    id: string;
    name: string;
    role: UserRole;
  };
};

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  /**
   * Creates a new chat for a dispute and adds participants
   * @param disputeId - ID of the dispute to create chat for
   * @param userId - ID of the user creating the chat
   * @returns Created chat with participants
   * @throws NotFoundException if dispute not found
   * @throws ForbiddenException if user is not a participant in the dispute
   */
  async createDisputeChat(disputeId: string, userId: string) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: {
        transaction: true,
        initiator: true,
        moderator: true,
      },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    // Verify that the user is a participant in the dispute
    if (userId !== dispute.initiatorId && 
        userId !== dispute.transaction.customerId && 
        userId !== dispute.transaction.exchangerId) {
      throw new ForbiddenException('User is not a participant in this dispute');
    }

    const chat = await this.prisma.chat.create({
      data: {
        type: ChatType.DISPUTE,
        disputeId,
        participants: {
          create: [
            {
              userId: dispute.initiatorId,
              role: dispute.initiator.role === UserRole.CUSTOMER ? ChatParticipantRole.CUSTOMER : ChatParticipantRole.EXCHANGER,
            },
            {
              userId: dispute.transaction.customerId === dispute.initiatorId ? dispute.transaction.exchangerId : dispute.transaction.customerId,
              role: dispute.initiator.role === UserRole.CUSTOMER ? ChatParticipantRole.EXCHANGER : ChatParticipantRole.CUSTOMER,
            },
          ],
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    // Notify participants about new chat
    for (const participant of chat.participants) {
      await this.kafka.sendEvent({
        type: NotificationType.CHAT_CREATED,
        payload: { chatId: chat.id, userId: participant.userId }
      });

      this.notificationsGateway.notifyUser(participant.userId, NotificationType.CHAT_CREATED, {
        chatId: chat.id,
        disputeId,
      });
    }

    return chat;
  }

  /**
   * Adds a moderator to an existing chat
   * @param chatId - ID of the chat to add moderator to
   * @param moderatorId - ID of the user to add as moderator
   * @returns Updated chat with new moderator
   * @throws NotFoundException if chat not found
   * @throws ForbiddenException if user is not a moderator
   */
  async addModeratorToChat(chatId: string, moderatorId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        participants: true,
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const isAlreadyModerator = chat.participants.some(
      p => p.userId === moderatorId && p.role === 'MODERATOR'
    );

    if (isAlreadyModerator) {
      return chat;
    }

    const updatedChat = await this.prisma.chat.update({
      where: { id: chatId },
      data: {
        participants: {
          create: {
            userId: moderatorId,
            role: 'MODERATOR'
          }
        }
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    // Notify moderator about being added to chat
    await this.kafka.sendEvent({
      type: NotificationType.MODERATOR_ADDED_TO_CHAT,
      payload: { chatId, moderatorId }
    });

    this.notificationsGateway.notifyUser(moderatorId, NotificationType.MODERATOR_ADDED_TO_CHAT, {
      chatId,
    });

    return updatedChat;
  }

  /**
   * Sends a message in a chat
   * @param chatId - ID of the chat to send message to
   * @param senderId - ID of the user sending the message
   * @param content - Content of the message
   * @returns Created message
   * @throws NotFoundException if chat not found
   * @throws ForbiddenException if user is not a participant
   */
  async sendMessage(chatId: string, senderId: string, content: string) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        participants: true,
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const participant = chat.participants.find(p => p.userId === senderId);
    if (!participant) {
      throw new ForbiddenException('User is not a participant in this chat');
    }

    const message = await this.prisma.message.create({
      data: {
        content,
        senderId,
        chatId,
      },
      include: {
        sender: true,
      },
    });

    // Notify all participants about new message
    for (const participant of chat.participants) {
      if (participant.userId !== senderId) {
        await this.kafka.sendEvent({
          type: NotificationType.NEW_MESSAGE,
          payload: { chatId, messageId: message.id, userId: participant.userId }
        });

        this.notificationsGateway.notifyUser(participant.userId, NotificationType.NEW_MESSAGE, {
          chatId,
          messageId: message.id,
        });
      }
    }

    return message;
  }

  /**
   * Retrieves messages from a chat with pagination
   * @param chatId - ID of the chat to get messages from
   * @param userId - ID of the user requesting messages
   * @param page - Page number for pagination (default: 1)
   * @param limit - Number of messages per page (default: 50)
   * @returns Object containing messages, total count, page and limit
   * @throws NotFoundException if chat not found
   * @throws ForbiddenException if user is not a participant
   */
  async getChatMessages(chatId: string, userId: string, page = 1, limit = 50) {
    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        participants: true,
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const participant = chat.participants.find(p => p.userId === userId);
    if (!participant) {
      throw new ForbiddenException('User is not a participant in this chat');
    }

    const messages = await this.prisma.message.findMany({
      where: { chatId },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await this.prisma.message.count({
      where: { chatId },
    });

    return {
      messages,
      total,
      page,
      limit,
    };
  }

  /**
   * Gets a chat associated with a dispute for a specific user
   * @param disputeId - ID of the dispute
   * @param userId - ID of the user requesting the chat
   * @returns Chat with participants
   * @throws NotFoundException if chat not found
   */
  async getDisputeChat(disputeId: string, userId: string) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: {
        transaction: true,
      },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    // Check if user is a participant or moderator
    const isParticipant = userId === dispute.transaction.customerId || 
                         userId === dispute.transaction.exchangerId;
    const isModerator = await this.prisma.user.findFirst({
      where: { id: userId, role: 'MODERATOR' }
    });

    if (!isParticipant && !isModerator) {
      throw new ForbiddenException('User is not authorized to view this dispute chat');
    }

    const chat = await this.prisma.chat.findFirst({
      where: {
        disputeId,
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat;
  }

  /**
   * Adds a comment to a dispute chat
   * @param disputeId - ID of the dispute
   * @param userId - ID of the user adding the comment
   * @param text - Comment text
   * @returns Created comment
   * @throws NotFoundException if dispute not found
   * @throws ForbiddenException if user is not authorized to comment
   */
  async addDisputeComment(disputeId: string, userId: string, text: string) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: {
        transaction: true,
        moderator: true,
      },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    // Check if user is a participant or moderator
    const isParticipant = userId === dispute.transaction.customerId || 
                         userId === dispute.transaction.exchangerId;
    const isModerator = await this.prisma.user.findFirst({
      where: { id: userId, role: 'MODERATOR' }
    });

    if (!isParticipant && !isModerator) {
      throw new ForbiddenException('User is not authorized to comment on this dispute');
    }

    const comment = await this.prisma.comment.create({
      data: {
        disputeId,
        userId,
        text,
        isModerator: !!isModerator
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    });

    // Notify other participants
    const otherParticipantId = userId === dispute.transaction.customerId 
      ? dispute.transaction.exchangerId 
      : dispute.transaction.customerId;

    await this.kafka.sendEvent({
      type: NotificationType.DISPUTE_COMMENT_ADDED,
      payload: { disputeId, commentId: comment.id }
    });

    this.notificationsGateway.notifyUser(otherParticipantId, NotificationType.DISPUTE_COMMENT_ADDED, {
      disputeId,
      commentId: comment.id
    });

    return comment;
  }

  /**
   * Gets all comments for a dispute
   * @param disputeId - ID of the dispute
   * @returns Array of comments
   * @throws NotFoundException if dispute not found
   */
  async getDisputeComments(disputeId: string, userId: string): Promise<Comment[]> {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: {
        transaction: true,
      },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    // Check if user is a participant or moderator
    const isParticipant = userId === dispute.transaction.customerId || 
                         userId === dispute.transaction.exchangerId;
    const isModerator = await this.prisma.user.findFirst({
      where: { id: userId, role: 'MODERATOR' }
    });

    if (!isParticipant && !isModerator) {
      throw new ForbiddenException('User is not authorized to view dispute comments');
    }

    const comments = await this.prisma.comment.findMany({
      where: { disputeId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' }
    });

    return comments;
  }

  private async checkModeratorPermissions(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });
    return user?.role === UserRole.MODERATOR;
  }

  async getChatHistory(chatId: string, userId: string, page = 1, limit = 50) {
    const isModerator = await this.checkModeratorPermissions(userId);
    if (!isModerator) {
      throw new ForbiddenException('Only moderators can view chat history');
    }

    const chat = await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        participants: {
          include: {
            user: true
          }
        },
        messages: {
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                role: true
              }
            }
          }
        }
      }
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat;
  }

  async addModeratorComment(disputeId: string, moderatorId: string, text: string) {
    const isModerator = await this.checkModeratorPermissions(moderatorId);
    if (!isModerator) {
      throw new ForbiddenException('Only moderators can add moderator comments');
    }

    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: {
        chat: {
          include: {
            participants: true
          }
        },
        transaction: true
      }
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    const comment = await this.prisma.comment.create({
      data: {
        text,
        disputeId,
        userId: moderatorId,
        isModerator: true
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true
          }
        }
      }
    });

    // Notify participants about moderator comment
    const participants = [dispute.transaction.customerId, dispute.transaction.exchangerId];
    for (const participantId of participants) {
      if (participantId !== moderatorId) {
        await this.kafka.sendEvent({
          type: NotificationType.MODERATOR_COMMENT_ADDED,
          payload: { disputeId, commentId: comment.id, userId: participantId }
        });

        this.notificationsGateway.notifyUser(participantId, NotificationType.MODERATOR_COMMENT_ADDED, {
          disputeId,
          commentId: comment.id
        });
      }
    }

    return comment;
  }
} 