import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { createMock } from '@golevelup/ts-jest';

describe('RegisterController', () => {
  let controller: RegisterController;
  let registerService: RegisterService;

  beforeEach(async () => {
    const RegisterServiceProvider = {
      provide: RegisterService,
      useFactory: () => ({
        register: jest.fn(),
      }),
    };

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
      controllers: [RegisterController],
      providers: [RegisterServiceProvider, UserServiceProvider],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
    registerService = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('calls service.register() method', async () => {
      const body: RegisterUserDto = {
        username: 'Klay',
        password: 'tester',
      };

      const mockResponse = () => {
        return createMock<any>({
          json: jest.fn().mockReturnThis(),
          status: jest.fn().mockReturnThis(),
        });
      };

      const response = mockResponse();

      await controller.register(response, body);

      expect(await registerService.register).toHaveBeenCalledWith({ ...body });
    });
  });
});
