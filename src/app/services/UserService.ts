import * as Yup from 'yup'
import {User} from '../models/User.model'
import knex from '../../config/knex';
import bcrypt from 'bcrypt'
import AppError from '../../errors/AppError'

interface Request {
    login: string
    email: string
    password: string
    name: string
}

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    login: Yup.string().required(),
    name: Yup.string().required(),
    password: Yup.string().required().min(6),
})

class UserService {

    public async create(req: Request) {
        if (!(await schema.isValid(req))) {
            throw new AppError('Validation fails')
        }
  
        try {
            const user = await knex<User>('users').insert({
                name: req.name,
                login: req.login,
                email: req.email,
                password: bcrypt.hashSync(req.password, 8)
            }, 'id');
            return user;
            
        } catch (error) {
            throw new AppError(error)
        }
    }
  }
  
  export default UserService