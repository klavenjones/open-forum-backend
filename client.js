const { Client } = require('pg');

const pgclient = new Client({
  host: process.env.TEST_POSTGRES_HOST,
  port: process.env.TEST_POSTGRES_PORT,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
});

pgclient.connect();

const table = 'CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(120), isAdmin boolean)';
const text = 'INSERT INTO users(username, isAdmin) VALUES($1, $2) RETURNING *';
const values = ['Eric', false];

pgclient.query(table, (err, res) => {
  if (err) throw err;
});

pgclient.query(text, values, (err, res) => {
  if (err) throw err;
});

pgclient.query('SELECT * FROM users', (err, res) => {
  if (err) throw err;
  console.log(err, res.rows); // Print the data in student table
  pgclient.end();
});
