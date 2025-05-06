import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ 
    summary: 'Check Kafka health status', 
    description: 'Verifies the connection to Kafka by sending a test message'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Kafka is healthy',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'ok'
        },
        kafka: {
          type: 'object',
          properties: {
            connected: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Kafka is healthy'
            }
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 503, 
    description: 'Kafka is not healthy',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'error'
        },
        kafka: {
          type: 'object',
          properties: {
            connected: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Failed to connect to Kafka'
            }
          }
        }
      }
    }
  })
  async checkHealth() {
    return this.appService.checkHealth();
  }
}
