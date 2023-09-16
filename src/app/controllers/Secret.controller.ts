import { Request, Response } from 'express'
import { User } from '../models/User.model';
import knex from '../../config/knex'

class SecretController {
	async store(req: Request, res: Response) {
		console.log(req.user)
		res.json()
	}
}
export default new SecretController()