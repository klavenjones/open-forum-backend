import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        findAll: jest.fn(),
        getUserById: jest.fn(),
        createUser: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserServiceProvider],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('calls service.findAll method', async () => {
      controller.getAllUsers();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should call service.getUser with the correct id parameter', async () => {
      await controller.getUserById(1);
      expect(await service.getUserById).toHaveBeenCalledWith(1);
    });
  });

  describe('createUser', () => {
    it('should call service.createUser with the correct parameters', async () => {
      const body: UserDto = {
        username: 'Klay',
        password: 'tester',
      };
      await controller.createUser(body);
      expect(await service.createUser).toHaveBeenCalledWith({ ...body });
    });
  });
});
