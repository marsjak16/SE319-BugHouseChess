import {Namespace} from "socket.io";
import {AuthenticationResult} from "../../public/models/account/authentication-result";
import {Game, getPlayerNum} from "../../public/models/game/game";
import {GameConfig, setupGame} from "../../public/game/setup-game";
import {PossibleMovement} from "../../public/models/game/possible-movement";
import {findMovements, makeMove} from "../../public/game/movement";
import {PieceMoveRequest} from "../../public/models/game/piece-move-request";
import {MoveError} from "../../public/models/game/move-error";
import {isCheck, isCheckmate} from "../../public/game/victory";
import {CheckStatus, CheckType} from "../../public/models/game/check-status";

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
                socket.emit('movementOptions', findMovements(movementRequest, this.game));
            });

            socket.on('makeMove', (movement: PossibleMovement) => {
                // Make sure that the player can move this piece
                if (movement.playerNum != getPlayerNum(this.game, username)) {
                    socket.emit('moveError', <MoveError>{
                       message: "You cannot move a piece you don't own"
                    });

                    return;
                }

                // Make sure that it's the players turn
                if (!(this.game.game1Turn == movement.playerNum || this.game.game2Turn == movement.playerNum)) {
                    socket.emit('moveError', <MoveError>{
                        message: 'It is not your turn'
                    });

                    return;
                }

                // Make sure that the move is valid
                const validMovements = findMovements({
                    row: movement.fromRow,
                    col: movement.fromCol,
                    boardNum: (movement.playerNum < 2) ? 1 : 2
                }, this.game);

                if (!validMovements.includes(movement)) {
                    socket.emit('moveError', <MoveError>{
                        message: 'Not a valid movement'
                    });

                    return;
                }

                // Perform the movement
                this.game = makeMove(this.game, movement);

                io.emit('game', this.game);

                // Check if the player is in check
                const potentiallyCheckedPlayer = (movement.playerNum < 2) ? this.game.game1Turn : this.game.game2Turn;
                if (isCheck(this.game, potentiallyCheckedPlayer)) {
                    // Is it a checkmate?
                    if (isCheckmate(this.game, potentiallyCheckedPlayer)) {
                        socket.emit('check', <CheckStatus>{
                            player: potentiallyCheckedPlayer,
                            type: CheckType.CHECKMATE
                        });
                    } else {
                        socket.emit('check', <CheckStatus>{
                            player: potentiallyCheckedPlayer,
                            type: CheckType.CHECK
                        });
                    }
                }
            })
        });
    }
}