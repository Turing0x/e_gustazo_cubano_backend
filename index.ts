import dotenv from 'dotenv'; 
dotenv.config();

import { Server } from './src/server/server';
const server = new Server()

server.listen()
