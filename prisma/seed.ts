import { PrismaClient, UserRole, TransactionStatus, DisputeStatus, HoldType, ExchangeType, PaymentMethod } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function createUsers() {
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'customer1@example.com',
        password: await bcrypt.hash('testpassword', SALT_ROUNDS),
        role: UserRole.CUSTOMER,
        name: 'Иван Петров',
      },
      {
        email: 'customer2@example.com',
        password: await bcrypt.hash('testpassword', SALT_ROUNDS),
        role: UserRole.CUSTOMER,
        name: 'Мария Иванова',
      },
      {
        email: 'exchanger1@example.com',
        password: await bcrypt.hash('testpassword', SALT_ROUNDS),
        role: UserRole.EXCHANGER,
        isExchangerActive: true,
        name: 'Алексей Смирнов',
      },
      {
        email: 'exchanger2@example.com',
        password: await bcrypt.hash('testpassword', SALT_ROUNDS),
        role: UserRole.EXCHANGER,
        isExchangerActive: true,
        name: 'Елена Кузнецова',
      },
      {
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpassword', SALT_ROUNDS),
        role: UserRole.ADMIN,
        name: 'Администратор',
      },
      {
        email: 'moderator@example.com',
        password: await bcrypt.hash('modpassword', SALT_ROUNDS),
        role: UserRole.MODERATOR,
        name: 'Модератор',
      },
    ],
  });

  return prisma.user.findMany();
}

async function createBalances(users) {
  const [customer1, customer2, exchanger1, exchanger2] = users;
  
  await prisma.userBalance.createMany({
    data: [
      {
        userId: customer1.id,
        cryptoBalance: { BTC: 1.5, ETH: 5, USDT: 1000 },
        fiatBalance: { USD: 5000, EUR: 4000 },
        totalHoldAmount: {},
      },
      {
        userId: customer2.id,
        cryptoBalance: { BTC: 0.5, ETH: 2, USDT: 500 },
        fiatBalance: { USD: 2000, EUR: 1500 },
        totalHoldAmount: {},
      },
      {
        userId: exchanger1.id,
        cryptoBalance: { BTC: 5, ETH: 20, USDT: 5000 },
        fiatBalance: { USD: 10000, EUR: 8000 },
        totalHoldAmount: {},
      },
      {
        userId: exchanger2.id,
        cryptoBalance: { BTC: 3, ETH: 15, USDT: 3000 },
        fiatBalance: { USD: 8000, EUR: 6000 },
        totalHoldAmount: {},
      },
    ],
  });
}

async function createExchangerSettings(users) {
  const [, , exchanger1, exchanger2] = users;

  await prisma.exchangerSettings.createMany({
    data: [
      {
        userId: exchanger1.id,
        preferredPaymentMethods: [PaymentMethod.BANK_TRANSFER, PaymentMethod.PAYPAL],
        autoAcceptOffers: false,
        workingHours: {
          monday: { start: '09:00', end: '18:00' },
          tuesday: { start: '09:00', end: '18:00' },
          wednesday: { start: '09:00', end: '18:00' },
          thursday: { start: '09:00', end: '18:00' },
          friday: { start: '09:00', end: '18:00' },
        },
        minimumRating: 4.5,
      },
      {
        userId: exchanger2.id,
        preferredPaymentMethods: [PaymentMethod.WISE, PaymentMethod.CASH],
        autoAcceptOffers: true,
        workingHours: {
          monday: { start: '10:00', end: '20:00' },
          tuesday: { start: '10:00', end: '20:00' },
          wednesday: { start: '10:00', end: '20:00' },
          thursday: { start: '10:00', end: '20:00' },
          friday: { start: '10:00', end: '20:00' },
        },
        minimumRating: 4.0,
      },
    ],
  });
}

