export interface PieceMoveRequest {
    gameId: string,
    boardNum: 1 | 2,
    col, row: number
}