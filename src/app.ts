import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import routes from './routes';

import exceptionHandling from './app/middlewares/exceptionHandling.middleware'

class App {

    public server = express()
    
    constructor() {
        dotenv.config();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(exceptionHandling);
    }

    routes() {
        this.server.use(routes);
    }
  }
  
  export default new App().server