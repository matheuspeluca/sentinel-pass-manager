import { Request, Response } from 'express'
import { User } from '../models/User.model';
import knex from '../../config/knex'
import bcrypt from 'bcrypt'

class UserController {

	async create(req: Request, res: Response) {
		try {
			const user = await knex<User>('users').insert({
				name: req.body.name,
				login: req.body.login,
				email: req.body.email,
				roles: req.body.roles.toString().toLowerCase(),
				password: bcrypt.hashSync(req.body.password, 8)
			}, 'id');
			res.json(user);
		} catch (error) {
			res.status(500).json({message: error});
		}
	}

	async listAll(req: Request, res: Response) {
		try {
			const users = await knex<User>('users').select();
			res.json(users);
		} catch (error) {
			res.status(500).json({message: error});
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const user = await knex<User>('users')
				.select().where('id', req.params.id);
			res.json(user);
		} catch (error) {
			res.status(500).json({message: error});
		}
	}
}
export default new UserController()