async function createListings(users) {
  const [, , exchanger1, exchanger2] = users;

  return prisma.exchangeListing.createMany({
    data: [
      {
        userId: exchanger1.id,
        type: ExchangeType.CRYPTO_TO_FIAT,
        cryptocurrency: 'BTC',
        fiatCurrency: 'USD',
        rate: 30000,
        minAmount: 0.01,
        maxAmount: 0.5,
        availableAmount: 0.5,
        paymentMethods: [PaymentMethod.BANK_TRANSFER, PaymentMethod.PAYPAL],
      },
      {
        userId: exchanger1.id,
        type: ExchangeType.FIAT_TO_CRYPTO,
        cryptocurrency: 'ETH',
        fiatCurrency: 'USD',
        rate: 2000,
        minAmount: 100,
        maxAmount: 5000,
        availableAmount: 5000,
        paymentMethods: [PaymentMethod.WISE, PaymentMethod.CASH],
      },
      {
        userId: exchanger2.id,
        type: ExchangeType.CRYPTO_TO_FIAT,
        cryptocurrency: 'USDT',
        fiatCurrency: 'EUR',
        rate: 0.92,
        minAmount: 100,
        maxAmount: 10000,
        availableAmount: 10000,
        paymentMethods: [PaymentMethod.BANK_TRANSFER, PaymentMethod.WISE],
      },
      {
        userId: exchanger2.id,
        type: ExchangeType.FIAT_TO_CRYPTO,
        cryptocurrency: 'BTC',
        fiatCurrency: 'EUR',
        rate: 28000,
        minAmount: 50,
        maxAmount: 5000,
        availableAmount: 0.3,
        paymentMethods: [PaymentMethod.PAYPAL, PaymentMethod.CASH],
      },
    ],
  });
}

async function createOffersAndTransactions(users, listings) {
  const [customer1, customer2] = users;
  const [btcUsdListing, ethUsdListing, usdtEurListing, btcEurListing] = listings;

  // Создаем офферы
  const offers = await prisma.exchangeOffer.createMany({
    data: [
      {
        userId: customer1.id,
        listingId: btcUsdListing.id,
        amount: 0.1,
        status: TransactionStatus.PENDING,
      },
      {
        userId: customer1.id,
        listingId: ethUsdListing.id,
        amount: 200,
        status: TransactionStatus.ACCEPTED,
      },
      {
        userId: customer2.id,
        listingId: usdtEurListing.id,
        amount: 500,
        status: TransactionStatus.PENDING,
      },
      {
        userId: customer2.id,
        listingId: btcEurListing.id,
        amount: 100,
        status: TransactionStatus.ACCEPTED,
      },
    ],
  });

  const createdOffers = await prisma.exchangeOffer.findMany();

  // Создаем транзакции
  await prisma.exchangeTransaction.createMany({
    data: [
      {
        type: ExchangeType.CRYPTO_TO_FIAT,
        status: TransactionStatus.PENDING,
        cryptocurrency: 'BTC',
        fiatCurrency: 'USD',
        cryptoAmount: 0.1,
        fiatAmount: 3000,
        customerId: customer1.id,
        exchangerId: btcUsdListing.userId,
        listingId: btcUsdListing.id,
        offerId: createdOffers[0].id,
        confirmationDeadline: new Date(Date.now() + 30 * 60 * 1000),
      },
      {
        type: ExchangeType.FIAT_TO_CRYPTO,
        status: TransactionStatus.PAYMENT_CONFIRMED,
        cryptocurrency: 'ETH',
        fiatCurrency: 'USD',
        cryptoAmount: 0.1,
        fiatAmount: 200,
        customerId: customer1.id,
        exchangerId: ethUsdListing.userId,
        listingId: ethUsdListing.id,
        offerId: createdOffers[1].id,
        confirmationDeadline: new Date(Date.now() + 30 * 60 * 1000),
      },
      {
        type: ExchangeType.CRYPTO_TO_FIAT,
        status: TransactionStatus.DISPUTE_OPEN,
        cryptocurrency: 'USDT',
        fiatCurrency: 'EUR',
        cryptoAmount: 500,
        fiatAmount: 460,
        customerId: customer2.id,
        exchangerId: usdtEurListing.userId,
        listingId: usdtEurListing.id,
        offerId: createdOffers[2].id,
        confirmationDeadline: new Date(Date.now() + 30 * 60 * 1000),
      },
      {
        type: ExchangeType.FIAT_TO_CRYPTO,
        status: TransactionStatus.FINISHED,
        cryptocurrency: 'BTC',
        fiatCurrency: 'EUR',
        cryptoAmount: 0.00357,
        fiatAmount: 100,
        customerId: customer2.id,
        exchangerId: btcEurListing.userId,
        listingId: btcEurListing.id,
        offerId: createdOffers[3].id,
        confirmationDeadline: new Date(Date.now() - 30 * 60 * 1000),
        finishedAt: new Date(),
      },
    ],
  });

  return prisma.exchangeTransaction.findMany();
}

