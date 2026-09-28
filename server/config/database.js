import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const isLocal = ['localhost', '127.0.0.1'].includes(process.env.PGHOST)

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: isLocal ? false : { rejectUnauthorized: false }
}

export const pool = new pg.Pool(config)
