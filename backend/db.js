import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgresnew',
  host: process.env.DB_HOST || 'postgres',
  database: process.env.DB_NAME || 'db',
  password: process.env.DB_PASSWORD || '1234',
  port: Number(process.env.DB_PORT) || 5432,
});

export default pool;
