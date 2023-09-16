import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import { NextFunction, Response, Request } from 'express'

interface IToken {
    id: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    try {
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const decode = jwt.verify(token, authConfig.secret) as IToken
            req.user = { id: decode.id }
            next();
        } else {
            res.status(401).json({message : "accessToken is missing"});
        }
    } catch (err) {
        res.status(401).json({message : "Access Denied"});
    }
}