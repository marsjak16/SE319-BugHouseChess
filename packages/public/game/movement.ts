import {PieceMoveRequest} from "../models/game/piece-move-request";
import {PossibleMovement} from "../models/game/possible-movement";
import {Game} from "../models/game/game";
import {isSamePlayer, isWhite, PieceType} from "../models/game/piece";
import _ from "lodash";

export function makeMove(game: Game, movement: PossibleMovement): Game {
    const gameCopy = _.cloneDeep(game);
    const board = (movement.playerNum < 2) ? gameCopy.board1 : gameCopy.board2;

    if (board[movement.toRow][movement.toCol] != PieceType.EMPTY) {
        let pieces: PieceType[];

        if (movement.playerNum == 1) {
            pieces = gameCopy.player4Pieces;
        } else if (movement.playerNum == 2) {
            pieces = gameCopy.player3Pieces;
        } else if (movement.playerNum == 3) {
            pieces = gameCopy.player1Pieces;
        } else {
            pieces = gameCopy.player2Pieces;
        }

        pieces.push(board[movement.toRow][movement.toCol]);
    }

    board[movement.toRow][movement.toCol] = board[movement.fromRow][movement.fromCol];
    board[movement.fromRow][movement.fromCol] = PieceType.EMPTY;

    if (movement.playerNum == 1) {
        gameCopy.game1Turn = 2;
    } else if (movement.playerNum == 2) {
        gameCopy.game1Turn = 1;
    } else if (movement.playerNum == 3) {
        gameCopy.game2Turn = 4;
    } else {
        gameCopy.game2Turn = 3;
    }

    return gameCopy;
}

export function findAllMovements(game: Game, boardNum: 1 | 2): PossibleMovement[] {
    const movements: PossibleMovement[] = [];

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            findMovements({
                col: col,
                row: row,
                boardNum: boardNum
            }, game).forEach(m => movements.push(m));
        }
    }

    return  movements;
}

export function findMovements(moveRequest: PieceMoveRequest, game: Game): PossibleMovement[] {
    const board = (moveRequest.boardNum == 1) ? game.board1 : game.board2.reverse();
    const piece = board[moveRequest.row][moveRequest.col];
    const playerNum = (moveRequest.boardNum == 1) ? (isWhite(piece) ? 1 : 2) : (isWhite(piece) ? 3 : 4);
    const pieceRow = moveRequest.row;
    const pieceCol = moveRequest.col;

    const isOnBoard = (row: number, col: number): boolean => {
        return 0 <= col && col <= 7 && 0 <= row && row <= 7;
    };

    const isOccupied = (row: number, col: number): boolean => {
        return isOnBoard(row, col) && board[col][row] != PieceType.EMPTY;
    };

    const isOpen = (row: number, col: number): boolean => {
        return isOnBoard(row, col) && board[col][row] == PieceType.EMPTY;;
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

    if (piece == PieceType.WHITE_PAWN) {
        if (pieceRow == 1) {
            pushIfFree(pieceRow + 2, pieceCol);
        }

        pushIfFree(pieceRow + 1, pieceCol);
        pushIfCanTake(pieceRow + 1, pieceCol - 1);
        pushIfCanTake(pieceRow + 1, pieceCol + 1);
    }

    if (piece == PieceType.BLACK_PAWN) {
        if (pieceRow == 6) {
            pushIfFree(pieceRow - 2, pieceCol);
        }

        pushIfFree(pieceRow - 1, pieceCol);
        pushIfCanTake(pieceRow - 1, pieceCol - 1);
        pushIfCanTake(pieceRow - 1, pieceCol + 1);
    }

    if (piece == PieceType.WHITE_ROOK || piece == PieceType.BLACK_ROOK || PieceType.WHITE_QUEEN || PieceType.BLACK_QUEEN) {
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
            pushIfFreeOrCanTake(col, pieceCol);

            if (isOccupied(pieceRow, col)) {
                break;
            }
        }

        for (let col = pieceCol - 1; col >= 0; col--) {
            pushIfFreeOrCanTake(col, pieceCol);

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

    if (piece == PieceType.WHITE_BISHOP || piece == PieceType.BLACK_BISHOP || PieceType.WHITE_QUEEN || PieceType.BLACK_QUEEN) {
        for (let row = pieceRow, col = pieceCol; row < 8 && col < 8; row++, col++) {
            pushIfFreeOrCanTake(row, col);

            if (isOccupied(row, col)) {
                break;
            }
        }

        for (let row = pieceRow, col = pieceCol; row >= 0 && col < 8; row--, col++) {
            pushIfFreeOrCanTake(row, col);

            if (isOccupied(row, col)) {
                break;
            }
        }

        for (let row = pieceRow, col = pieceCol; row >= 0 && col >= 0; row--, col--) {
            pushIfFreeOrCanTake(row, col);

            if (isOccupied(row, col)) {
                break;
            }
        }

        for (let row = pieceRow, col = pieceCol; row < 8 && col >= 0; row++, col--) {
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