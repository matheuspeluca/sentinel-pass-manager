import { Router } from 'express';
import UserController from './app/controllers/User.controller';
import LoginController from './app/controllers/Login.controller';
import SecretController from './app/controllers/Secret.controller';
import authMiddleware from './app/middlewares/auth.middleware';

const routes = Router()

routes.post('/auth/login', LoginController.login);
routes.post('/auth/register', LoginController.register);

/**
 * Routes for users
 * /users - POST - Create a new user
 * /users - GET - List all users
 * /users/:userId - GET - Get user details by id
 * /users/:userId/secret-key - POST - Create a new secret key for the user, returns 409 if user already has a secret key
 */
routes.post('/users', authMiddleware(["ADMIN"]), UserController.create);
routes.get('/users', authMiddleware(["ADMIN"]), UserController.listAll);
routes.get('/users/:userId', authMiddleware(["ADMIN"]), UserController.getById);
routes.delete('/users/:userId', authMiddleware(["ADMIN"]), (req, res) => UserController.delete(req, res));

/**
 * Routes for secrets
 * /users/:userId/secrets - POST - Create a new secret (It will encrypt the password provided
 * /users/:userId/secrets - GET - List all secrets for the user (It will throw 401 if the user is not the owner of the secret)
 * /users/:userId/secrets/:secretId - GET - Get secret details by id (The password will be encrypted)
 */
routes.post('/secrets', authMiddleware(["USER"]), (req, res) => SecretController.store(req, res));
routes.get('/secrets', authMiddleware(["USER"]), (req, res) => SecretController.listAll(req, res));
routes.get('/secrets/:secretId', authMiddleware(["USER"]), (req, res) => SecretController.getById(req, res));
routes.delete('/secrets/:secretId', authMiddleware(["USER"]), (req, res) => SecretController.delete(req, res));
routes.put('/secrets/:secretId', authMiddleware(["USER"]), (req, res) => SecretController.update(req, res));

export default routes