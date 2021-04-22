import {isSamePlayer, isWhite, PieceType} from "./piece";

export type PlayerNum = 1 | 2 | 3 | 4;
export type BoardNum = 1 | 2;

export interface Game {
    /**
     * The unique ID of the game
     */
    gameId: string

    /**
     * Who has won the game or undefined if the game is still in progress
     */
    winningTeam?: 1 | 2;

    /**
     * Time that the clock was started as an ISO 8601 timestamp
     */
    clockStart: string,

    /**
     * Number of milliseconds on the clock
     */
    clockDuration: number,

    /**
     * The usernames of the players
     */
    playerUsernames: string[]

    /**
     * Whose turn it is in the first game
     */
    game1Turn: 1 | 2;

    /**
     * Whose turn it is in the second game
     */
    game2Turn: 3 | 4;

    /**
     * Game between players 1 and 2
     */
    board1: PieceType[][],

    /**
     * Game between players 3 and 4
     */
    board2: PieceType[][],

    /**
     * Pieces that player 1 can place
     */
    player1Pieces: PieceType[],

    /**
     * Pieces that player 2 can place
     */
    player2Pieces: PieceType[],

    /**
     * Pieces that player 3 can place
     */
    player3Pieces: PieceType[],

    /**
     * Pieces that player 4 can place
     */
    player4Pieces: PieceType[]
}

export function getPlayerNum(game: Game, username: string): PlayerNum {
    return game.playerUsernames.indexOf(username) as PlayerNum;
}

export function getBoardNum(player: PlayerNum): BoardNum {
    return (player < 3) ? 1 : 2;
}

export function getBoard(game: Game, player: PlayerNum): PieceType[][] {
    return (player < 3) ? game.board1 : game.board2;
}

export function isPlayersPiece(player: PlayerNum, piece: PieceType) {
    const playerIsWhite = player == 1 || player == 4;
    return playerIsWhite == isWhite(piece);
}

export function getPieces(game: Game, player: PlayerNum): PieceType[] {
    switch (player) {
        case 1: return game.player1Pieces;
        case 2: return game.player2Pieces;
        case 3: return game.player3Pieces;
        case 4: return game.player4Pieces;
    }
}

export function getOpponent(game: Game, player: PlayerNum): PlayerNum {
    switch (player) {
        case 1: return 2;
        case 2: return 1;
        case 3: return 4;
        case 4: return 3;
    }
}

export function getAlly(game: Game, player: PlayerNum): PlayerNum {
    switch (player) {
        case 1: return 3;
        case 2: return 4;
        case 3: return 1;
        case 4: return 2;
    }
}