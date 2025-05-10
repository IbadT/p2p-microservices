 export default () => ({
  payment: {
    providers: {
      bankTransfer: {
        enabled: true,
        webhookSecret: process.env.BANK_TRANSFER_WEBHOOK_SECRET,
        apiKey: process.env.BANK_TRANSFER_API_KEY,
        apiUrl: process.env.BANK_TRANSFER_API_URL,
      },
      paypal: {
        enabled: true,
        clientId: process.env.PAYPAL_CLIENT_ID,
        clientSecret: process.env.PAYPAL_CLIENT_SECRET,
        webhookSecret: process.env.PAYPAL_WEBHOOK_SECRET,
      },
      wise: {
        enabled: true,
        apiKey: process.env.WISE_API_KEY,
        webhookSecret: process.env.WISE_WEBHOOK_SECRET,
      },
      stripe: {
        enabled: true,
        secretKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      }
    },
    verification: {
      autoVerify: false, // Автоматическая верификация платежей
      requireModeratorApproval: true, // Требуется подтверждение модератором
      maxVerificationTime: 24 * 60 * 60 * 1000, // Максимальное время на верификацию (24 часа)
    },
    security: {
      minAmount: 10, // Минимальная сумма транзакции
      maxAmount: 10000, // Максимальная сумма транзакции
      requireKyc: true, // Требуется KYC для больших сумм
      kycThreshold: 1000, // Порог суммы для KYC
    }
  }
});