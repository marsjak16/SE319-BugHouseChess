import {Game} from "../models/game/Game";
import {PieceType} from "../models/game/Piece";
import _ = require("lodash");

export interface GameConfig {
    /**
     * Names of players
     */
    playerUsernames: string[]

    /**
     * Duration of clock in milliseconds
     */
    clockDuration: number

    /**
     * Game ID
     */
    gameId: string
}

function randomizeUsers(usernames: string[]): string[] {
    return _.shuffle(usernames);
}

const GAME_BOARD: PieceType[][] = [
    [PieceType.WHITE_ROOK, PieceType.WHITE_KNIGHT, PieceType.WHITE_BISHOP, PieceType.WHITE_KING, PieceType.WHITE_QUEEN, PieceType.WHITE_BISHOP, PieceType.WHITE_KNIGHT, PieceType.WHITE_ROOK],
    Array(8).fill(PieceType.WHITE_PAWN),
    Array(8).fill(PieceType.EMPTY),
    Array(8).fill(PieceType.EMPTY),
    Array(8).fill(PieceType.EMPTY),
    Array(8).fill(PieceType.EMPTY),
    Array(8).fill(PieceType.BLACK_PAWN),
    [PieceType.BLACK_ROOK, PieceType.BLACK_KNIGHT, PieceType.BLACK_BISHOP, PieceType.BLACK_KING, PieceType.BLACK_QUEEN, PieceType.BLACK_BISHOP, PieceType.BLACK_KNIGHT, PieceType.BLACK_ROOK],
];

function setupBoard(flipped = false): PieceType[][] {
    const copy = _.cloneDeep(GAME_BOARD);

    if (flipped) {
        return copy.reverse();
    }

    return copy;
}

export function setupGame(config: GameConfig): Game {
    return {
        gameId: config.gameId,
        clockStart: new Date(),
        clockDuration: config.clockDuration,
        playerUsernames: randomizeUsers(config.playerUsernames),
        board1: setupBoard(),
        board2: setupBoard(true),
        player1Pieces: [],
        player2Pieces: [],
        player3Pieces: [],
        player4Pieces: []
    };
}