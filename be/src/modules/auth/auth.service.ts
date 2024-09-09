import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from 'src/helpers/util';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async signIn(email: string, pass: string): Promise<object> {
  //   const user = await this.usersService.findByEmail(email);
  //   const isValidPassword = await comparePasswordHelper(pass, user.password);
  //   if (!isValidPassword) throw new UnauthorizedException();
  //   const payload = { sub: user._id, username: user.email };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const isValidPassword = await comparePasswordHelper(
      password,
      user.password,
    );
    if (!isValidPassword || !user)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: UserDocument) {
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
