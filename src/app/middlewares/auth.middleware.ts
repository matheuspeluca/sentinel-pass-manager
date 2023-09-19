import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import { NextFunction, Response, Request } from 'express'

interface IToken {
    id: string,
    roles: string[]
}

export default (requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization
        try {
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                const decode = jwt.verify(token, authConfig.secret) as IToken
                req.authUser = { id: decode.id, roles: decode.roles }

                if(requiredRoles.some(r => decode.roles.includes(r.toLowerCase()))) {
                    next();
                } else {
                    res.status(403).json({message: "Access Denied"});
                }
            } else {
                res.status(401).json({message : "accessToken is missing"});
            }
        } catch (err) {
            res.status(401).json({message : "Access Denied"});
        }
    }
}