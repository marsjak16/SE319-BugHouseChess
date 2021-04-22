import {PlayerNum} from "./game";

export enum CheckType {
    CHECK,
    CHECKMATE
}

export interface CheckStatus {
    player: PlayerNum,
    type: CheckType
}