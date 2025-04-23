import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    if (body.username === 'demo' && body.password === '1234') {
      return this.authService.login({ id: 1, username: 'demo' });
    }
    return { message: 'Invalid credentials' };
  }
}
