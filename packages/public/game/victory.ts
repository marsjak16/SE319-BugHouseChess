import {Game, PlayerNum} from "../models/game/game";
import {PieceType} from "../models/game/piece";
import {findAllMovements, makeMove} from "./movement";

export function isCheck(game: Game, player: PlayerNum): boolean {
    const board = (player < 2) ? game.board1 : game.board2;
    const kingPosition = findKing(board, player);

    const movements = findAllMovements(game, (player < 2) ? 2 : 1);
    for (let movement of movements) {
        if (movement.toRow == kingPosition.row && movement.toCol == kingPosition.col) {
            return true;
        }
    }

    return false;
}

export function isCheckmate(game: Game, player: PlayerNum): boolean {
    if (!isCheck(game, player)) {
        return false;
    }

    const movements = findAllMovements(game, (player < 2) ? 1 : 2);

    for (let movement of movements) {
        const resultGame = makeMove(game, movement);
        if (!isCheck(game, player)) {
            return false;
        }
    }

    return true;
}

export function findKing(board: PieceType[][], player: PlayerNum): {col: number, row: number} {
    const kingType = (player % 2 == 0) ? PieceType.WHITE_KING : PieceType.BLACK_KING;

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board[row][col] == kingType) {
                return {row, col}
            }
        }
    }

    return null;
}