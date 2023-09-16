import { Router } from 'express';
import UserController from './app/controllers/User.controller';
import LoginController from './app/controllers/Login.controller';
import SecretController from './app/controllers/Secret.controller';
import authMiddleware from './app/middlewares/auth.middleware';

const routes = Router()

routes.post('/users', UserController.create);
routes.post('/login', LoginController.login);

routes.use(authMiddleware);

routes.post('/secrets', SecretController.store);

export default routes