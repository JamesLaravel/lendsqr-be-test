import { Knex } from "knex";

const tableName = "users";

export async function up(knex: Knex): Promise<void> {
  try {
    return knex.schema.createTable(tableName, function (table) {
      table.increments("id").unsigned();
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
      table.string("email", 255).notNullable();
      table.string("phone", 255).notNullable();
      table.string("address", 255).notNullable();
      table.string("country", 255).notNullable();
      table.string("state", 255).notNullable();
      table.string("password", 255).notNullable();
      table.boolean("accountLocked").defaultTo(false);
      table.date("lastLoginAt");
      table.timestamps(true, true);
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function down(knex: Knex): Promise<void> {
  try {
    return knex.schema.dropTable(tableName);
  } catch (e) {
    return Promise.reject(e);
  }
}
