import { Test, TestingModule } from '@nestjs/testing';
import { OffersService } from './offers.service';
import { PrismaService } from '../prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { AuditService } from '../audit/audit.service';

describe('OffersService', () => {
  let service: OffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffersService],
    }).compile();

    service = module.get<OffersService>(OffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('OffersService Integration', () => {
  let service: OffersService;
  let prisma: PrismaService;
  let kafka: KafkaService;
  let notifications: NotificationsGateway;
  let audit: AuditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersService,
        PrismaService,
        KafkaService,
        NotificationsGateway,
        AuditService,
      ],
    }).compile();

    service = module.get<OffersService>(OffersService);
    prisma = module.get<PrismaService>(PrismaService);
    kafka = module.get<KafkaService>(KafkaService);
    notifications = module.get<NotificationsGateway>(NotificationsGateway);
    audit = module.get<AuditService>(AuditService);
  });

  it('should create offer, emit Kafka, notify WebSocket, and log audit', async () => {
    // Моки для Kafka, WebSocket, Audit
    jest.spyOn(kafka, 'sendEvent').mockResolvedValue(undefined);
    jest.spyOn(notifications, 'notifyUser').mockImplementation(() => {});
    jest.spyOn(audit, 'createAuditLog').mockResolvedValue(undefined as any);

    // Подготовка тестовых данных
    const userId = 'user-1';
    const listingId = 'listing-1';
    const amount = 100;
    prisma.exchangeListing.findUnique = jest.fn().mockResolvedValue({ id: listingId, isActive: true, type: 'CRYPTO2FIAT', rate: 1, cryptocurrency: 'BTC', fiatCurrency: 'USD', userId: 'exchanger-1' });
    prisma.exchangeOffer.create = jest.fn().mockResolvedValue({ id: 'offer-1', userId, listingId, amount });
    prisma.exchangeTransaction.create = jest.fn().mockResolvedValue({ id: 'tx-1' });

    // Вызов
    const offer = await service.createOffer(userId, { listingId, amount });

    expect(offer).toBeDefined();
    expect(kafka.sendEvent).toHaveBeenCalled();
    expect(notifications.notifyUser).toHaveBeenCalled();
    expect(audit.createAuditLog).toHaveBeenCalled();
  });
});
