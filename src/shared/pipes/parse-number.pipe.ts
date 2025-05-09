import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ErrorMessages } from '../constants/error-messages';

@Injectable()
export class ParseNumberPipe implements PipeTransform<string> {
  constructor(private readonly min?: number, private readonly max?: number) {}

  transform(value: string): number {
    const num = Number(value);
    
    if (isNaN(num)) {
      throw new BadRequestException('Значение должно быть числом');
    }

    if (this.min !== undefined && num < this.min) {
      throw new BadRequestException(`Значение должно быть не меньше ${this.min}`);
    }

    if (this.max !== undefined && num > this.max) {
      throw new BadRequestException(`Значение должно быть не больше ${this.max}`);
    }

    return num;
  }
} 