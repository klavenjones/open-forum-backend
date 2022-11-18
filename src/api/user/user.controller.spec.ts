import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        findAll: jest.fn(),
        getUser: jest.fn(),
        createUser: jest.fn(() => []),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        UserServiceProvider,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
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
    it('should return one users', async () => {
      const result = { id: 1, username: 'Bill', isAdmin: true };
      jest.spyOn(service, 'getUser').mockResolvedValue(result);
      expect(await controller.getUser(1)).toBe(result);
    });
  });

  describe('createUser', () => {
    it('should not equal null when createUser is called', async () => {
      const dto = new CreateUserDto();
      expect(controller.createUser(dto)).not.toEqual(null);
    });
  });
});
