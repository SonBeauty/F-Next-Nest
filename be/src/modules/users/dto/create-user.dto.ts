import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'aloooo' })
  name: string;

  age: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  password: string;
  phone: string;
  address: string;
  image: string;
}
