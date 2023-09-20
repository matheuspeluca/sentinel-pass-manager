import {Request, Response} from 'express'
import knex from "../../config/knex";
import {Secret} from "../models/Secret.model";

class SecretController {
    store(req: Request, res: Response) {
        knex<Secret>('secrets').insert({
            userId: req.authUser.id,
            description: req.body.description,
            url: req.body.url,
            userName: req.body.userName,
            password: req.body.password
        }, "*").then((result) => {
            res.status(201).json(result);
        }).catch((err) => {
            res.status(500).json({message: err});
        });
    }

    listAll(req: Request, res: Response) {
        knex<Secret>('secrets')
            .select()
            .where('userId', req.authUser.id)
            .then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
            res.status(500).json({message: err});
        });
    }

    getById(req: Request, res: Response) {
        knex<Secret>('secrets')
            .select()
            .where('id', req.params.secretId)
            .andWhere('userId', req.authUser.id)
            .then((result) => {
                if (result.length) {
                    res.status(200).json(result[0]);
                } else {
                    res.status(404).json({message: "Secret not found"});
                }
            }).catch((err) => {
            res.status(500).json({message: err.toString()});
        });
    }

    delete(req: Request, res: Response) {
        knex<Secret>('secrets')
            .where('id', req.params.secretId)
            .andWhere('userId', req.authUser.id)
            .del()
            .then((result) => {
                if (result) {
                    res.status(200).json({message: "Secret deleted"});
                } else {
                    res.status(404).json({message: "Secret not found"});
                }
            }).catch((err) => {
            res.status(500).json({message: err});
        });
    }

    update(req: Request, res: Response) {

        let {description, url, userName, password} = req.body;

        knex<Secret>('secrets').select()
            .where('id', req.params.secretId)
            .andWhere('userId', req.authUser.id)
            .then((result) => {
                if (result.length) {
                    if (!description) {
                        description = result[0].description;
                    }
                    if (!url) {
                        url = result[0].url;
                    }
                    if (!userName) {
                        userName = result[0].userName;
                    }
                    if (!password) {
                        password = result[0].password;
                    }

                    knex<Secret>('secrets')
                        .where('id', req.params.secretId)
                        .andWhere('userId', req.authUser.id)
                        .update({
                            description: description,
                            url: url,
                            userName: userName,
                            password: password
                        }, '*')
                        .then((result) => {
                            if (result) {
                                res.status(200).json(result[0]);
                            } else {
                                res.status(404).json({message: "Secret not found"});
                            }
                        }).catch((err) => {
                        res.status(500).json({message: err});
                    });
                } else {
                    res.status(404).json({message: "Secret not found"});
                }
            }).catch((err) => {
            res.status(500).json({message: err});
        });
    }
}

export default new SecretController()