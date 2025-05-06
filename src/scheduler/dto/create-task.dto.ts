import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Type of the task' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'Scheduled execution time' })
  @IsDate()
  scheduledTime: Date;

  @ApiProperty({ description: 'Task payload' })
  @IsString()
  @IsNotEmpty()
  payload: string;
} 