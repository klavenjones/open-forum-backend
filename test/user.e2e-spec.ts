import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../src/api/user/user.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

describe('Users API Testing (e2e)', () => {
  let app: INestApplication;
  const createUser: CreateUserDto = { username: 'Klaven', isAdmin: false };
  const result = {
    id: expect.any(Number),
    username: 'Klaven',
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
            database: 'postgres',
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

  describe('Create a new user [POST /users]', () => {
    it('should return a Bad Request 400 error when a user does not send isAdmin in the request', () => {
      const badRequest = { username: 'Klaven' };
      return request(app.getHttpServer())
        .post('/users')
        .send(badRequest)
        .expect(400)
        .then(({ body }) => {
          expect(body.message[0]).toEqual('isAdmin must be a boolean value');
        });
    });

    it('should return a Bad Request 400 error when a user forgets to send username in the request', () => {
      const badRequest = { isAdmin: true };
      return request(app.getHttpServer())
        .post('/users')
        .send(badRequest)
        .expect(400)
        .then(({ body }) => {
          expect(body.message[0]).toEqual('username should not be empty');
        });
    });

    it('should return a Bad Request 400 error when a user sends an empty object', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.message[0]).toEqual('username should not be empty');
          expect(body.message[1]).toEqual('username must be a string');
          expect(body.message[2]).toEqual('isAdmin must be a boolean value');
        });
    });

    it('should create a new user and return the user created', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(createUser)
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual({ ...result });
        });
    });
  });

  describe('Get all users [GET /users]', () => {
    it('should return an array of users', async () => {
      const { body } = await request
        .agent(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(body).toEqual([{ ...result }]);
    });
  });

  describe('Get one user [GET /user/:id]', () => {
    it('should return a single user', async () => {
      const { body } = await request
        .agent(app.getHttpServer())
        .get(`/users`)
        .query({ id: 1 })
        .set('Accept', 'application/json')
        .expect(200);

      expect(body).toEqual([{ ...result }]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
