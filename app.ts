import dotenv from 'dotenv';
import Server from './models/Server.Class';

dotenv.config();

const server = new Server();

server.listen();