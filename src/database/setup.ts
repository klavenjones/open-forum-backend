import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

//Initial Database connection. Default Database configuration, this will allow you to connect and create tables.
const pgclient = new Client({
  host: 'localhost',
  port: 5432,
  password: 'postgres',
  database: 'postgres',
});

pgclient.connect();

const dropDatabaseIfExists = `DROP DATABASE IF EXISTS ${process.env.DATABASE_NAME}`;
const createDatabase = `CREATE DATABASE ${process.env.DATABASE_NAME}`;

pgclient.query(dropDatabaseIfExists, error => {
  if (error) {
    console.log('ERROR', error);
    process.exit(1);
  }

  console.log(`Database dropped succesfully`);
});

pgclient.query(createDatabase, error => {
  if (error) {
    console.log('ERROR', error);
    process.exit(1);
  }

  console.log(`Database created succesfully`);
  process.exit(0);
});
