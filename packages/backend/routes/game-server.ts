import {Namespace, Server} from "socket.io";
import {sessionMiddleware} from "../util/session";
import passport from "passport";
import {AuthenticationResult} from "../../public/models/account/authentication-result";
import {Game} from "../../public/models/game/Game";
import {GameConfig, setupGame} from "../../public/game/setup-game";

export class GameServer {
    game: Game;

    io: Namespace;

    constructor(config: GameConfig, root: Server) {
        this.game = setupGame(config);

        this.io = root.of(`/game/${config.gameId}`);
        this.io.use((socket, next) => {
            // @ts-ignore
            sessionMiddleware(socket.request, {}, next);
        });
        this.io.use((socket, next) => {
            // @ts-ignore
            passport.initialize()(socket.request, {}, next);
        });
        this.io.use((socket, next) => {
            passport.session()(socket.request, {}, next);
        });

        this.io.on('connection', socket => {
            // @ts-ignore
            const username: string = socket.request?.session?.passport?.user;

            if (!username) {
                socket.emit('auth', <AuthenticationResult>{
                    authenticated: false,
                    message: 'Not authenticated'
                });

                socket.conn.close();
                return;
            } else if (!this.game.playerUsernames.includes(username)) {
                socket.emit('auth', <AuthenticationResult>{
                    authenticated: false,
                    message: 'Not in game'
                });
            } else {
                socket.emit('auth', <AuthenticationResult>{
                    authenticated: true,
                    message: 'Authenticated'
                });

                socket.emit('game', this.game);
            }
        });
    }
}