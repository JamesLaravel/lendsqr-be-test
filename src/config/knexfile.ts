import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

import { Knex } from "knex";
import { env } from "../utils";
interface IKnexConfig {
  [key: string]: Knex.Config;
}

const database = env("MYSQL_DATABASE_NAME");
const user = env("MYSQL_DATABASE_USERNAME");
const password = env("MYSQL_DATABASE_PASSWORD");
const showLogs = env("SHOW_SQL_LOGS");
const host = env("MYSQL_DATABASE_HOST");
const port = Number(env("MYSQL_DATABASE_PORT"));
const client = env("CLIENT");

const KnexConfig: IKnexConfig = {
  development: {
    client,
    connection: {
      database,
      user,
      password,
      port,
      host,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: "../migrations",
    },
  },
};

export default KnexConfig;
