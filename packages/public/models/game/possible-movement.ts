import {PlayerNum} from "./game";

export interface PossibleMovement {
    playerNum: PlayerNum,
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
}