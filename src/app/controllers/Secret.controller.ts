import { Request, Response } from 'express'
import knex from "../../config/knex";
import {Secret} from "../models/Secret.model";

class SecretController {
	store(req: Request, res: Response) {

		let encryptedPassword = req.body.password;

		knex<Secret>('secrets').insert({
			userId: req.authUser.id,
			description: req.body.description,
			url: req.body.url,
			userName: req.body.userName,
			password: encryptedPassword
		})

	}
	listAll(req: Request, res: Response) {
	}

	getById(req: Request, res: Response) {

	}

	decrypt(req: Request, res: Response) {

	}
}
export default new SecretController()