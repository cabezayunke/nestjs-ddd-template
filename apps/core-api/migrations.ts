import * as dotenv from "dotenv";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const envPath = { path: path.resolve(__dirname, `../../.env.${process.env['MIGRATIONS_ENV']}`) };
dotenv.config(envPath);

const password = process.env['COCKROACH_PASSWORD'] 
  ? { password: process.env['COCKROACH_PASSWORD']} 
  : {}

const migrationsPath = path.resolve(__dirname, '../../apps/core-api/migrations/*');
const opts = {
  type: "postgres",
  host: process.env['COCKROACH_HOST'],
  port: Number(process.env['COCKROACH_PORT']),
  username: process.env['COCKROACH_USER'],
  database: process.env['COCKROACH_DB'],
  logging: true,
  logger: 'advanced-console',
  migrations: [migrationsPath],
  ...password
}

const source = new DataSource(opts as DataSourceOptions)
export default source;
