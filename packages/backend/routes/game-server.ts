import {Namespace} from "socket.io";
import {AuthenticationResult} from "../../public/models/account/authentication-result";
import {Game, getBoard, getBoardNum, getOpponent, getPieces, getPlayerNum} from "../../public/models/game/game";
import {GameConfig, setupGame} from "../../public/game/setup-game";
import {PossibleMovement} from "../../public/models/game/possible-movement";
import {isCheck, isCheckmate} from "../../public/game/victory";
import {CheckStatus, CheckType} from "../../public/models/game/check-status";
import {PlacePiece} from "../../public/models/game/place-piece";
import { PieceMoveRequest } from "../../public/models/game/piece-move-request";
import {findMovements, findPlacements, makeMove, placePiece} from "../../public/game/movement";
import {PlacementRequest} from "../../public/models/game/placement-request";
import {PlacementError} from "../../public/models/game/placement-error";
import {MoveError} from "../../public/models/game/move-error";
import _ from "lodash";

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
                socket.emit('movementOptions', findMovements(this.game, movementRequest));
            });

            socket.on('placementRequest', (placementRequest: PlacementRequest) => {
               socket.emit('placementOptions', findPlacements(this.game, placementRequest));
            });

            socket.on('makePlacement', (placement: PlacePiece) => {
                // If the game is over don't allow any moves
                if (this.game.winningTeam) {
                    socket.emit('placementError', <PlacementError>{
                        message: "You cannot place pieces once the game is over"
                    });

                    return;
                }

                // Make sure that the player can move this piece
                if (placement.playerNum != getPlayerNum(this.game, username)) {
                    socket.emit('placementError', <PlacementError>{
                        message: "You cannot place a piece you don't own"
                    });

                    return;
                }

                // Make sure that it's the players turn
                if (!(this.game.game1Turn == placement.playerNum || this.game.game2Turn == placement.playerNum)) {
                    socket.emit('placementError', <PlacementError>{
                        message: 'It is not your turn'
                    });

                    return;
                }

                // Make sure that the player has the piece
                if (!getPieces(this.game, placement.playerNum).includes(placement.piece)) {
                    socket.emit('placementError', <PlacementError>{
                        message: "You don't own that piece"
                    });

                    return;
                }

                // Make sure that it is a valid placement
                const validPlacements = findPlacements(this.game, {
                    playerNum: placement.playerNum,
                    piece: placement.piece
                });
                if (!validPlacements.find(p => _.isEqual(p, placement))) {
                    socket.emit('placementError', <PlacementError>{
                        message: "This piece cannot be placed there"
                    });

                    return;
                }

                const resultantGame = placePiece(this.game, placement);

                // Make sure that the player is not in check after this move
                if (isCheck(resultantGame, placement.playerNum)) {
                    // Send a different message depending on whether the player was already in check beforehand
                    if (isCheck(this.game, placement.playerNum)) {
                        socket.emit('placementError', <PlacementError>{
                            message: 'You must move out of check'
                        });

                        return;
                    } else {
                        socket.emit('placementError', <PlacementError>{
                            message: 'You cannot move into check'
                        });

                        return;
                    }
                }

                // Perform the movement
                this.game = resultantGame;
                io.emit('game', this.game);

                // Check if the player is in check
                const opponent = getOpponent(placement.playerNum);
                if (isCheck(this.game, opponent)) {
                    // Is it a checkmate?
                    if (isCheckmate(this.game, opponent)) {
                        io.emit('check', <CheckStatus>{
                            player: opponent,
                            type: CheckType.CHECKMATE
                        });
                    } else {
                        io.emit('check', <CheckStatus>{
                            player: opponent,
                            type: CheckType.CHECK
                        });
                    }
                }
            });

            socket.on('makeMove', (movement: PossibleMovement) => {
                // If the game is over don't allow any moves
                if (this.game.winningTeam) {
                    socket.emit('moveError', <MoveError>{
                        message: "You cannot move once the game is over"
                    });

                    return;
                }

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
                const validMovements = findMovements(this.game, {
                    row: movement.fromRow,
                    col: movement.fromCol,
                    boardNum: getBoardNum(movement.playerNum)
                });

                if (!validMovements.find(m => _.isEqual(m, movement))) {
                    socket.emit('moveError', <MoveError>{
                        message: 'Not a valid movement'
                    });

                    return;
                }

                const resultantGame = makeMove(this.game, movement);

                // Make sure that the player is not in check after this move
                if (isCheck(resultantGame, movement.playerNum)) {
                    // Send a different message depending on whether the player was already in check beforehand
                    if (isCheck(this.game, movement.playerNum)) {
                        socket.emit('moveError', <MoveError>{
                            message: 'You must move out of check'
                        });

                        return;
                    } else {
                        socket.emit('moveError', <MoveError>{
                            message: 'You cannot move into check'
                        });

                        return;
                    }
                }

                // Perform the movement
                this.game = resultantGame;
                io.emit('game', this.game);

                // Check if the player is in check
                const opponent = getOpponent(movement.playerNum);
                if (isCheck(this.game, opponent)) {
                    // Is it a checkmate?
                    if (isCheckmate(this.game, opponent)) {
                        io.emit('check', <CheckStatus>{
                            player: opponent,
                            type: CheckType.CHECKMATE
                        });
                    } else {
                        io.emit('check', <CheckStatus>{
                            player: opponent,
                            type: CheckType.CHECK
                        });
                    }
                }
            })
        });
    }
}