import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import { NextFunction, Response, Request } from 'express'
import AppError from '../../errors/AppError'

export default async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new AppError('Access token required', 401);
    }
    try {
        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, authConfig.secret)
        req.body.userId = decode;
    } catch (err) {
        throw new AppError('Invalid JWT Token')
    }
}