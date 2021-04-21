import {PieceMoveRequest} from "../models/game/piece-move-request";
import {PossibleMovement} from "../models/game/possible-movement";
import {Game} from "../models/game/game";
import {isSamePlayer, PieceType} from "../models/game/piece";

export function movement(moveRequest: PieceMoveRequest, game: Game): PossibleMovement[] {
    const board = (moveRequest.boardNum == 1) ? game.board1 : game.board2.reverse();
    const piece = board[moveRequest.row][moveRequest.col];
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
               xCord: col,
               yCord: row,
               boardNum: moveRequest.boardNum
            });
        }
    };

    const pushIfCanTake = (row: number, col: number) => {
        if (isOccupied(row, col) && !isSamePlayer(piece, board[row][col])) {
            movements.push({
                xCord: col,
                yCord: row,
                boardNum: moveRequest.boardNum
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