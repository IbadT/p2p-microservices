import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

export function ApiCreateDisputeChat() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new chat for a dispute' }),
    ApiParam({ name: 'disputeId', description: 'ID of the dispute' }),
    ApiResponse({ 
      status: 201, 
      description: 'Chat has been successfully created',
      schema: {
        properties: {
          id: { type: 'string' },
          type: { type: 'string', enum: ['DISPUTE'] },
          disputeId: { type: 'string' },
          participants: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                userId: { type: 'string' },
                role: { type: 'string', enum: ['CUSTOMER', 'EXCHANGER'] },
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    role: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }),
    ApiResponse({ status: 403, description: 'Forbidden - User is not a participant in the dispute' }),
    ApiResponse({ status: 404, description: 'Dispute not found' })
  );
}

export function ApiAddModeratorToChat() {
  return applyDecorators(
    ApiOperation({ summary: 'Add a moderator to a chat' }),
    ApiParam({ name: 'chatId', description: 'ID of the chat' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          moderatorId: { type: 'string', description: 'ID of the user to add as moderator' }
        }
      }
    }),
    ApiResponse({ 
      status: 200, 
      description: 'Moderator has been successfully added to the chat',
      schema: {
        properties: {
          id: { type: 'string' },
          participants: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                userId: { type: 'string' },
                role: { type: 'string', enum: ['MODERATOR'] }
              }
            }
          }
        }
      }
    }),
    ApiResponse({ status: 403, description: 'Forbidden - User is not an admin' }),
    ApiResponse({ status: 404, description: 'Chat not found' })
  );
}

export function ApiSendMessage() {
  return applyDecorators(
    ApiOperation({ summary: 'Send a message in a chat' }),
    ApiParam({ name: 'chatId', description: 'ID of the chat' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          content: { type: 'string', description: 'Content of the message' }
        }
      }
    }),
    ApiResponse({ 
      status: 201, 
      description: 'Message has been successfully sent',
      schema: {
        properties: {
          id: { type: 'string' },
          content: { type: 'string' },
          senderId: { type: 'string' },
          chatId: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      }
    }),
    ApiResponse({ status: 403, description: 'Forbidden - User is not a participant in the chat' }),
    ApiResponse({ status: 404, description: 'Chat not found' })
  );
}

export function ApiGetChatMessages() {
  return applyDecorators(
    ApiOperation({ summary: 'Get messages from a chat' }),
    ApiParam({ name: 'chatId', description: 'ID of the chat' }),
    ApiQuery({ name: 'page', required: false, type: 'number', description: 'Page number' }),
    ApiQuery({ name: 'limit', required: false, type: 'number', description: 'Messages per page' }),
    ApiResponse({ 
      status: 200, 
      description: 'Messages retrieved successfully',
      schema: {
        properties: {
          messages: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                content: { type: 'string' },
                senderId: { type: 'string' },
                sender: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    role: { type: 'string' }
                  }
                },
                createdAt: { type: 'string', format: 'date-time' }
              }
            }
          },
          total: { type: 'number' },
          page: { type: 'number' },
          limit: { type: 'number' }
        }
      }
    }),
    ApiResponse({ status: 403, description: 'Forbidden - User is not a participant in the chat' }),
    ApiResponse({ status: 404, description: 'Chat not found' })
  );
}

export function ApiGetDisputeChat() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a chat associated with a dispute' }),
    ApiParam({ name: 'disputeId', description: 'ID of the dispute' }),
    ApiResponse({ 
      status: 200, 
      description: 'Chat retrieved successfully',
      schema: {
        properties: {
          id: { type: 'string' },
          type: { type: 'string', enum: ['DISPUTE'] },
          disputeId: { type: 'string' },
          participants: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                userId: { type: 'string' },
                role: { type: 'string', enum: ['CUSTOMER', 'EXCHANGER', 'MODERATOR'] },
                user: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    role: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }),
    ApiResponse({ status: 404, description: 'Chat not found' })
  );
} 