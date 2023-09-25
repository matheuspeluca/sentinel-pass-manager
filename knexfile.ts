import type {Knex} from 'knex';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

const config: {[key: string]: Knex.Config} = {
  development: {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      port: 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: false
    },
    seeds: {
      directory: './database/seeds',
    },
    migrations: {
      directory: './database/migrations',
    }
  },
  production: {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      port: 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false }
    },
    seeds: {
      directory: './database/seeds',
    },
    migrations: {
      directory: './database/migrations',
    }
  }
};

export default config;
