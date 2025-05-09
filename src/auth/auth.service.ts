import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto, RegisterDto, RefreshTokenDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
      },
    });

    const tokens = await this.generateTokens(user.id, user.email);
    return { user, ...tokens };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    return { user, ...tokens };
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const { sub: userId, email } = await this.jwtService.verifyAsync(dto.refreshToken);
      const tokens = await this.generateTokens(userId, email);
      return tokens;
    } catch {
      throw new UnauthorizedException('Недействительный токен обновления');
    }
  }

  async logout(userId: string) {
    // В реальном приложении здесь можно добавить токен в черный список
    return { message: 'Выход выполнен успешно' };
  }

  private async generateTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: '15m' }
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: '7d' }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
} 