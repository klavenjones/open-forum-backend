import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterService } from './register.service';
import * as bcrypt from 'bcrypt';

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
            create: jest.fn(),
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
      jest.spyOn(userService, 'createUser').mockResolvedValue(
        new Promise<User>(resolve => {
          resolve(testUser);
        })
      );

      await registerService.register({ ...testRegistered });
      expect(userService.createUser).toHaveBeenCalled();
    });
    it('should return the user when created.', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValue(
        new Promise<User>(resolve => {
          resolve({ ...testUser, password: bcrypt.hashSync(testUser.password, 8) });
        })
      );

      const user = await registerService.register({ ...testRegistered });
      expect(user).toBeDefined();
      expect(user.username).toBe('TESTUSER');
    });

    it('should return the correct user with hashed password.', async () => {
      jest.spyOn(userService, 'createUser').mockResolvedValue(
        new Promise<User>(resolve => {
          resolve({ ...testUser, password: bcrypt.hashSync(testUser.password, 8) });
        })
      );

      const user = await registerService.register({ ...testRegistered });
      expect(bcrypt.compareSync(testUser.password, user.password)).toBe(true);
    });
  });
});
