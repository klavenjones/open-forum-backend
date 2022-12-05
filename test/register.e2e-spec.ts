import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserDto } from '../src/api/auth/register/dto/register-user.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

describe('Register user API Testing (e2e)', () => {
  let app: INestApplication;
  const registerUser: RegisterUserDto = { username: 'Klaven', password: 'tester' };
  const result = {
    id: expect.any(Number),
    username: 'Klaven',
    password: expect.any(String),
    isAdmin: false,
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    deletedAt: null,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
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
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  describe('Create a new user [POST /auth/register]', () => {
    it('should return a Bad Request 400 error when a user forgets to send username in the request', () => {
      const badRequest = { password: 'tester' };
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(badRequest)
        .expect(400)
        .then(({ body }) => {
          expect(body.message.includes('username must be shorter than or equal to 120 characters')).toBe(true);
          expect(body.message.includes('username should not be empty')).toBe(true);
          expect(body.message.includes('username must be a string')).toBe(true);
        });
    });

    it('should return a Bad Request 400 error when a user forgets to send password in the request', () => {
      const badRequest = { username: 'klaven' };
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(badRequest)
        .expect(400)
        .then(({ body }) => {
          expect(body.message.includes('password must be shorter than or equal to 60 characters')).toBe(true);
          expect(body.message.includes('password should not be empty')).toBe(true);
          expect(body.message.includes('password must be a string')).toBe(true);
        });
    });

    it('should return a Bad Request 400 error when a user sends an empty object', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.message.includes('username must be shorter than or equal to 120 characters')).toBe(true);
          expect(body.message.includes('username should not be empty')).toBe(true);
          expect(body.message.includes('username must be a string')).toBe(true);
          expect(body.message.includes('password must be shorter than or equal to 60 characters')).toBe(true);
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
          expect(body.message).toEqual('Hey Klaven your registration was successful!');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
