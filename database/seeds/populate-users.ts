import { Knex } from "knex";
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    const users = [
        {
            login: 'admin',
            password: bcrypt.hashSync('1234', 8),
            email: 'admin@example.com',
            name: 'Master User Admin of Universe',
            roles: 'admin;user'
        },
        {
            login: 'user',
            password: bcrypt.hashSync('1234', 8),
            email: 'user@example.com',
            name: 'Common User',
            roles: 'user'
        }
    ];

    await knex('users').insert(users);
}
