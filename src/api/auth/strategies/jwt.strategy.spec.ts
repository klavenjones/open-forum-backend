import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/user.service';
import { JwtStrategy } from './jwt.strategy';
describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  const mockPayload = { username: 'TESTUSER', sub: 1 };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
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

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });
  describe('validate', () => {
    it('should return user', async () => {
      const user = await jwtStrategy.validate(mockPayload);

      expect(user).toBeDefined();
      expect(user.username).toBe('TESTUSER');
      expect(user.sub).toBe(1);
    });

    it('should throw an error when user is null', async () => {
      expect(async () => {
        await jwtStrategy.validate(null);
      }).rejects.toThrow(UnauthorizedException);
    });
  });
});
