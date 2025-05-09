export const ErrorMessages = {
  // Общие ошибки
  IP_REQUIRED: 'IP адрес не найден в запросе',
  INVALID_INPUT: 'Некорректные входные данные',
  NOT_FOUND: 'Запись не найдена',
  UNAUTHORIZED: 'Требуется авторизация',
  FORBIDDEN: 'Доступ запрещен',
  RATE_LIMIT: 'Превышен лимит запросов',

  // Ошибки объявлений
  LISTING_NOT_FOUND: 'Объявление не найдено',
  LISTING_UPDATE_FAILED: 'Не удалось обновить объявление',
  LISTING_CREATE_FAILED: 'Не удалось создать объявление',
  LISTING_DELETE_FAILED: 'Не удалось удалить объявление',
  LISTING_AMOUNT_RANGE: 'Сумма вне допустимого диапазона',
  LISTING_EXCHANGER_UNAVAILABLE: 'Обменник недоступен в данное время',

  // Ошибки предложений
  OFFER_NOT_FOUND: 'Предложение не найдено',
  OFFER_CREATE_FAILED: 'Не удалось создать предложение',
  OFFER_ACCEPT_FAILED: 'Не удалось принять предложение',
  OFFER_REJECT_FAILED: 'Не удалось отклонить предложение',
  OFFER_CANCEL_FAILED: 'Не удалось отменить предложение',
  OFFER_RESPOND_FAILED: 'Не удалось ответить на предложение',

  // Ошибки сделок
  EXCHANGE_NOT_FOUND: 'Сделка не найдена',
  EXCHANGE_CREATE_FAILED: 'Не удалось создать сделку',
  EXCHANGE_UPDATE_FAILED: 'Не удалось обновить сделку',
  EXCHANGE_CANCEL_FAILED: 'Не удалось отменить сделку',
  EXCHANGE_CONFIRM_FAILED: 'Не удалось подтвердить сделку',

  // Ошибки споров
  DISPUTE_NOT_FOUND: 'Спор не найден',
  DISPUTE_CREATE_FAILED: 'Не удалось создать спор',
  DISPUTE_UPDATE_FAILED: 'Не удалось обновить спор',
  DISPUTE_RESOLVE_FAILED: 'Не удалось разрешить спор',

  // Ошибки обменника
  EXCHANGER_NOT_FOUND: 'Обменник не найден',
  EXCHANGER_FROZEN: 'Обменник заморожен',
  EXCHANGER_TOO_MANY_MISSED: 'Обменник заморожен из-за большого количества пропущенных предложений',
  EXCHANGER_UNFREEZE_FAILED: 'Не удалось разморозить обменника',
  EXCHANGER_STATUS_UPDATE_FAILED: 'Не удалось обновить статус обменника',

  // Ошибки отзывов
  REVIEW_CREATE_FAILED: 'Не удалось создать отзыв',
  REVIEW_ONLY_CUSTOMER: 'Только клиент может оставлять отзывы',
  REVIEW_INVALID_STATUS: 'Отзыв можно оставить только для завершенных или оспоренных сделок',

  // Ошибки базы данных
  DB_UNIQUE_CONSTRAINT: 'Нарушение уникального ограничения',
  DB_FOREIGN_KEY: 'Нарушение внешнего ключа',
  DB_VALIDATION: 'Ошибка валидации данных',
  DB_RECORD_NOT_FOUND: 'Запись не найдена в базе данных',
} as const; 