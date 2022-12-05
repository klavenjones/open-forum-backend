import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

//Initial Database connection. Default Database configuration, this will allow you to connect and create tables.
const pgclient = new Client({
  host: process.env.DATABASE_HOST,
  port: 5432,
  password: process.env.DATABASE_PASSWORD,
  database: 'postgres',
});

pgclient.connect();

const dbQuery = (query: string, successMessage: string, exitScript = false) => {
  pgclient.query(query, error => {
    if (error) {
      console.log('ERROR', error);
      process.exit(1);
    }
    console.log(successMessage);
    if (exitScript) process.exit(0);
  });
};

//Create Development Databases
const dropDatabaseIfExists = `DROP DATABASE IF EXISTS ${process.env.DATABASE_NAME}`;
dbQuery(dropDatabaseIfExists, `DROPPED DATABASE SUCCESFULLY`);

const createDatabase = `CREATE DATABASE ${process.env.DATABASE_NAME}`;
dbQuery(createDatabase, `CREATED DATABASE SUCCESFULLY`, true);
