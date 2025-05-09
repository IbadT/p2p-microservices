import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SentryExceptionFilter } from './filters/sentry-exception.filter';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initSentry } from './helpers/instrument';
import { join } from 'path';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new SentryExceptionFilter(),
    new PrismaExceptionFilter(),
  );

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT') ?? 4200;
  const NODE_ENV = configService.get<string>('NODE_ENV');
  const GRPC_URL = configService.get<string>('GRPC_URL');
  const KAFKA_BROKER = configService.get<string>('KAFKA_BROKER');
  const SENTRY_DNS = configService.get<string>('SENTRY_DNS');

  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('P2P Платформа Обмена Криптовалют')
    .setDescription(`
      API документация для P2P платформы обмена криптовалют.
      
      Основные возможности:
      • Безопасная аутентификация и авторизация пользователей
      • Создание и управление объявлениями о покупке/продаже криптовалют
      • Система предложений и сделок между пользователями
      • Автоматическое управление транзакциями и балансами
      • Система разрешения споров и модерации
      • Управление отзывами и рейтингами пользователей
      • Мониторинг состояния системы и метрик производительности
      
      Технические детали:
      • REST API с поддержкой gRPC для микросервисной архитектуры
      • JWT аутентификация
      • Валидация данных через DTO
      • Документация в формате OpenAPI 3.0
      • Поддержка CORS
      • Интеграция с Sentry для мониторинга ошибок

      Методы API:
      Auth:
      • POST /auth/register - Регистрация нового пользователя
      • POST /auth/login - Вход в систему
      • POST /auth/refresh - Обновление токена доступа
      • POST /auth/logout - Выход из системы

      Users:
      • GET /users/profile - Получение профиля пользователя
      • PUT /users/profile - Обновление профиля
      • GET /users/{id} - Получение информации о пользователе
      • GET /users/verification - Проверка верификации

      Listings:
      • POST /listings - Создание нового объявления
      • GET /listings - Получение списка объявлений
      • GET /listings/{id} - Получение информации об объявлении
      • PUT /listings/{id} - Обновление объявления
      • DELETE /listings/{id} - Удаление объявления

      Offers:
      • POST /offers - Создание предложения обмена
      • GET /offers - Получение списка предложений
      • GET /offers/{id} - Получение информации о предложении
      • PUT /offers/{id}/accept - Принятие предложения
      • PUT /offers/{id}/reject - Отклонение предложения
      • DELETE /offers/{id} - Отмена предложения

      Transactions:
      • GET /transactions - Получение истории транзакций
      • GET /transactions/{id} - Получение информации о транзакции
      • POST /transactions/{id}/confirm - Подтверждение транзакции
      • POST /transactions/{id}/cancel - Отмена транзакции

      Disputes:
      • POST /disputes - Создание спора
      • GET /disputes - Получение списка споров
      • GET /disputes/{id} - Получение информации о споре
      • POST /disputes/{id}/evidence - Добавление доказательств
      • PUT /disputes/{id}/resolve - Разрешение спора

      Balance:
      • GET /balance - Получение баланса
      • POST /balance/deposit - Пополнение баланса
      • POST /balance/withdraw - Вывод средств
      • GET /balance/history - История операций

      Reviews:
      • POST /reviews - Создание отзыва
      • GET /reviews - Получение списка отзывов
      • GET /reviews/{id} - Получение информации об отзыве
      • PUT /reviews/{id} - Обновление отзыва
      • DELETE /reviews/{id} - Удаление отзыва

      Health:
      • GET /health - Проверка состояния сервиса
      • GET /health/metrics - Получение метрик
      • GET /health/dependencies - Проверка зависимостей
    `)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', 'Авторизация - Эндпоинты для аутентификации и авторизации пользователей. Включает регистрацию, вход, обновление токенов и управление сессиями.')
    .addTag('Listings', 'Объявления - Управление объявлениями об обмене. Создание, редактирование, поиск и фильтрация объявлений о покупке/продаже криптовалют.')
    .addTag('Offers', 'Предложения - Управление предложениями обмена. Создание, принятие, отклонение и отмена предложений по обмену криптовалют.')
    .addTag('Transactions', 'Транзакции - Управление транзакциями обмена. Отслеживание статуса, подтверждение платежей и управление процессом обмена.')
    .addTag('Disputes', 'Споры - Система разрешения споров. Создание споров, загрузка доказательств и процесс модерации конфликтных ситуаций.')
    .addTag('Users', 'Пользователи - Управление пользователями. Профили, настройки, верификация и управление правами доступа.')
    .addTag('Balance', 'Баланс - Операции с балансом. Просмотр, пополнение, вывод средств и история транзакций.')
    .addTag('Reviews', 'Отзывы - Система отзывов. Создание, просмотр и модерация отзывов о пользователях и обменах.')
    .addTag('Exchanges', 'Обмены - Управление обменами. Создание, отслеживание и управление процессом обмена криптовалют.')
    .addTag('Audit', 'Аудит - Система аудита. Логирование действий пользователей, модераторов и системных событий.')
    .addTag('Scheduler', 'Планировщик - Управление запланированными задачами. Автоматические операции, уведомления и системные процессы.')
    .addTag('Notifications', 'Уведомления - Управление уведомлениями. Настройка, отправка и получение системных уведомлений и оповещений.')
    .addTag('Health', 'Мониторинг - Система мониторинга состояния сервиса. Проверка работоспособности компонентов, метрики производительности и статус зависимостей.')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    deepScanRoutes: true,
    // ignoreGlobalPrefix: true,
  });

  // Enable Swagger in all environments
  SwaggerModule.setup('api', app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'P2P Exchange Platform API Documentation',
    customCss: `
      .swagger-ui .opblock-tag {
        border-radius: 4px;
        margin: 0 0 5px;
        padding: 5px 10px;
      }
      .swagger-ui .opblock-tag[data-tag="Auth"] {
        background-color: #e3f2fd;
        border: 1px solid #2196f3;
      }
      .swagger-ui .opblock-tag[data-tag="Listings"] {
        background-color: #e8f5e9;
        border: 1px solid #4caf50;
      }
      .swagger-ui .opblock-tag[data-tag="Offers"] {
        background-color: #fff3e0;
        border: 1px solid #ff9800;
      }
      .swagger-ui .opblock-tag[data-tag="Transactions"] {
        background-color: #f3e5f5;
        border: 1px solid #9c27b0;
      }
      .swagger-ui .opblock-tag[data-tag="Disputes"] {
        background-color: #ffebee;
        border: 1px solid #f44336;
      }
      .swagger-ui .opblock-tag[data-tag="Users"] {
        background-color: #e0f7fa;
        border: 1px solid #00bcd4;
      }
      .swagger-ui .opblock-tag[data-tag="Balance"] {
        background-color: #f1f8e9;
        border: 1px solid #8bc34a;
      }
      .swagger-ui .opblock-tag[data-tag="Reviews"] {
        background-color: #fff8e1;
        border: 1px solid #ffc107;
      }
      .swagger-ui .opblock-tag[data-tag="Exchanges"] {
        background-color: #e8eaf6;
        border: 1px solid #3f51b5;
      }
      .swagger-ui .opblock-tag[data-tag="Audit"] {
        background-color: #fce4ec;
        border: 1px solid #e91e63;
      }
      .swagger-ui .opblock-tag[data-tag="Scheduler"] {
        background-color: #e0f2f1;
        border: 1px solid #009688;
      }
      .swagger-ui .opblock-tag[data-tag="Notifications"] {
        background-color: #ede7f6;
        border: 1px solid #673ab7;
      }
      .swagger-ui .opblock-tag[data-tag="Health"] {
        background-color: #e8f5e9;
        border: 1px solid #2e7d32;
      }
    `
  });

  // Инициализация Sentry
  initSentry(SENTRY_DNS);

  const PROTO_PATH = join(process.cwd(), 'dist/proto/p2p.proto');
  const USER_PROTO_PATH = join(process.cwd(), 'dist/proto/user.proto');

  logger.log(`Connecting to gRPC server at: ${GRPC_URL}`);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: GRPC_URL,
      package: 'p2p',
      protoPath: PROTO_PATH,
    },
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     url: 'localhost:5000',
  //     package: 'user',
  //     protoPath: USER_PROTO_PATH,
  //   },
  // });

  await app.startAllMicroservices();
  await app.listen(PORT ?? 4200);

  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Environment: ${NODE_ENV}`);
  logger.log(
    `Swagger documentation is available at: ${await app.getUrl()}/api`,
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
