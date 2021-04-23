import {PieceMoveRequest} from "../models/game/piece-move-request";
import {PossibleMovement} from "../models/game/possible-movement";
import {Game, getAlly, getBoard, getBoardNum, getPieces, isPlayersPiece, PlayerNum} from "../models/game/game";
import {isSamePlayer, isWhite, PieceType} from "../models/game/piece";
import _ from "lodash";
import {PlacePiece} from "../models/game/place-piece";
import {PlacementRequest} from "../models/game/placement-request";

export function makeMove(game: Game, movement: PossibleMovement): Game {
    const gameCopy = _.cloneDeep(game);
    const board = getBoard(gameCopy, movement.playerNum);

    if (board[movement.toRow][movement.toCol] != PieceType.EMPTY) {
        const pieces = getPieces(gameCopy, getAlly(movement.playerNum));
        pieces.push(board[movement.toRow][movement.toCol]);
    }

    board[movement.toRow][movement.toCol] = board[movement.fromRow][movement.fromCol];
    board[movement.fromRow][movement.fromCol] = PieceType.EMPTY;

    switchTurns(gameCopy, movement.playerNum);

    return gameCopy;
}

export function placePiece(game: Game, place: PlacePiece): Game {
    const gameCopy = _.cloneDeep(game);
    const board = getBoard(gameCopy, place.playerNum);
    const pieces = getPieces(gameCopy, place.playerNum);

    board[place.row][place.col] = place.piece;
    pieces.splice(pieces.indexOf(place.piece), 1);

    switchTurns(gameCopy, place.playerNum);

    return gameCopy;
}

export function switchTurns(game: Game, curPlayer: PlayerNum): void {
    if (curPlayer == 1) {
        game.game1Turn = 2;
    } else if (curPlayer == 2) {
        game.game1Turn = 1;
    } else if (curPlayer == 3) {
        game.game2Turn = 4;
    } else {
        game.game2Turn = 3;
    }
}

export function findAllPlacements(game: Game, player: PlayerNum): PlacePiece[] {
    const placements: PlacePiece[] = [];

    for (let piece of getPieces(game, player)) {
        findPlacements(game, {
            piece,
            playerNum: player
        }).forEach(p => placements.push(p));
    }

    return placements;
}


export function findPlacements(game: Game, placementRequest: PlacementRequest) {
    const board = getBoard(game, placementRequest.playerNum);
    const placements: PlacePiece[] = [];

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col ++) {
            // A piece can only be placed on empty squares
            if (board[row][col] != PieceType.EMPTY) {
                continue;
            }

            // A pawn cannot be placed in a place where it would immediately be queened
            if (placementRequest.piece == PieceType.WHITE_PAWN || placementRequest.piece == PieceType.BLACK_PAWN) {
                if (getBoardNum(placementRequest.playerNum) == 1) {
                    if (placementRequest.playerNum == 1 && row == 0) {
                        continue;
                    } else if (placementRequest.playerNum == 2 && row == 7) {
                        continue;
                    }
                } else {
                    if (placementRequest.playerNum == 3 && row == 7) {
                        continue;
                    } else if (placementRequest.playerNum == 4 && row == 0) {
                        continue;
                    }
                }
            }

            placements.push({
                playerNum: placementRequest.playerNum,
                piece: placementRequest.piece,
                row,
                col
            });
        }
    }

    return placements;
}

export function findAllMovements(game: Game, player: PlayerNum): PossibleMovement[] {
    const board = getBoard(game, player);
    const movements: PossibleMovement[] = [];

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (    isPlayersPiece(player, board[row][col])) {
                findMovements(game, {
                    col: col,
                    row: row,
                    boardNum: getBoardNum(player)
                }).forEach(m => movements.push(m));
            }
        }
    }

    return  movements;
}

