import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { RegisterUserDto } from '../src/api/auth/register/dto/register-user.dto';
import { LoginModule } from '../src/api/auth/login/login.module';
import { RegisterModule } from '../src/api/auth/register/register.module';

dotenv.config();

describe('Login user API Testing (e2e)', () => {
  let app: INestApplication;
  const registerUserDto: RegisterUserDto = { username: 'KlavenJones', password: 'tester123' };
  const loginUser: RegisterUserDto = { username: 'KlavenJones', password: 'tester123' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        LoginModule,
        RegisterModule,
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

    await app.init();
    //Create User
    await request(app.getHttpServer()).post('/auth/register').send(registerUserDto);
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
