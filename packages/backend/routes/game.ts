import {Server} from "socket.io";
import {GameServer} from "./game-server";
import * as http from "http";
import {Router} from "express";

export function gameRouter(server: http.Server): Router {
    const router = require('express').Router();

    const io: Server = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:3000',
            allowedHeaders: ['express-session'],
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    new GameServer({
        playerUsernames: ['test1', 'test2', 'test3', 'test4'],
        clockDuration: 180000,
        gameId: '1'
    }, io);
    return router;
}