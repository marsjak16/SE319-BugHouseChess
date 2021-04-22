import React, {Component, CSSProperties, ReactElement} from "react";

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