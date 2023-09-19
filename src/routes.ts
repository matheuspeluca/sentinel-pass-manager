import { Router } from 'express';
import UserController from './app/controllers/User.controller';
import LoginController from './app/controllers/Login.controller';
import SecretController from './app/controllers/Secret.controller';
import authMiddleware from './app/middlewares/auth.middleware';
import SecretKeyController from "./app/controllers/SecretKey.controller";

const routes = Router()

routes.post('/login', LoginController.login);
routes.post('/users', authMiddleware(["ADMIN"]), UserController.create);
routes.get('/users', authMiddleware(["ADMIN"]), UserController.listAll);
routes.get('/users/:userId', authMiddleware(["ADMIN"]), UserController.getById);

routes.post('/users/:userId/secret-key', authMiddleware(["USER"]), (req, res) => SecretKeyController.create(req, res));

routes.post('/users/:userId/secrets', authMiddleware(["USER"]), SecretController.store);
routes.get('/users/:userId/secrets', authMiddleware(["USER"]), SecretController.store);
routes.post('/users/:userId/secrets/:secretId/decrypt', authMiddleware(["USER"]), SecretController.decrypt);

export default routes