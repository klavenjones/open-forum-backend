import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let userRepository: Repository<User>;

  const testUser = {
    username: 'TESTUSER',
    password: 'testing123',
    isAdmin: false,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            createUser: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    service = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
