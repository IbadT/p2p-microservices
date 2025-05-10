import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

interface BankTransactionResponse {
  status: string;
  reason?: string;
  amount?: number;
  currency?: string;
  senderAccount?: string;
  receiverAccount?: string;
  timestamp?: string;
}

interface BankConfig {
  apiUrl: string;
  apiKey: string;
  supportedCurrencies: string[];
  verificationTimeout: number;
}

@Injectable()
export class BankIntegrationService {
  private readonly logger = new Logger(BankIntegrationService.name);
  private readonly bankConfigs: Map<string, BankConfig>;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.bankConfigs = new Map();
    this.initializeBankConfigs();
  }

  private initializeBankConfigs() {
    const banks = this.configService.get('banks', []);
    banks.forEach(bank => {
      this.bankConfigs.set(bank.id, {
        apiUrl: bank.apiUrl,
        apiKey: bank.apiKey,
        supportedCurrencies: bank.supportedCurrencies,
        verificationTimeout: bank.verificationTimeout || 30000
      });
    });
  }

  async verifyTransaction(bankId: string, transactionId: string): Promise<{
    verified: boolean;
    reason?: string | null;
    details?: {
      amount: number;
      currency: string;
      senderAccount: string;
      receiverAccount: string;
      timestamp: string;
    };
  }> {
    const bankConfig = this.bankConfigs.get(bankId);
    if (!bankConfig) {
      throw new Error(`Bank configuration not found for ${bankId}`);
    }

    try {
      const response = await firstValueFrom<AxiosResponse<BankTransactionResponse>>(
        this.httpService.get(`${bankConfig.apiUrl}/transactions/${transactionId}`, {
          headers: {
            'Authorization': `Bearer ${bankConfig.apiKey}`
          },
          timeout: bankConfig.verificationTimeout
        })
      );

      const { status, amount, currency, senderAccount, receiverAccount, timestamp } = response.data;

      if (status === 'COMPLETED' && amount && currency && senderAccount && receiverAccount && timestamp) {
        return {
          verified: true,
          reason: null,
          details: {
            amount,
            currency,
            senderAccount,
            receiverAccount,
            timestamp
          }
        };
      }

      return {
        verified: false,
        reason: response.data.reason || 'Transaction not completed'
      };
    } catch (error) {
      this.logger.error(`Bank transaction verification failed for ${bankId}: ${error.message}`);
      return {
        verified: false,
        reason: 'Failed to verify bank transaction'
      };
    }
  }

  async getSupportedBanks(currency: string): Promise<string[]> {
    return Array.from(this.bankConfigs.entries())
      .filter(([_, config]) => config.supportedCurrencies.includes(currency))
      .map(([bankId]) => bankId);
  }

  async validateBankAccount(bankId: string, accountNumber: string): Promise<boolean> {
    const bankConfig = this.bankConfigs.get(bankId);
    if (!bankConfig) {
      throw new Error(`Bank configuration not found for ${bankId}`);
    }

    try {
      const response = await firstValueFrom<AxiosResponse<{ valid: boolean }>>(
        this.httpService.get(`${bankConfig.apiUrl}/accounts/${accountNumber}/validate`, {
          headers: {
            'Authorization': `Bearer ${bankConfig.apiKey}`
          }
        })
      );

      return response.data.valid;
    } catch (error) {
      this.logger.error(`Bank account validation failed for ${bankId}: ${error.message}`);
      return false;
    }
  }
} 