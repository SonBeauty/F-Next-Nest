import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, ResponseMessage } from '../../decorator/customize';
import { SignInDto } from './dto/signIn.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('login')
  @Public()
  @ResponseMessage('login')
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: SignInDto) {
    return this.authService.handleRegister(registerDto);
  }

  @Get('mail')
  @Public()
  testmail() {
    this.mailerService.sendMail({
      to: 'sont9779@gmail.com',
      subject: 'test mail',
      text: 'welcome',
      template: 'register',
      context: {
        name: 'Son',
        activationCode: 123445455,
      },
    });
    return 'ok';
  }
}
