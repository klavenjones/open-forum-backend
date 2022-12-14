import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserDto } from '../src/api/auth/register/dto/register-user.dto';
import * as dotenv from 'dotenv';
import { RegisterModule } from '../src/api/auth/register/register.module';
import { UserModule } from '../src/api/user/user.module';

dotenv.config();

describe('Register user API Testing (e2e)', () => {
  let app: INestApplication;
  const registerUser: RegisterUserDto = { username: 'KlavenJ', password: 'tester12' };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
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
  });

  describe('Create a new user [POST /auth/register]', () => {
    it('should return a Bad Request 400 error and array of error messages when a user forgets to send username in the request', () => {
      const badRequest = { password: 'tester' };
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(badRequest)
        .expect(400)
        .then(({ body }) => {
          expect(body.message.includes('username must be longer than or equal to 6 characters')).toBe(true);
          expect(body.message.includes('username must be shorter than or equal to 30 characters')).toBe(true);
          expect(body.message.includes('username must be a string')).toBe(true);
        });
    });

    it('should return a Bad Request 400 error and array of error messages when a user forgets to send username in the request when a user forgets to send password in the request', () => {
      const badRequest = { username: 'klaven' };
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(badRequest)
        .expect(400)
        .then(({ body }) => {
          expect(body.message.includes('password must be longer than or equal to 8 characters')).toBe(true);
          expect(body.message.includes('password must be shorter than or equal to 64 characters')).toBe(true);
          expect(body.message.includes('password must be a string')).toBe(true);
        });
    });

    it('should return a Bad Request 400 error and array of error messages when a user forgets to send username in the request when a user sends an empty object', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.message.includes('username must be longer than or equal to 6 characters')).toBe(true);
          expect(body.message.includes('username must be shorter than or equal to 30 characters')).toBe(true);
          expect(body.message.includes('username should not be empty')).toBe(true);
          expect(body.message.includes('username must be a string')).toBe(true);
          expect(body.message.includes('password must be longer than or equal to 8 characters')).toBe(true);
          expect(body.message.includes('password must be shorter than or equal to 64 characters')).toBe(true);
          expect(body.message.includes('password should not be empty')).toBe(true);
          expect(body.message.includes('password must be a string')).toBe(true);
        });
    });

    it('should create a new user and send a success message', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerUser)
        .expect(201)
        .then(({ body }) => {
          expect(body.message).toEqual('Hey KlavenJ your registration was successful!');
          expect(body.status).toEqual(201);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
