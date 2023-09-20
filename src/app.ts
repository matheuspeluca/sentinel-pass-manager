import express from 'express';
import cors from 'cors';
import routes from './routes';
import cookieParser from "cookie-parser";

class App {

    public server = express()
    
    constructor() {
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cookieParser());
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use('/api', routes);
    }
}
  
export default new App().server