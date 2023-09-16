import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('login', 100).unique().notNullable();
        table.string('password', 100).notNullable();
        table.string('email', 100).unique().notNullable();
        table.string('name', 200).notNullable();
        table.string('roles', 200).notNullable().defaultTo('user');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}

