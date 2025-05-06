import { ApiProperty, ApiTags, ApiExtraModels } from '@nestjs/swagger';
import { ExchangeType, TransactionStatus, RespondAction, Role } from './enums';
import { UserRole } from '@prisma/client';

// User Service DTOs
export class CreateUserDto {
  @ApiProperty({ description: 'Email пользователя', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: 'password123' })
  password: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Фамилия пользователя', example: 'Doe' })
  lastName: string;

  @ApiProperty({ description: 'Номер телефона', example: '+1234567890' })
  phoneNumber: string;

  @ApiProperty({ description: 'Является ли пользователь обменником', example: false })
  isExchanger: boolean;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'User ID' })
  id: string;

  @ApiProperty({ description: 'User email', required: false })
  email?: string;

  @ApiProperty({ description: 'User name', required: false })
  name?: string;

  @ApiProperty({ description: 'User password', required: false })
  password?: string;

  @ApiProperty({ description: 'User role', required: false })
  role?: UserRole;

  @ApiProperty({ description: 'Is exchanger active', required: false })
  isExchangerActive?: boolean;

  @ApiProperty({ description: 'Is user frozen', required: false })
  isFrozen?: boolean;

  @ApiProperty({ description: 'Is user online', required: false })
  isOnline?: boolean;
}

// Balance Service DTOs
export class GetBalanceDto {
  @ApiProperty({ description: 'ID пользователя', example: '123e4567-e89b-12d3-a456-426614174000' })
  userId: string;
}

export class CreateHoldDto {
  @ApiProperty({ description: 'ID пользователя', example: '123e4567-e89b-12d3-a456-426614174000' })
  userId: string;

  @ApiProperty({ description: 'Криптовалюта', example: 'BTC' })
  cryptocurrency: string;

  @ApiProperty({ description: 'Сумма', example: 1.5 })
  amount: number;

  @ApiProperty({ description: 'Тип холда', example: 'EXCHANGE' })
  type: string;

  @ApiProperty({ description: 'ID связанной транзакции', example: '123e4567-e89b-12d3-a456-426614174000', required: false })
  relatedTransactionId?: string;
}

// Dispute Service DTOs
export class CreateDisputeDto {
  @ApiProperty({ description: 'ID транзакции', example: '123e4567-e89b-12d3-a456-426614174000' })
  transactionId: string;

  @ApiProperty({ description: 'ID инициатора спора', example: '123e4567-e89b-12d3-a456-426614174000' })
  initiatorId: string;

  @ApiProperty({ description: 'Причина спора', example: 'Не получена оплата' })
  reason: string;
}

export class ResolveDisputeDto {
  @ApiProperty({ description: 'ID спора', example: '123e4567-e89b-12d3-a456-426614174000' })
  disputeId: string;

  @ApiProperty({ description: 'ID модератора', example: '123e4567-e89b-12d3-a456-426614174000' })
  moderatorId: string;

  @ApiProperty({ description: 'Решение по спору', example: 'Возврат средств покупателю' })
  resolution: string;

  @ApiProperty({ description: 'ID победителя спора', example: '123e4567-e89b-12d3-a456-426614174000' })
  winnerUserId: string;
}

export class AddCommentDto {
  @ApiProperty({ description: 'ID спора', example: '123e4567-e89b-12d3-a456-426614174000' })
  disputeId: string;

  @ApiProperty({ description: 'ID пользователя', example: '123e4567-e89b-12d3-a456-426614174000' })
  userId: string;

  @ApiProperty({ description: 'Текст комментария', example: 'Пожалуйста, предоставьте доказательства оплаты' })
  text: string;
}

export class OpenDisputeDto {
  @ApiProperty({ description: 'ID обмена', example: '123e4567-e89b-12d3-a456-426614174000' })
  exchangeId: string;

  @ApiProperty({ description: 'ID инициатора спора', example: '123e4567-e89b-12d3-a456-426614174000' })
  initiatorId: string;

  @ApiProperty({ description: 'Причина спора', example: 'Не получена оплата' })
  reason: string;
}

// Reviews Service DTOs
export class CreateReviewDto {
  @ApiProperty({ description: 'ID рецензента', example: '123e4567-e89b-12d3-a456-426614174000' })
  reviewerId: string;

  @ApiProperty({ description: 'ID пользователя, которому оставляют отзыв', example: '123e4567-e89b-12d3-a456-426614174000' })
  reviewedId: string;

  @ApiProperty({ description: 'Оценка (1-5)', example: 5 })
  rating: number;

  @ApiProperty({ description: 'Комментарий', example: 'Отличный обменник!' })
  comment: string;

  @ApiProperty({ description: 'ID обмена', example: '123e4567-e89b-12d3-a456-426614174000' })
  exchangeId: string;
}

// Exchange Service DTOs
export class CreateListingDto {
  @ApiProperty({ description: 'ID пользователя' })
  userId: string;

  @ApiProperty({ enum: ExchangeType, description: 'Тип обмена' })
  type: ExchangeType;

