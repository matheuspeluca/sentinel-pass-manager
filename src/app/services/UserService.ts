import * as Yup from 'yup'
import {User} from '../models/User.model'
import knex from '../../config/knex';

interface Request {
    email: string
    password: string
    //add demais campos
}

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6),
})

class UserService {

    public async create(req: Request) {
  
    }
  }
  
  export default UserService