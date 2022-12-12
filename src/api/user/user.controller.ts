import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get()
  public getAllUsers(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get(':id')
  public getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUserById(id);
  }

  @Post()
  public createUser(@Body() body: UserDto): Promise<User> {
    return this.service.createUser(body);
  }
}
