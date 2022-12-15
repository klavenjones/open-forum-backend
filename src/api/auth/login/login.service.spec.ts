import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginService } from './login.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

describe('LoginService', () => {
  let loginService: LoginService;
  let userService: UserService;

  const testUser: User = {
    id: 1,
    username: 'TESTUSER',
    password: 'testing123',
    isAdmin: false,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };

  const testLoginUser: LoginUserDto = {
    username: 'TESTUSER',
    password: 'testing123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService,
        LoginService,
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

    userService = module.get<UserService>(UserService);
    loginService = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(loginService).toBeDefined();
  });

  describe('validateUser', () => {
    it('calls userService.getUserByUsername method.', async () => {
      jest.spyOn(userService, 'getUserByUsername').mockResolvedValue({ ...testUser });

      await loginService.validateUser(testLoginUser.username, testLoginUser.password);
      expect(userService.getUserByUsername).toHaveBeenCalled();
      expect(userService.getUserByUsername).toBeCalledWith(testLoginUser.username);
    });

    it('should return user when user password match', async () => {
      const { password, ...rest } = testUser; // eslint-disable-line
      jest.spyOn(userService, 'getUserByUsername').mockResolvedValue(
        new Promise<User>(resolve => {
          resolve({ ...testUser, password: bcrypt.hashSync(testUser.password, 8) });
        })
      );

      const mockUserWithoutPassword = { ...rest };

      const user = await loginService.validateUser(testLoginUser.username, testLoginUser.password);

      expect(user).toBeDefined();
      expect(user).toEqual(mockUserWithoutPassword);
    });

    it('should return null when password does not match', async () => {
      jest.spyOn(userService, 'getUserByUsername').mockResolvedValue(
        new Promise<User>(resolve => {
          resolve({ ...testUser, password: bcrypt.hashSync(testUser.password, 8) });
        })
      );

      const user = await loginService.validateUser(testLoginUser.username, 'wrongpassword');
      expect(user).toBe(null);
    });
  });
});
