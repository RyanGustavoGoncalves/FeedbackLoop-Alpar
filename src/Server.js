import express from 'express';
import { userRouter } from './routes/user.route.js';
import bodyParser from 'body-parser';

export class Server {
    constructor(port) {
        this.app = express();

        this.setMiddlewares();

        this.setRoutes();

        this.listen(port);
    }

    setMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json())
    }

    setRoutes() {
        this.app.use(express.static('public'));
        this.app.use('/api/auth', userRouter);
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log("app started. Listen at port " + port);
        });
    }
}
