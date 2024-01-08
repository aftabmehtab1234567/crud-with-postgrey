// Db/Connection.js

import pkg from 'pg';
const { Client } = pkg;

import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432', 10),
});

async function connectAndQuery() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Perform your queries or any other operations here

  } catch (error) {
    console.error('Error:', error);
  }
}

// Export the connected client for other modules to use
export { connectAndQuery, client };
