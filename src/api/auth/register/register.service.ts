import { Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(private readonly usersService: UserService) {}

  public async register(registerUserDto: RegisterUserDto): Promise<User> {
    registerUserDto.password = bcrypt.hashSync(registerUserDto.password, 8);
    return this.usersService.createUser(registerUserDto);
  }
}
