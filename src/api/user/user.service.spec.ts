import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const testUser = {
    username: 'TESTUSER',
    password: 'testing123',
    isAdmin: false,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should call the userRepository.save method with the correct parameters', async () => {
      jest.spyOn(userRepository, 'create').mockReturnValueOnce({
        id: 1,
        ...testUser,
      });

      await service.createUser({ ...testUser });

      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        ...testUser,
      });
    });
  });

  describe('findAll', () => {
    it('should call the userRepository.find method', async () => {
      await service.findAll();
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should be call the userRepository.findByOne method', async () => {
      await service.getUserById(1);
      expect(userRepository.findOneBy).toHaveBeenCalled();
    });

    it('should call userRepository.findByOne with the correct parameters', async () => {
      await service.getUserById(1);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('getUserByUsername', () => {
    it('should be call the userRepository.findByOne method', async () => {
      await service.getUserByUsername('TESTUSER');
      expect(userRepository.findOneBy).toHaveBeenCalled();
    });

    it('should call userRepository.findByOne with the correct parameters', async () => {
      await service.getUserByUsername('TESTUSER');
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ username: 'TESTUSER' });
    });
  });
});
