import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
  // Очистка базы данных
  await prisma.$transaction([
    prisma.review.deleteMany(),
    prisma.dispute.deleteMany(),
    prisma.exchangeTransaction.deleteMany(),
    prisma.exchangeOffer.deleteMany(),
    prisma.exchangeListing.deleteMany(),
    prisma.userBalance.deleteMany(),
    prisma.balanceHold.deleteMany(),
    prisma.exchangerSettings.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Создание пользователей
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'customer1@example.com',
        password: await bcrypt.hash('testpassword', SALT_ROUNDS),
        role: 'CUSTOMER',
      },
      {
        email: 'exchanger1@example.com',
        password: await bcrypt.hash('testpassword', SALT_ROUNDS),
        role: 'EXCHANGER',
        isExchangerActive: true,
      },
      {
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpassword', SALT_ROUNDS),
        role: 'ADMIN',
      },
      {
        email: 'moderator@example.com',
        password: await bcrypt.hash('modpassword', SALT_ROUNDS),
        role: 'MODERATOR',
      },
    ],
  });

  const [customer, exchanger, admin, moderator] = await prisma.user.findMany();

  // Настройки балансов
  await prisma.userBalance.createMany({
    data: [
      {
        userId: customer.id,
        cryptoBalance: { BTC: 0.5, ETH: 5 },
        totalHoldAmount: {},
      },
      {
        userId: exchanger.id,
        cryptoBalance: { BTC: 10, ETH: 100 },
        totalHoldAmount: {},
      },
    ],
  });

  // Настройки обменника
  await prisma.exchangerSettings.create({
    data: {
      userId: exchanger.id,
      preferredPaymentMethods: ['BANK_TRANSFER', 'PAYPAL'],
      autoAcceptOffers: false,
    },
  });

  // Создание листингов
  const listings = await prisma.exchangeListing.createMany({
    data: [
      {
        userId: exchanger.id,
        type: 'CRYPTO_TO_FIAT',
        cryptocurrency: 'BTC',
        fiatCurrency: 'USD',
        rate: 30000,
        minAmount: 0.01,
        maxAmount: 0.5,
        availableAmount: 0.5,
        paymentMethods: ['BANK_TRANSFER', 'PAYPAL'],
      },
      {
        userId: exchanger.id,
        type: 'FIAT_TO_CRYPTO',
        cryptocurrency: 'ETH',
        fiatCurrency: 'USD',
        rate: 2000,
        minAmount: 100,
        maxAmount: 5000,
        availableAmount: 5000,
        paymentMethods: ['WISE', 'CASH'],
      },
    ],
  });

  const [btcListing, ethListing] = await prisma.exchangeListing.findMany();

  // Создание офферов
  const offers = await prisma.exchangeOffer.createMany({
    data: [
      {
        userId: customer.id,
        listingId: btcListing.id,
        amount: 0.1,
        status: 'PENDING',
      },
      {
        userId: customer.id,
        listingId: ethListing.id,
        amount: 200,
        status: 'ACCEPTED',
      },
    ],
  });

  const [pendingOffer, acceptedOffer] = await prisma.exchangeOffer.findMany();

  // Создание транзакций
  const transactions = await prisma.exchangeTransaction.createMany({
    data: [
      {
        type: 'CRYPTO_TO_FIAT',
        status: 'PENDING_PAYMENT',
        cryptocurrency: 'BTC',
        fiatCurrency: 'USD',
        cryptoAmount: 0.1,
        fiatAmount: 3000,
        customerId: customer.id,
        exchangerId: exchanger.id,
        listingId: btcListing.id,
        offerId: pendingOffer.id,
        confirmationDeadline: new Date(Date.now() + 30 * 60 * 1000),
      },
      {
        type: 'FIAT_TO_CRYPTO',
        status: 'PAYMENT_SENT',
        cryptocurrency: 'ETH',
        fiatCurrency: 'USD',
        cryptoAmount: 0.1,
        fiatAmount: 200,
        customerId: customer.id,
        exchangerId: exchanger.id,
        listingId: ethListing.id,
        offerId: acceptedOffer.id,
        confirmationDeadline: new Date(Date.now() + 30 * 60 * 1000),
      },
    ],
  });

  // Создание холдов
  await prisma.balanceHold.createMany({
    data: [
      {
        userId: customer.id,
        cryptocurrency: 'BTC',
        amount: 0.1,
        type: 'EXCHANGE_OFFER',
        relatedTransactionId: pendingOffer.id,
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      },
    ],
  });

  // Создание спора
  const dispute = await prisma.dispute.create({
    data: {
      reason: 'Не подтвержден платеж',
      status: 'OPEN',
      transactionId: transactions[0].id,
      initiatorId: customer.id,
    },
  });

  // Создание отзыва
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Отличный сервис!',
      transactionId: transactions[1].id,
      authorId: customer.id,
      targetId: exchanger.id,
    },
  });

  console.log('Seed data successfully created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });