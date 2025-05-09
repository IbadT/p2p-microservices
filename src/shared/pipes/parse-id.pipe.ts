import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ErrorMessages } from '../constants/error-messages';

@Injectable()
export class ParseIdPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException(ErrorMessages.INVALID_INPUT);
    }

    // Проверяем, что ID является валидным UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new BadRequestException('Некорректный формат ID');
    }

    return value;
  }
} 