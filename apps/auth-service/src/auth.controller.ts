import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

interface RegisterDto {
  email: string;
  password: string;
}

interface VerifyDto {
  email: string;
  otp: string;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register' })
  async register(payload: RegisterDto): Promise<{ message: string }> {
    return this.authService.register(payload);
  }

  @MessagePattern({ cmd: 'verify' })
  async verify(payload: VerifyDto): Promise<{ message: string }> {
    return this.authService.verify(payload);
  }
}
