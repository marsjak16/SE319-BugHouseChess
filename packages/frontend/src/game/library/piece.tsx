import React, {Component, ReactElement} from "react";
import {PieceType} from "../../../../public/models/game/piece";
import {Pawn} from "./pieces/Pawn";
import {Rook} from "./pieces/Rook";
import {Knight} from "./pieces/Knight";
import {Bishop} from "./pieces/Bishop";
import {Queen} from "./pieces/Queen";
import {King} from "./pieces/King";

export interface PieceProps {
    player: number;
}

export class Piece extends Component<PieceProps> {}


