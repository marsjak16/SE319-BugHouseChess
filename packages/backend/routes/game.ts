import {Server, Socket} from "socket.io";
import {GameServer} from "./game-server";
import * as http from "http";
import {Router} from "express";
import {AuthenticationResult} from "../../public/models/account/authentication-result";
import {QueueStatus} from "../../public/models/game/queue-status";
import {JoinGame} from "../../public/models/game/join-game";
import {setupNamespaceMiddleware} from "../util/session";
import _ from "lodash";
import {GameConfig} from "../../public/game/setup-game";

interface QueuedPlayer {
    username: string,
    socket: Socket
}

export function gameRouter(server: http.Server): Router {
    const router = require('express').Router();

    let playerQueue: QueuedPlayer[] = [];
    let games: GameServer[] = [];
    let gameCount = 0;

    const io: Server = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:3000',
            allowedHeaders: ['express-session'],
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    const joinGameIo = io.of('/join-game');
    setupNamespaceMiddleware(joinGameIo);

    const updateStatus = () => {
        playerQueue.forEach(q => q.socket.emit('queue-status', <QueueStatus>{
            inQueue: playerQueue.includes(q),
            numInQueue: playerQueue.length
        }));
    };

    const createGame = (config: GameConfig): GameServer => {
        const namespace = io.of(`/game/${config.gameId}`);
        setupNamespaceMiddleware(namespace);

        const newGame = new GameServer(config, namespace);
        games.push(newGame);

        return newGame
    };

    // Start a test game
    createGame({
        playerUsernames: ['test1', 'test2', 'test3', 'test4'],
        clockDuration: 180000,
        gameId: '1'
    });

    joinGameIo.on('connection', socket => {
        // @ts-ignore
        const username: string = socket.request?.session?.passport?.user;

        if (!username) {
            socket.emit('auth', <AuthenticationResult>{
                authenticated: false,
                message: 'Not authenticated'
            });

            socket.conn.close();
            return;
        } else {
            socket.emit('auth', <AuthenticationResult>{
                authenticated: true,
                message: 'Authenticated'
            });

            socket.emit('game', this.game);
        }

        socket.on('join-queue', () => {
            playerQueue.push({
                username: username,
                socket: socket
            });

            updateStatus();

            if (playerQueue.length == 4) {
                const newGame = createGame({
                    gameId: gameCount.toString(),
                    clockDuration: 300000,
                    playerUsernames: playerQueue.map(q => q.username)
                });

                playerQueue.forEach(q => q.socket.emit('join-game', <JoinGame>{
                    gameId: newGame.game.gameId
                }));

                gameCount++;
                playerQueue.length = 0;
            }
        });

        socket.on('leave-queue', () => {
            _.remove(playerQueue, {
                username: username
            });

            socket.emit('queue-status', <QueueStatus>{
                inQueue: false,
                numInQueue: playerQueue.length
            });

            updateStatus();
        });
    });

    return router;
}