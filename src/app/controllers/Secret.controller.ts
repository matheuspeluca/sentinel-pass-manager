import { Request, Response } from 'express'

class SecretController {
	async store(req: Request, res: Response) {
		console.log(req.authUser)
		res.json()
	}

	decrypt() {

	}
}
export default new SecretController()