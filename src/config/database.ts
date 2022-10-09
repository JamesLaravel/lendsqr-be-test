import knex from "knex";
import KnexConfig from "./knexfile";

const config = KnexConfig[process.env.APP_ENV || "development"];
const database = knex(config);

export default database;
