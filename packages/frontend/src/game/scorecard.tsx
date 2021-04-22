import {PieceType} from "../../../public/models/game/piece";
import React, {Component, CSSProperties, ReactElement} from "react";
import {renderPiece} from "./library/square";
import {ScorecardSquare} from "./library/scorecard-square";

const timerDiv: CSSProperties = {
    float: 'right',
    width: '20%',
};

const isTurnStyle: CSSProperties = {
    color: 'red'
};

export type onClickCallback = (piece: PieceType) => void

export interface ScorecardProps {
    username?: string,
    pieces?: PieceType[],
    isTurn: boolean
    onClick: onClickCallback
}

export class Scorecard extends Component<ScorecardProps> {
    render(): ReactElement {
        return <div style={{paddingBottom: '10px'}}>
            <table>
                <tr>
                    <td>
                        <h5 style={{textAlign: 'left', ...((this.props.isTurn) ? isTurnStyle : {})}}>{this.props.username ?? 'Player 1'}</h5>
                    </td>
                    <td>
                        <div style={timerDiv}><h5>5:00</h5></div>
                    </td>
                </tr>
                <tr>
                    <td style={{backgroundColor: 'lightgrey'}} colSpan={2}>
                        <table style={{width: '505px', height: '70px'}}>
                            <tr>
                                {this.props.pieces?.map(p => {
                                    return <ScorecardSquare onClick={() => this.props.onClick(p)}>
                                        {renderPiece(p)}
                                    </ScorecardSquare>})}
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    }
}