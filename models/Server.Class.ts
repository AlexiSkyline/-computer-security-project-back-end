import express, { Application } from 'express';
import userRoutes from '../routes/user';
import textRoutes from '../routes/text';
import documentRoutes from '../routes/document';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        users     : '/api/usuarios',
        texts     : '/api/texts',
        documents : '/api/documents',
    }

    constructor () {
        this.app = express();
        this.port = process.env.PORT || '3000';

        // Todo: Metodos iniciales
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    routes () {
        this.app.use( this.apiPaths.users, userRoutes );
        this.app.use( this.apiPaths.texts, textRoutes );
        this.app.use( this.apiPaths.documents, documentRoutes );
    }

    listen () {
        this.app.listen( this.port, () => {
            console.log( `Server Runnig in https://localhost:${ this.port }` );
        });
    }
}

export default Server;