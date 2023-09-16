import { Router, Request, Response } from 'express';
import UserController from './app/controllers/User.controller';
import authMiddleware from './app/middlewares/auth.middleware';

const routes = Router()

routes.post('/users', UserController.create);

routes.use(authMiddleware);

export default routes