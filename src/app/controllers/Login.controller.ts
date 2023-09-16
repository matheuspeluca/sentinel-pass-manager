import {Request, Response} from 'express'
import {User} from '../models/User.model';
import knex from '../../config/knex'
import authConfig from '../../config/auth'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class LoginController {

    async login(req: Request, res: Response) {
        try {
            const {login, password} = req.body
            const users = await knex<User>('users')
                .select().where('login', login);

            if (users.length) {
                let user = users[0];
                if (bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({id: user.id, roles: user.roles.toLowerCase().split(';')}, authConfig.secret, {
                        expiresIn: authConfig.expiresIn,
                    });
                    res.cookie('token', token, {httpOnly: true})
                        .status(200)
                        .json({
                            id: user.id,
                            login: user.login,
                            name: user.name,
                            roles: user.roles,
                            token: token
                        })
                }
            } else {
                res.status(401).json({message: "Incorrect email/password combination"});
            }
        } catch (err) {
            res.status(500).json({message: "Login verification failed: " + err.message});
        }
    }
}

export default new LoginController()