  @ApiProperty({ description: 'Криптовалюта' })
  cryptocurrency: string;

  @ApiProperty({ description: 'Фиатная валюта' })
  fiatCurrency: string;

  @ApiProperty({ description: 'Курс обмена' })
  rate: number;

  @ApiProperty({ description: 'Минимальная сумма' })
  minAmount: number;

  @ApiProperty({ description: 'Максимальная сумма' })
  maxAmount: number;

  @ApiProperty({ description: 'Доступная сумма' })
  availableAmount: number;

  @ApiProperty({ type: [String], description: 'Методы оплаты' })
  paymentMethods: string[];

  @ApiProperty({ required: false, description: 'Условия обмена' })
  terms?: string;
}

export class CreateOfferDto {
  @ApiProperty({ description: 'ID пользователя' })
  userId: string;

  @ApiProperty({ description: 'ID объявления' })
  listingId: string;

  @ApiProperty({ description: 'Сумма обмена' })
  amount: number;
}

export class RespondOfferDto {
  @ApiProperty({ description: 'ID предложения' })
  offerId: string;

  @ApiProperty({ description: 'ID обменника' })
  exchangerId: string;

  @ApiProperty({ enum: RespondAction, description: 'Действие' })
  action: RespondAction;
}

export class UpdateTransactionStatusDto {
  @ApiProperty({ description: 'ID транзакции' })
  transactionId: string;

  @ApiProperty({ description: 'ID пользователя' })
  userId: string;

  @ApiProperty({ enum: TransactionStatus, description: 'Статус транзакции' })
  status: TransactionStatus;

  @ApiProperty({ required: false, description: 'Доказательство оплаты' })
  paymentProof?: string;
}

export class ConfirmPaymentDto {
  @ApiProperty({ description: 'ID транзакции' })
  transactionId: string;

  @ApiProperty({ description: 'ID обменника' })
  exchangerId: string;

  @ApiProperty({ description: 'Референс платежа' })
  paymentReference: string;
}

export class ConfirmReceiptDto {
  @ApiProperty({ description: 'ID транзакции' })
  transactionId: string;

  @ApiProperty({ description: 'ID клиента' })
  customerId: string;
}

export class CancelTransactionDto {
  @ApiProperty({ description: 'ID транзакции' })
  transactionId: string;

  @ApiProperty({ enum: Role, description: 'Роль отменившего' })
  cancelledBy: Role;

  @ApiProperty({ description: 'Причина отмены' })
  reason: string;
}

export class SetExchangerStatusDto {
  @ApiProperty({ description: 'ID обменника' })
  exchangerId: string;

  @ApiProperty({ description: 'Статус онлайн' })
  online: boolean;
}

export class FreezeExchangerDto {
  @ApiProperty({ description: 'ID обменника' })
  exchangerId: string;

  @ApiProperty({ description: 'Причина заморозки' })
  reason: string;
}

// P2P Service DTOs
export class CreateExchangeOfferDto {
  @ApiProperty({ description: 'ID покупателя', example: '123e4567-e89b-12d3-a456-426614174000' })
  customerId: string;

  @ApiProperty({ description: 'ID объявления', example: '123e4567-e89b-12d3-a456-426614174000' })
  listingId: string;

  @ApiProperty({ description: 'Сумма сделки', example: 1000 })
  amount: number;

  @ApiProperty({ description: 'Тип обмена', example: 'CRYPTO2FIAT' })
  exchangeType: string;

  @ApiProperty({ description: 'Дополнительные условия', example: 'Курс 1 BTC = 50000 USD' })
  conditions: string;
}

export class RespondExchangeOfferDto {
  @ApiProperty({ description: 'ID предложения', example: '123e4567-e89b-12d3-a456-426614174000' })
  offerId: string;

  @ApiProperty({ description: 'ID обменника', example: '123e4567-e89b-12d3-a456-426614174000' })
  exchangerId: string;

  @ApiProperty({ description: 'Действие обменника', example: 'ACCEPT' })
  action: string;
}

// Audit Service DTOs
export class CreateAuditLogDto {
  @ApiProperty({ description: 'ID пользователя', example: '123e4567-e89b-12d3-a456-426614174000' })
  userId: string;

  @ApiProperty({ description: 'Действие', example: 'CREATE_EXCHANGE' })
  action: string;

  @ApiProperty({ description: 'Тип сущности', example: 'EXCHANGE' })
  entityType: string;

  @ApiProperty({ description: 'ID сущности', example: '123e4567-e89b-12d3-a456-426614174000' })
  entityId: string;

  @ApiProperty({ description: 'Детали действия', example: 'Создан новый обмен' })
  details: string;

  @ApiProperty({ description: 'IP адрес', example: '192.168.1.1' })
  ipAddress: string;
}

// Scheduler Service DTOs
export class CreateScheduledTaskDto {
  @ApiProperty({ description: 'Название задачи', example: 'Check Exchange Status' })
  name: string;

  @ApiProperty({ description: 'Тип задачи', example: 'EXCHANGE_CHECK' })
  type: string;

