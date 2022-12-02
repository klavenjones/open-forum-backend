import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public getUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public createUser(body: UserDto): Promise<User> {
    const newUser = this.userRepository.create({ ...body });
    return this.userRepository.save(newUser);
  }
}