async function createHolds(users, transactions) {
  const [customer1, customer2] = users;
  const [pendingTx, paymentConfirmedTx, disputeTx, finishedTx] = transactions;

  await prisma.balanceHold.createMany({
    data: [
      {
        userId: customer1.id,
        cryptocurrency: 'BTC',
        amount: 0.1,
        type: HoldType.EXCHANGE_OFFER,
        relatedTransactionId: pendingTx.id,
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      },
      {
        userId: customer2.id,
        cryptocurrency: 'USDT',
        amount: 500,
        type: HoldType.DISPUTE,
        relatedTransactionId: disputeTx.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    ],
  });
}

async function createDisputes(users, transactions) {
  const [customer1, customer2] = users;
  const [pendingTx, , disputeTx] = transactions;

  await prisma.dispute.createMany({
    data: [
      {
        reason: 'Не подтвержден платеж',
        status: DisputeStatus.OPEN,
        transactionId: pendingTx.id,
        initiatorId: customer1.id,
      },
      {
        reason: 'Несоответствие суммы',
        status: DisputeStatus.IN_PROGRESS,
        transactionId: disputeTx.id,
        initiatorId: customer2.id,
        moderatorId: users[5].id, // moderator
      },
    ],
  });
}

async function createReviews(users, transactions) {
  const [customer1, customer2] = users;
  const [, , , finishedTx] = transactions;

  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: 'Отличный сервис! Быстрая и надежная транзакция.',
        transactionId: finishedTx.id,
        authorId: customer2.id,
        targetId: finishedTx.exchangerId,
      },
    ],
  });
}

async function createAuditLogs(users) {
  const [customer1, , exchanger1, , admin] = users;

  await prisma.auditLog.createMany({
    data: [
      {
        action: 'CREATE_OFFER',
        entityType: 'OFFER',
        entityId: 'test-offer-1',
        userId: customer1.id,
        metadata: { amount: 0.1, cryptocurrency: 'BTC' },
      },
      {
        action: 'UPDATE_LISTING',
        entityType: 'LISTING',
        entityId: 'test-listing-1',
        userId: exchanger1.id,
        metadata: { rate: 30000, availableAmount: 0.5 },
      },
      {
        action: 'FREEZE_EXCHANGER',
        entityType: 'USER',
        entityId: exchanger1.id,
        userId: admin.id,
        metadata: { reason: 'Suspicious activity' },
      },
    ],
  });
}

async function main() {
  console.log('Starting seed...');

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
    prisma.auditLog.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Создание данных
  const users = await createUsers();
  await createBalances(users);
  await createExchangerSettings(users);
  const listings = await prisma.exchangeListing.findMany();
  const transactions = await createOffersAndTransactions(users, listings);
  await createHolds(users, transactions);
  await createDisputes(users, transactions);
  await createReviews(users, transactions);
  await createAuditLogs(users);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });