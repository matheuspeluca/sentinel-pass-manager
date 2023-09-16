import UserService from '@services/UserService'
import { Request, Response } from 'express'

class UserController {
  async create(req: Request, res: Response) {
    const createUser = new UserService()
    const user = await createUser.create(req.body)
    return res.json(user)
  }
}

export default new UserController()