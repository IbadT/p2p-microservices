import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'User role', enum: UserRole, required: false })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsOptional()
  isExchangerActive?: boolean;
}
