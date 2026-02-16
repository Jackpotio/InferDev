import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  entities: [__dirname + '/../**/*.entity.{ts,js}'],

  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',

  // GCP SSL 연결 옵션
  ssl: { rejectUnauthorized: false },
});
