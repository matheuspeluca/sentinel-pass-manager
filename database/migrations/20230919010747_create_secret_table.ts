import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('secrets', table => {
        table.increments('id').primary();
        table.bigInteger('userId').unsigned().index().references('id').inTable('users');
        table.string('description', 255).nullable();
        table.string('url', 255).nullable();
        table.string('userName', 255).nullable();
        table.binary('password').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('secrets');
}

