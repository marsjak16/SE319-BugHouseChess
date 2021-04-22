import {PlayerNum} from "./game";
import {PieceType} from "./piece";

export interface PlacementRequest {
    playerNum: PlayerNum,
    piece: PieceType
}