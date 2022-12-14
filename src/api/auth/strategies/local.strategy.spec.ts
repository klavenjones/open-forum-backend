import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { LoginUserDto } from '../login/dto/login-user.dto';
import { LoginService } from '../login/login.service';
import { LocalStrategy } from './local.strategy';
describe('LocalStrategy', () => {
  let loginService: LoginService;
  let localStrategy: LocalStrategy;

  const mockReturnedUser = {
    id: 1,
    username: 'TESTUSER',
    isAdmin: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const loginData: LoginUserDto = {
    username: 'TESTUSER',
    password: 'tester123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        LocalStrategy,
        UserService,
        JwtService,
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
    loginService = module.get<LoginService>(LoginService);
    localStrategy = module.get<LocalStrategy>(LocalStrategy);
  });
  describe('validate', () => {
    it('should use the loginService properly', async () => {
      jest.spyOn(loginService, 'validateUser').mockResolvedValue(mockReturnedUser);

      const user = await localStrategy.validate(loginData.username, loginData.password);

      expect(loginService.validateUser).toHaveBeenCalled();
      expect(loginService.validateUser).toHaveBeenCalledWith(loginData.username, loginData.password);
    });

    it('should return user', async () => {
      jest.spyOn(loginService, 'validateUser').mockResolvedValue(mockReturnedUser);

      const user = await localStrategy.validate(loginData.username, loginData.password);

      expect(user).toBeDefined();
      expect(user.username).toBe('TESTUSER');
      expect(user.id).toBe(1);
    });

    it('should throw an error when user is null', async () => {
      jest.spyOn(loginService, 'validateUser').mockResolvedValue(null);

      expect(async () => {
        await localStrategy.validate(loginData.username, loginData.password);
      }).rejects.toThrow(UnauthorizedException);
    });
  });
});
