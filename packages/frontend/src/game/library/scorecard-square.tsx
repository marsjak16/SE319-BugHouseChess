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

export interface ScorecardSquareProps {
    onClick: OnClickCallback
}

export class ScorecardSquare extends Component<ScorecardSquareProps> {
    render(): ReactElement {
        return <td style={square} onClick={this.props.onClick}>{this.props.children}</td>
    }
}