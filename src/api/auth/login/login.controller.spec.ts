import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../..//user/user.entity';
import { UserService } from '../../user/user.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const LoginServiceProvider = {
      provide: LoginService,
      providers: [UserService],
      useFactory: () => ({
        getToken: jest.fn(),
        validateUser: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        LoginService,
        LocalStrategy,
        UserService,
        LoginServiceProvider,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a success message', async () => {
      const user: LoginUserDto = {
        username: 'Klaven',
        password: 'tester',
      };

      const mockRequest = () => {
        return createMock<any>({
          cookie: jest.fn().mockReturnThis(),
          status: jest.fn().mockReturnThis(),
        });
      };

      const request = mockRequest();

      const success = await controller.login({ user: user }, request);
      expect(request.cookie).toHaveBeenCalledTimes(1);
      expect(success.message).toBe('Success');
    });

    it('should call request.cookie once', async () => {
      const user: LoginUserDto = {
        username: 'Klaven',
        password: 'tester',
      };

      const mockRequest = () => {
        return createMock<any>({
          cookie: jest.fn().mockReturnThis(),
          status: jest.fn().mockReturnThis(),
        });
      };

      const request = mockRequest();
      await controller.login({ user: user }, request);

      expect(request.cookie).toHaveBeenCalledTimes(1);
    });
  });
});
