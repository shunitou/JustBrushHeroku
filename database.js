// database.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '2508/',
  port: 5431,
});

module.exports = pool;