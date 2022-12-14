import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        findAll: jest.fn(),
        getUserByUsername: jest.fn(),
        getUserByUserId: jest.fn(),
        createUser: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService, UserServiceProvider],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a user', async () => {
      const user: LoginUserDto = {
        username: 'Klaven',
        password: 'tester',
      };

      const loggedInUser = await controller.login({ user: user });

      expect(loggedInUser.username).toBe(user.username);
    });
  });
});
