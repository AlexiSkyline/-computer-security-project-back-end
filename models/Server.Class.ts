import express, { Application } from 'express';
import userRoutes from '../routes/user';
import textRoutes from '../routes/text';
import documentRoutes from '../routes/document';
import cors from 'cors';
import db from '../database/connection';

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
        this.dataBaseConnection();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    async dataBaseConnection() {
        try {
            await db.authenticate();
            console.log( 'DataBase Online.....' );
        } catch (error) {
            console.log( error );  
        }
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