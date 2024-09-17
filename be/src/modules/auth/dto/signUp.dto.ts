import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  name: string;
}
