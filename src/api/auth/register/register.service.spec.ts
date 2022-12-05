import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let registerService: RegisterService;
  let userService: UserService;

  const testUser: User = {
    id: 1,
    username: 'TESTUSER',
    password: 'testing123',
    isAdmin: false,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };

  const testRegistered: RegisterUserDto = {
    username: 'TESTUSER',
    password: 'testing123',
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

    registerService = module.get<RegisterService>(RegisterService);
    userService = module.get<UserService>(UserService);
  });

  describe('register', () => {
    it('should call userService.createUser atleast once.', async () => {
      jest.spyOn(userService, 'createUser').mockReturnValueOnce(
        new Promise<User>(resolve => {
          resolve(testUser);
        })
      );

      await registerService.register({ ...testRegistered });
      expect(userService.createUser).toHaveBeenCalled();
    });
  });
});
