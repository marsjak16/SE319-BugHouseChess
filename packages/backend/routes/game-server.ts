import {Namespace} from "socket.io";
import {AuthenticationResult} from "../../public/models/account/authentication-result";
import {Game} from "../../public/models/game/Game";
import {GameConfig, setupGame} from "../../public/game/setup-game";
import {DescribePossibleMovement} from "../../public/models/game/describe-possible-movement";
import {movement} from "../../public/game/movement";
import {PieceMoveRequest} from "../../public/models/game/piece-move-request";

export class GameServer {
    game: Game;

    constructor(config: GameConfig, io: Namespace) {
        this.game = setupGame(config);

        io.on('connection', socket => {
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

                socket.conn.close();
            } else {
                socket.emit('auth', <AuthenticationResult>{
                    authenticated: true,
                    message: 'Authenticated'
                });

                socket.emit('game', this.game);
            }

            socket.on('movementRequest', (movementRequest: PieceMoveRequest) => {
                socket.emit('movementOptions', movement(movementRequest, this.game));
            })
        });
    }
}