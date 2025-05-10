import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PaymentService } from '../services/payment.service';
import { PaymentWebhookDto } from '../dto/payment.dto';

@Controller()
export class PaymentGrpcController {
  constructor(private readonly paymentService: PaymentService) {}

  @GrpcMethod('PaymentService', 'HandleWebhook')
  async handleWebhook(data: PaymentWebhookDto) {
    return this.paymentService.handleWebhook(data);
  }

  @GrpcMethod('PaymentService', 'GetPaymentStatus')
  async getPaymentStatus(data: { transactionId: string }) {
    return this.paymentService.getPaymentStatus(data.transactionId);
  }
} 