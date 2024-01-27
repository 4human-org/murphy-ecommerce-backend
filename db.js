const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Log when a connection to the database is successfully established
pool.on('connect', () => {
  console.log('Connected to the database successfully.');
});

// Log any errors encountered by the pool
pool.on('error', (err) => {
  console.log('Error encountered:', err);
});

module.exports = pool;