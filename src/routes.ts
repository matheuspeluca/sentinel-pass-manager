import { Router } from 'express';
import UserController from './app/controllers/User.controller';
import LoginController from './app/controllers/Login.controller';
import SecretController from './app/controllers/Secret.controller';
import authMiddleware from './app/middlewares/auth.middleware';

const routes = Router()

routes.post('/login', LoginController.login);
routes.post('/users', authMiddleware("ADMIN"), UserController.create);
routes.get('/users', authMiddleware("ADMIN"), UserController.listAll);

routes.post('/secrets', authMiddleware("USER"), SecretController.store);

export default routes