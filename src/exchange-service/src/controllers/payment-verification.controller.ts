import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PaymentVerificationService } from '../services/payment-verification.service';
import { RolesGuard } from '../guards/roles.guard';
import { Roles, UserRole } from '../decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ApiVerifyPayment, ApiRejectPayment } from '../../../client/swagger/client.swagger';
import { VerifyPaymentDto, RejectPaymentDto, PaymentVerificationResponseDto } from '../../../client/interfaces/client.swagger';

@Controller('payment-verification')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentVerificationController {
  constructor(private readonly paymentVerificationService: PaymentVerificationService) {}

  @Post('verify')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  @ApiVerifyPayment()
  async verifyPayment(@Body() data: VerifyPaymentDto) {
    return this.paymentVerificationService.verifyPayment(
      data.transactionId,
      data.verifiedBy,
      {
        bankId: data.bankId,
        bankTransactionId: data.bankTransactionId,
        screenshotUrl: data.screenshotUrl,
        additionalNotes: data.additionalNotes
      }
    );
  }

  @Post('reject')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  @ApiRejectPayment()
  async rejectPayment(@Body() data: RejectPaymentDto) {
    return this.paymentVerificationService.rejectPayment(
      data.transactionId,
      data.rejectedBy,
      data.reason
    );
  }

  @GrpcMethod('PaymentVerificationService', 'VerifyPayment')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async verifyPaymentGrpc(data: VerifyPaymentDto) {
    return this.paymentVerificationService.verifyPayment(
      data.transactionId,
      data.verifiedBy,
      {
        bankId: data.bankId,
        bankTransactionId: data.bankTransactionId,
        screenshotUrl: data.screenshotUrl,
        additionalNotes: data.additionalNotes
      }
    );
  }

  @GrpcMethod('PaymentVerificationService', 'RejectPayment')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async rejectPaymentGrpc(data: RejectPaymentDto) {
    return this.paymentVerificationService.rejectPayment(
      data.transactionId,
      data.rejectedBy,
      data.reason
    );
  }
} 