import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { PaymentWebhookDto } from '../dto/payment.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('status')
  @ApiOperation({ 
    summary: 'Обновление статуса платежа', 
    description: 'Обновление статуса платежа через вебхук' 
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        transactionId: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000'
        },
        status: {
          type: 'string',
          enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED'],
          example: 'COMPLETED'
        },
        provider: {
          type: 'string',
          enum: ['BANK_TRANSFER', 'CREDIT_CARD', 'PAYPAL', 'CRYPTO'],
          example: 'BANK_TRANSFER'
        },
        amount: {
          type: 'number',
          example: 1000.50
        },
        currency: {
          type: 'string',
          example: 'USD'
        },
        reference: {
          type: 'string',
          example: 'PAY-123456'
        },
        metadata: {
          type: 'object',
          example: {
            bankName: 'Example Bank',
            accountNumber: '****1234'
          }
        }
      },
      required: ['transactionId', 'status', 'provider', 'amount', 'currency']
    },
    examples: {
      example1: {
        value: {
          transactionId: '123e4567-e89b-12d3-a456-426614174000',
          status: 'COMPLETED',
          provider: 'BANK_TRANSFER',
          amount: 1000.50,
          currency: 'USD',
          reference: 'PAY-123456',
          metadata: {
            bankName: 'Example Bank',
            accountNumber: '****1234'
          }
        },
        summary: 'Пример успешного платежа'
      },
      example2: {
        value: {
          transactionId: '123e4567-e89b-12d3-a456-426614174001',
          status: 'FAILED',
          provider: 'CREDIT_CARD',
          amount: 500.75,
          currency: 'EUR',
          reference: 'PAY-123457',
          metadata: {
            errorCode: 'INSUFFICIENT_FUNDS',
            errorMessage: 'Insufficient funds on card'
          }
        },
        summary: 'Пример неудачного платежа'
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Статус платежа успешно обновлен',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Payment status updated successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Неверный формат данных' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Транзакция не найдена' 
  })
  async updatePaymentStatus(@Body() data: PaymentWebhookDto) {
    return this.paymentService.handleWebhook(data);
  }
} 