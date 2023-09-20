import {Request, Response} from 'express'
import {User} from '../models/User.model';
import knex from '../../config/knex'
import authConfig from '../../config/auth'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class LoginController {
    login(req: Request, res: Response) {
        knex<User>('users').select()
            .where('login', req.body.login)
            .then((result) => {
                if (result.length) {
                    let user = result[0];
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let token = jwt.sign({
                            id: user.id,
                            roles: user.roles.toLowerCase().split(';')
                        }, authConfig.secret, {
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
                    } else {
                        res.status(401).json({message: "Incorrect email/password combination"});
                    }
                } else {
                    res.status(401).json({message: "Incorrect email/password combination"});
                }
            }).catch((err) => {
            res.status(500).json({message: err});
        });
    }

    register(req: Request, res: Response) {
        knex<User>('users').select()
            .where('login', req.body.login)
            .orWhere('email', req.body.email)
            .then((result) => {
                if (result.length) {
                    res.status(409).json({message: "User already exists"});
                } else {
                    knex<User>('users').insert({
                        login: req.body.login,
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 8)
                    }).then((result) => {
                        res.status(201).json(result);
                    }).catch((err) => {
                        res.status(500).json({message: err});
                    });
                }
            }).catch((err) => {
            res.status(500).json({message: err});
        });
    }
}

export default new LoginController()