import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUserDto } from '../src/api/auth/login/dto/login-user.dto';
import * as dotenv from 'dotenv';
import { RegisterUserDto } from '../src/api/auth/register/dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/api/user/user.service';

dotenv.config();

describe('Login user API Testing (e2e)', () => {
  let userService: UserService;
  let app: INestApplication;
  const registerUserDto: RegisterUserDto = { username: 'KlavenJ', password: bcrypt.hashSync('tester12', 8) };
  const loginUser: LoginUserDto = { username: 'KlavenJ', password: 'tester12' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: process.env.TEST_DATABASE_HOST,
            username: process.env.TEST_DATABASE_USER,
            port: 5432,
            database: process.env.TEST_DATABASE_NAME,
            password: process.env.TEST_DATABASE_PASSWORD,
            synchronize: true,
            autoLoadEntities: true,
            dropSchema: true,
          }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    userService = moduleFixture.get<UserService>(UserService);
    await userService.createUser(registerUserDto);

    await app.init();
  });

  describe('Login a user [POST /auth/login]', () => {
    it('should return a Unauthorized 401 when a user does enter correct credentials', () => {
      const badRequest = { password: 'tester' };
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(badRequest)
        .expect(401)
        .then(({ body }) => {
          expect(body.message).toBe('Unauthorized');
        });
    });

    it('should return a response with a status of 200 ', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginUser)
        .expect(200)
        .then(({ body }) => {
          expect(body.message).toBe('Success');
        });
    });

    it('should return a response with cookies set', async () => {
      const response = await request(app.getHttpServer()).post('/auth/login').send(loginUser);
      //Check if auth-cookie is set
      expect(response.get('Set-Cookie')[0].includes('auth-cookie=;')).toBe(false);
    });
  });

  describe('Logout a user [GET /auth/logout', () => {
    it('should return a status code of 200 when the user successfully logs out', () => {
      return request(app.getHttpServer())
        .get('/auth/logout')
        .expect(200)
        .then(({ body }) => {
          expect(body.message).toBe('Success');
        });
    });

    it('should should clear cookies when successfully logged out', async () => {
      const response = await request(app.getHttpServer()).get('/auth/logout');
      //Check if auth-cookie is unset.
      expect(response.get('Set-Cookie')[0].includes('auth-cookie=;')).toBe(true);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
