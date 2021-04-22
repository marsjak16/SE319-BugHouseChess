import {BoardNum} from "./game";

export interface PieceMoveRequest {
    boardNum: BoardNum,
    col, row: number
}