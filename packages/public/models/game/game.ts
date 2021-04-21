import {PieceType} from "./piece";

export interface Game {
    /**
     * The unique ID of the game
     */
    gameId: string

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