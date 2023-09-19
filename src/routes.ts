import { Router } from 'express';
import UserController from './app/controllers/User.controller';
import LoginController from './app/controllers/Login.controller';
import SecretController from './app/controllers/Secret.controller';
import authMiddleware from './app/middlewares/auth.middleware';
import SecretKeyController from "./app/controllers/SecretKey.controller";

const routes = Router()

routes.post('/login', LoginController.login);

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
routes.post('/users/:userId/secret-key', authMiddleware(["USER"]), (req, res) => SecretKeyController.create(req, res));


/**
 * Routes for secrets
 * /users/:userId/secrets - POST - Create a new secret (It will encrypt the password provided
 * /users/:userId/secrets - GET - List all secrets for the user (It will throw 401 if the user is not the owner of the secret)
 * /users/:userId/secrets/:secretId - GET - Get secret details by id (The password will be encrypted)
 * /users/:userId/secrets/:secretId/decrypt/:fieldName - POST - Decrypt the :fieldName of the secret (for now, the only field encrypted is "password", but we might add more encrypted fields in the future)
 */
routes.post('/users/:userId/secrets', authMiddleware(["USER"]), (req, res) => SecretController.store(req, res));
routes.get('/users/:userId/secrets', authMiddleware(["USER"]), (req, res) => SecretController.listAll(req, res));
routes.get('/users/:userId/secrets/:secretId', authMiddleware(["USER"]), (req, res) => SecretController.getById(req, res));
routes.post('/users/:userId/secrets/:secretId/decrypt/:fieldName', authMiddleware(["USER"]), (req, res) => SecretController.decrypt(req, res));

export default routes