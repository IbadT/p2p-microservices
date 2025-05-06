import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('P2P Exchange Flow (e2e)', () => {
  let app: INestApplication;
  let customerToken: string;
  let exchangerToken: string;
  let listingId: string;
  let offerId: string;
  let transactionId: string;
  let disputeId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Customer creates listing, offer, completes deal, opens dispute, leaves review', async () => {
    // 1. Customer creates listing
    const listingRes = await request(app.getHttpServer())
      .post('/api/p2p/listings')
      .send({
        userId: 'customer_1',
        type: 'CRYPTO2FIAT',
        cryptocurrency: 'BTC',
        fiatCurrency: 'USD',
        rate: 50000,
        minAmount: 0.01,
        maxAmount: 1,
        availableAmount: 1,
        paymentMethods: ['BANK'],
      });
    expect(listingRes.status).toBe(201);
    listingId = listingRes.body.id;

    // 2. Exchanger creates offer
    const offerRes = await request(app.getHttpServer())
      .post('/api/p2p/exchange-offers')
      .send({
        userId: 'exchanger_1',
        listingId,
        amount: 0.1,
      });
    expect(offerRes.status).toBe(201);
    offerId = offerRes.body.id;
    transactionId = offerRes.body.transactionId;

    // 3. Exchanger accepts offer
    await request(app.getHttpServer())
      .put(`/api/p2p/exchange-offers/${offerId}/response`)
      .send({
        userId: 'exchanger_1',
        action: 'ACCEPT',
      })
      .expect(200);

    // 4. Exchanger подтверждает оплату
    await request(app.getHttpServer())
      .post(`/api/p2p/exchange-offers/${offerId}/confirm-payment`)
      .send({
        userId: 'exchanger_1',
        paymentReference: 'tx_abc123',
      })
      .expect(200);

    // 5. Customer подтверждает получение
    await request(app.getHttpServer())
      .post(`/api/p2p/exchange-offers/${offerId}/confirm-receipt`)
      .send({
        userId: 'customer_1',
      })
      .expect(200);

    // 6. Customer открывает спор
    const disputeRes = await request(app.getHttpServer())
      .post(`/api/p2p/exchange-offers/${offerId}/dispute`)
      .send({
        openedBy: 'CUSTOMER',
        reason: 'Фиат не получен',
      });
    expect(disputeRes.status).toBe(201);
    disputeId = disputeRes.body.id;

    // 7. Customer оставляет отзыв
    await request(app.getHttpServer())
      .post(`/api/p2p/reviews`)
      .send({
        userId: 'customer_1',
        transactionId,
        review: 'Все прошло отлично!',
        rating: 5,
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
