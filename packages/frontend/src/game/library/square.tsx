import React, {Component, CSSProperties, ReactElement} from "react";
import {PieceType} from "../../../../public/models/game/piece";
import {Pawn} from "./pieces/Pawn";
import {Rook} from "./pieces/Rook";
import {Knight} from "./pieces/Knight";
import {Bishop} from "./pieces/Bishop";
import {Queen} from "./pieces/Queen";
import {King} from "./pieces/King";

export enum SquareColor {
    WHITE,
    BLACK
}

export type OnClickCallback = () => void;

const square: CSSProperties = {
    width: '60px',
    height: '60px',
    cursor: 'pointer'
};

const blackSquare: CSSProperties = {
    backgroundColor: 'BurlyWood'
};

const whiteSquare: CSSProperties = {
    backgroundColor: 'AntiqueWhite'
};

const highlightedSquare: CSSProperties = {
    backgroundColor: 'lawngreen'
};

export interface SquareProps {
    color: SquareColor,
    highlighted: boolean,
    onClick: OnClickCallback
}

export class Square extends Component<SquareProps> {
    render(): ReactElement {
        const style = (this.props.highlighted) ? highlightedSquare : (this.props.color == SquareColor.WHITE) ? whiteSquare: blackSquare;
        return <td style={{...square, ...style}} onClick={this.props.onClick}>{this.props.children}</td>
    }
}

export function renderPiece(type: PieceType | undefined): ReactElement | null {
    switch (type) {
        case PieceType.WHITE_PAWN: return <Pawn player={1}/>;
        case PieceType.WHITE_ROOK: return <Rook player={1}/>;
        case PieceType.WHITE_KNIGHT: return <Knight player={1}/>;
        case PieceType.WHITE_BISHOP: return <Bishop player={1}/>;
        case PieceType.WHITE_QUEEN: return <Queen player={1}/>;
        case PieceType.WHITE_KING: return <King player={1}/>;
        case PieceType.BLACK_PAWN: return <Pawn player={0}/>;
        case PieceType.BLACK_ROOK: return <Rook player={0}/>;
        case PieceType.BLACK_KNIGHT: return <Knight player={0}/>;
        case PieceType.BLACK_BISHOP: return <Bishop player={0}/>;
        case PieceType.BLACK_QUEEN: return <Queen player={0}/>;
        case PieceType.BLACK_KING: return <King player={0}/>;
        default: return null;
    }
}