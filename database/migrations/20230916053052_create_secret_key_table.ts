import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('secret_keys', table => {
        table.increments('id').primary();
        table.bigInteger('userId').unsigned().unique().index().references('id').inTable('users');
        table.binary('secretKey').notNullable();
        table.string('iv', 16).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('secret_keys');
}

