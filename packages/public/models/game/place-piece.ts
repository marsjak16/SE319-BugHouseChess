import {PieceType} from "./piece";
import {PlayerNum} from "./game";

export interface PlacePiece {
    row: number,
    col: number,
    playerNum: PlayerNum,
    piece: PieceType
}