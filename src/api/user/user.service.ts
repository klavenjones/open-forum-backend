import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
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

  public createUser(body: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({ ...body });
    return this.userRepository.save(newUser);
  }
}
