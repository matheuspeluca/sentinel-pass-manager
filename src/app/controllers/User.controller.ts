import {Request, Response} from 'express'
import {User} from '../models/User.model';
import knex from '../../config/knex'
import bcrypt from 'bcryptjs'

class UserController {

    create(req: Request, res: Response) {
        knex<User>('users').insert({
            name: req.body.name,
            login: req.body.login,
            email: req.body.email,
            roles: req.body.roles.toString().toLowerCase(),
            password: bcrypt.hashSync(req.body.password, 8)
        }, 'id').then((result) => {
            res.status(201).json(result);
        }).catch((err) => {
            res.status(500).json({message: err});
        });
    }

    listAll(req: Request, res: Response) {
        knex<User>('users').select()
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
            res.status(500).json({message: err});
        });
    }

    getById(req: Request, res: Response) {
        knex<User>('users').select()
            .where('id', req.params.userId)
            .then((result) => {
                if (result.length) {
                    res.status(200).json(result[0]);
                } else {
                    res.status(404).json({message: "User not found"});
                }
            }).catch((err) => {
            res.status(500).json({message: err});
        });
    }

    delete(req: Request, res: Response) {
        knex<User>('users').select()
            .where('id', req.params.userId)
            .then((result) => {
                if (!result.length) {
                    res.status(404).json({message: "User not found"});
                } else if (result[0].roles.includes('admin')) {
                    knex<User>('users').select()
                        .where('roles', 'like', '%admin%')
                        .then((result) => {
                            if (result.length > 1) {
                                this.deleteUser(req, res);
                            } else {
                                res.status(403).json({message: "Cannot delete the last admin"});
                            }
                        }).catch((err) => {
                        res.status(500).json({message: err});
                    });
                } else {
                    this.deleteUser(req, res);
                }
            }).catch((err) => {
            res.status(500).json({message: err});
        });
    }

    private deleteUser(req: Request, res: Response) {
        knex<User>('users').where('id', req.params.userId).del()
            .then((result) => {
                res.status(204).json(result);
            }).catch((err) => {
            res.status(500).json({message: err});
        });
    }
}

export default new UserController()