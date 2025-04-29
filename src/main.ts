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

declare const module: any;

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new SentryExceptionFilter(),
    new PrismaExceptionFilter(),
  );

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('P2P documentation')
    .addTag('p2p')
    .setDescription('P2P Api Documentation')
    .setVersion('1.0.0')
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
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  if (NODE_ENV !== 'production') {
    SwaggerModule.setup('api', app, swaggerDocument);
  }

  // Инициализация Sentry
  initSentry(SENTRY_DNS);

  const PROTO_PATH = join(process.cwd(), 'dist/proto/p2p.proto');

  logger.log(`Connecting to gRPC server at: ${GRPC_URL}`);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: GRPC_URL,
      package: 'p2p',
      protoPath: PROTO_PATH,
    },
  });

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
