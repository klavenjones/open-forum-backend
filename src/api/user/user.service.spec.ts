import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const testUser = { username: 'TESTUSER', isAdmin: false };
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
    it('should call userRepository.create with correct parameters', async () => {
      const user = await service.createUser({ username: 'TESTUSER', isAdmin: false });

      expect(userRepository.create).toHaveBeenCalledWith({ ...testUser });
    });

    it('should call userRepository.save with correct parameters', async () => {
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
    it('should be called userRepository.find once', async () => {
      await service.findAll();
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should be called userRepository.findByOne once', async () => {
      await service.getUser(1);
      expect(userRepository.findOneBy).toHaveBeenCalled();
    });
  });
});