  @ApiProperty({ description: 'Расписание', example: '*/5 * * * *' })
  schedule: string;

  @ApiProperty({ description: 'Данные задачи', example: '{"exchangeId": "123"}' })
  data: string;

  @ApiProperty({ description: 'Активна ли задача', example: true })
  enabled: boolean;
}

export class CreateTransactionDto {
  @ApiProperty({ description: 'Тип транзакции' })
  type: string;

  @ApiProperty({ description: 'ID пользователя' })
  userId: string;

  @ApiProperty({ description: 'Сумма транзакции' })
  amount: number;

  @ApiProperty({ description: 'Валюта транзакции' })
  currency: string;

  @ApiProperty({ description: 'Описание транзакции' })
  description?: string;
}

export class UpdateTransactionDto {
  @ApiProperty({ description: 'ID транзакции' })
  id: string;

  @ApiProperty({ description: 'Статус транзакции' })
  status?: string;

  @ApiProperty({ description: 'Описание транзакции' })
  description?: string;
}

export class UpdateListingDto {
  @ApiProperty({ description: 'ID списка' })
  id: string;

  @ApiProperty({ description: 'Тип списка' })
  type?: string;

  @ApiProperty({ description: 'Криптовалюта' })
  cryptocurrency?: string;

  @ApiProperty({ description: 'Фиатная валюта' })
  fiatCurrency?: string;

  @ApiProperty({ description: 'Курс обмена' })
  rate?: number;

  @ApiProperty({ description: 'Минимальная сумма' })
  minAmount?: number;

  @ApiProperty({ description: 'Максимальная сумма' })
  maxAmount?: number;

  @ApiProperty({ description: 'Доступная сумма' })
  availableAmount?: number;

  @ApiProperty({ description: 'Способы оплаты' })
  paymentMethods?: string[];

  @ApiProperty({ description: 'Условия' })
  terms?: string;

  @ApiProperty({ description: 'Активен ли список' })
  isActive?: boolean;
}

export class UpdateOfferDto {
  @ApiProperty({ description: 'ID предложения' })
  id: string;

  @ApiProperty({ description: 'Сумма предложения' })
  amount?: number;

  @ApiProperty({ description: 'Статус предложения' })
  status?: string;

  @ApiProperty({ description: 'Комментарий' })
  comment?: string;
}

export class CreateFilterDto {
  @ApiProperty({ description: 'ID пользователя' })
  userId: string;

  @ApiProperty({ description: 'Тип фильтра' })
  type: string;

  @ApiProperty({ description: 'Криптовалюта' })
  cryptocurrency?: string;

  @ApiProperty({ description: 'Фиатная валюта' })
  fiatCurrency?: string;

  @ApiProperty({ description: 'Минимальная сумма' })
  minAmount?: number;

  @ApiProperty({ description: 'Максимальная сумма' })
  maxAmount?: number;

  @ApiProperty({ description: 'Способы оплаты' })
  paymentMethods?: string[];
}

export class UpdateFilterDto {
  @ApiProperty({ description: 'ID фильтра' })
  id: string;

  @ApiProperty({ description: 'Тип фильтра' })
  type?: string;

  @ApiProperty({ description: 'Криптовалюта' })
  cryptocurrency?: string;

  @ApiProperty({ description: 'Фиатная валюта' })
  fiatCurrency?: string;

  @ApiProperty({ description: 'Минимальная сумма' })
  minAmount?: number;

  @ApiProperty({ description: 'Максимальная сумма' })
  maxAmount?: number;

  @ApiProperty({ description: 'Способы оплаты' })
  paymentMethods?: string[];
}

/**
 * DTO для публикации событий в Kafka
 * @template T - Тип данных события
 */
export class PublishEventDto<T = unknown> {
  @ApiProperty()
  topic: string;

  @ApiProperty()
  key: string;

  @ApiProperty()
  value: T;

  @ApiProperty({ required: false })
  headers?: Record<string, string>;
}

/**
 * Интерфейс для событий, связанных с пользователями
 */
export interface UserEvent {
  userId: string;
  action: 'created' | 'updated' | 'deleted';
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * Интерфейс для событий, связанных с транзакциями
 */
export interface TransactionEvent {
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  currency: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * Интерфейс для событий, связанных с обменами
 */
export interface ExchangeEvent {
  exchangeId: string;
  status: 'created' | 'in_progress' | 'completed' | 'cancelled';
  type: 'buy' | 'sell';
  amount: number;
  cryptocurrency: string;
  fiatCurrency: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// Примеры использования:
// const userEvent = new PublishEventDto<UserEvent>();
// const transactionEvent = new PublishEventDto<TransactionEvent>();
// const exchangeEvent = new PublishEventDto<ExchangeEvent>();

export class LoginDto {
  @ApiProperty({ description: 'Email пользователя' })
  email: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ description: 'Email пользователя' })
  email: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  password: string;

  @ApiProperty({ description: 'Роль пользователя' })
  role: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Токен обновления' })
  refreshToken: string;
} 