import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g., postgres://user:password@localhost:5432/your_db
});

export default pool;