import {Request, Response} from 'express'
import {User} from '../models/User.model';
import knex from '../../config/knex'
import bcrypt from "bcrypt";

import * as crypto from "crypto";
import {SecretKey} from "../models/SecretKey.model";
import encryptionUtil from "../util/Encryption.util";

class SecretController {
    private _salt = 'posinupqw8j3paoueyvna';

    create(req: Request, res: Response) {
        const {password} = req.body

        // check if user already has a secret key
        knex<SecretKey>('secret_keys')
            .select().where('userId', req.authUser.id)
            .then((rows) => {
                if (!rows.length) {
                    // check if user password is correct
                    knex<User>('users')
                        .select().where('id', req.authUser.id)
                        .then((users) => {
                            if (users.length) {
                                let user = users[0];
                                if (bcrypt.compareSync(password, user.password)) {
                                    // create a secretKey, to encrypt/decrypt the user's secret
                                    const secretKey = crypto.randomBytes(128).toString('utf8');

                                    // generate a key, to encrypt the secretKey, based on users password
                                    // to make it easier to change password later
                                    const key = crypto.scryptSync(password, this._salt, 24);

                                    const iv = Buffer.alloc(16); // Initialization vector.

                                    // encrypt the secretKey
                                    const encrypted = encryptionUtil.encrypt(key, iv, secretKey);

                                    // save the encrypted secretKey
                                    knex<SecretKey>('secret_keys').insert(
                                        {
                                            userId: user.id,
                                            secretKey: encrypted,
                                            iv: iv.toString('hex')
                                        }, "id")
                                        .then(() => {
                                            res.status(201).json({message: "Secret Key created"});
                                        }).catch(
                                        (err) => {
                                            console.error(err);
                                            res.status(500).json({message: err.message});
                                        }
                                    );
                                }
                            } else {
                                res.status(401).json({message: "Access Denied"});
                            }
                        });
                } else {
                    res.status(409).json({message: "User already has a secret key"});
                }
            });
    }




}

export default new SecretController()