export function findMovements(game: Game, moveRequest: PieceMoveRequest): PossibleMovement[] {
    const board = (moveRequest.boardNum == 1) ? game.board1 : game.board2;
    const piece = board[moveRequest.row][moveRequest.col];
    const playerNum = (moveRequest.boardNum == 1) ? (isWhite(piece) ? 1 : 2) : (isWhite(piece) ? 3 : 4);
    const boardNum = getBoardNum(playerNum);
    const pieceRow = moveRequest.row;
    const pieceCol = moveRequest.col;

    const isOnBoard = (row: number, col: number): boolean => {
        return 0 <= col && col <= 7 && 0 <= row && row <= 7;
    };

    const isOccupied = (row: number, col: number): boolean => {
        return isOnBoard(row, col) && board[row][col] != PieceType.EMPTY;
    };

    const isOpen = (row: number, col: number): boolean => {
        return isOnBoard(row, col) && board[row][col] == PieceType.EMPTY;;
    };

    const movements: PossibleMovement[] = [];

    const pushIfFree = (row: number, col: number) => {
        if (isOpen(row, col)) {
            movements.push({
                fromCol: moveRequest.col,
                fromRow: moveRequest.row,
                toCol: col,
                toRow: row,
                playerNum
            });
        }
    };

    const pushIfCanTake = (row: number, col: number) => {
        if (isOccupied(row, col) && !isSamePlayer(piece, board[row][col])) {
            movements.push({
                fromCol: moveRequest.col,
                fromRow: moveRequest.row,
                toCol: col,
                toRow: row,
                playerNum
            });
        }
    };

    const pushIfFreeOrCanTake = (row: number, col: number) => {
        pushIfFree(row, col);
        pushIfCanTake(row, col);
    };

    if ((boardNum == 1 && piece == PieceType.WHITE_PAWN) || (boardNum == 2 && piece == PieceType.BLACK_PAWN)) {
        if (pieceRow == 1) {
            pushIfFree(pieceRow + 2, pieceCol);
        }

        pushIfFree(pieceRow + 1, pieceCol);
        pushIfCanTake(pieceRow + 1, pieceCol - 1);
        pushIfCanTake(pieceRow + 1, pieceCol + 1);
    }

    if ((boardNum == 1 && piece == PieceType.BLACK_PAWN) || (boardNum == 2 && piece == PieceType.WHITE_PAWN)) {
        if (pieceRow == 6) {
            pushIfFree(pieceRow - 2, pieceCol);
        }

        pushIfFree(pieceRow - 1, pieceCol);
        pushIfCanTake(pieceRow - 1, pieceCol - 1);
        pushIfCanTake(pieceRow - 1, pieceCol + 1);
    }

    if (piece == PieceType.WHITE_ROOK || piece == PieceType.BLACK_ROOK || piece == PieceType.WHITE_QUEEN || piece == PieceType.BLACK_QUEEN) {
        for (let row = pieceRow + 1; row < 8; row++) {
            pushIfFreeOrCanTake(row, pieceCol);

            if (isOccupied(row, pieceCol)) {
                break;
            }
        }

        for (let row = pieceRow - 1; row >= 0; row--) {
            pushIfFreeOrCanTake(row, pieceCol);

            if (isOccupied(row, pieceCol)) {
                break;
            }
        }

        for (let col = pieceCol + 1; col < 8; col++) {
            pushIfFreeOrCanTake(pieceRow, col);

            if (isOccupied(pieceRow, col)) {
                break;
            }
        }

        for (let col = pieceCol - 1; col >= 0; col--) {
            pushIfFreeOrCanTake(pieceRow, col);

            if (isOccupied(pieceRow, col)) {
                break;
            }
        }
    }

    if (piece == PieceType.WHITE_KNIGHT || piece == PieceType.BLACK_KNIGHT) {
        [-1, 1].forEach(rowSign => {
            [-1, 1].forEach(colSign => {
                pushIfFreeOrCanTake(pieceRow + rowSign, pieceCol + 2 * colSign);
                pushIfFreeOrCanTake(pieceRow + 2 * rowSign, pieceCol + colSign);
            });
        });
    }

    if (piece == PieceType.WHITE_BISHOP || piece == PieceType.BLACK_BISHOP || piece == PieceType.WHITE_QUEEN || piece == PieceType.BLACK_QUEEN) {
        for (let row = pieceRow + 1, col = pieceCol + 1; row < 8 && col < 8; row++, col++) {
            pushIfFreeOrCanTake(row, col);

            if (isOccupied(row, col)) {
                break;
            }
        }

        for (let row = pieceRow - 1, col = pieceCol + 1; row >= 0 && col < 8; row--, col++) {
            pushIfFreeOrCanTake(row, col);

            if (isOccupied(row, col)) {
                break;
            }
        }

        for (let row = pieceRow - 1, col = pieceCol - 1; row >= 0 && col >= 0; row--, col--) {
            pushIfFreeOrCanTake(row, col);

            if (isOccupied(row, col)) {
                break;
            }
        }

        for (let row = pieceRow + 1, col = pieceCol - 1; row < 8 && col >= 0; row++, col--) {
            pushIfFreeOrCanTake(row, col);

            if (isOccupied(row, col)) {
                break;
            }
        }
    }

    if (piece == PieceType.WHITE_KING || piece == PieceType.BLACK_KING) {
        pushIfFreeOrCanTake(pieceRow - 1, pieceCol - 1);
        pushIfFreeOrCanTake(pieceRow - 1, pieceCol);
        pushIfFreeOrCanTake(pieceRow - 1, pieceCol + 1);
        pushIfFreeOrCanTake(pieceRow, pieceCol + 1);
        pushIfFreeOrCanTake(pieceRow + 1, pieceCol + 1);
        pushIfFreeOrCanTake(pieceRow + 1, pieceCol);
        pushIfFreeOrCanTake(pieceRow + 1, pieceCol - 1);
        pushIfFreeOrCanTake(pieceRow, pieceCol - 1);
    }

    return movements;
}