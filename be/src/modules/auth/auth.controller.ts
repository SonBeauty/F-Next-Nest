import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public } from '../decorator/customize';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: SignInDto) {
    return this.authService.handleRegister(registerDto);
  }
}
