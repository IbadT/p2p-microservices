import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PaymentVerificationService } from '../services/payment-verification.service';
import { RolesGuard } from '../guards/roles.guard';
import { Roles, UserRole } from '../decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('payment-verification')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentVerificationController {
  constructor(private readonly paymentVerificationService: PaymentVerificationService) {}

  @Post('verify')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async verifyPayment(
    @Body() data: { transactionId: string; verifiedBy: string }
  ) {
    return this.paymentVerificationService.verifyPayment(
      data.transactionId,
      data.verifiedBy
    );
  }

  @Post('reject')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async rejectPayment(
    @Body() data: { transactionId: string; rejectedBy: string; reason: string }
  ) {
    return this.paymentVerificationService.rejectPayment(
      data.transactionId,
      data.rejectedBy,
      data.reason
    );
  }

  @GrpcMethod('PaymentVerificationService', 'VerifyPayment')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async verifyPaymentGrpc(data: { transactionId: string; verifiedBy: string }) {
    return this.paymentVerificationService.verifyPayment(
      data.transactionId,
      data.verifiedBy
    );
  }

  @GrpcMethod('PaymentVerificationService', 'RejectPayment')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async rejectPaymentGrpc(data: { 
    transactionId: string; 
    rejectedBy: string; 
    reason: string 
  }) {
    return this.paymentVerificationService.rejectPayment(
      data.transactionId,
      data.rejectedBy,
      data.reason
    );
  }
} 