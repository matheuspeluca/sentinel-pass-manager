import type {Knex} from 'knex';
import databaseConfig from './src/config/database'

const config: {[key: string]: Knex.Config} = {
  development: {
    client: 'postgres',
    connection: {
      host: databaseConfig.host,
      port: 5432,
      user: databaseConfig.user,
      password: databaseConfig.pass,
      database: databaseConfig.name,
      ssl: { rejectUnauthorized: false }
    },
    seeds: {
      directory: './database/seeds',
    },
    migrations: {
      directory: './database/migrations',
    }
  },
};

export default config;
