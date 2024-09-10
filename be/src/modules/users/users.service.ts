import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { hashPassword } from 'src/helpers/util';
import aqp from 'api-query-params';
import { SignInDto } from '../auth/dto/signIn.dto';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private mailerService: MailerService,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    return false;
  };
  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, image } = createUserDto;
    const isEmailExist = await this.isEmailExist(email);
    if (isEmailExist)
      throw new BadRequestException(`Email ${email} already exist`);
    const hashedPassword = await hashPassword(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      image,
    });
    return user;
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;
    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any)
      .select('-password');
    return { results, totalPages };
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { _id } = updateUserDto;
    return await this.userModel.updateOne({ _id }, { ...updateUserDto });
  }

  async remove(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new BadRequestException('Invalid id');
    return await this.userModel.deleteOne({ _id: id });
  }

  async handleRegister(registerDto: SignInDto) {
    const { name, email, password } = registerDto;

    //check email
    const isEmailExist = await this.isEmailExist(email);
    if (isEmailExist)
      throw new BadRequestException(`Email ${email} already exist`);

    //hash password
    const hashedPassword = await hashPassword(password);
    const codeId = uuidv4();
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      isActive: false,
      codeExpired: dayjs().add(1, 'minutes'),
      codeId,
    });

    // send email
    this.mailerService.sendMail({
      to: user.email,
      subject: 'Acitve your account at @Sondeptrai',
      template: 'register',
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId,
      },
    });

    return {
      _id: user._id,
    };
  }
}
