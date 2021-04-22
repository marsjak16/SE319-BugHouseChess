import React, {Component, CSSProperties, ReactElement} from "react";
import io from 'socket.io-client';
import {match} from "react-router-dom";
import {Config} from "../config/config";
import {AuthenticationResult} from "../../../public/models/account/authentication-result";
import * as H from "history";
import {Game} from "../../../public/models/game/Game";
import {PieceType} from "../../../public/models/game/Piece";
import {King} from "./library/pieces/King";
import {Queen} from "./library/pieces/Queen";
import {Bishop} from "./library/pieces/Bishop";
import {Knight} from "./library/pieces/Knight";
import {Rook} from "./library/pieces/Rook";
import {Pawn} from "./library/pieces/Pawn";
import {UserModel} from "../../../public/models/account/user-model";

const blackSquare: CSSProperties = {
    width: "60px",
    height: "60px",
    backgroundColor: 'BurlyWood'
}
const whiteSquare: CSSProperties = {
    width: "60px",
    height: "60px",
    backgroundColor: 'AntiqueWhite'
}
const chessTable: CSSProperties = {
    backgroundColor: 'lightgrey',
    border: 'solid 10px lightgrey'
};

const chessDiv: CSSProperties = {
    float: 'left',
    width: '50%',
    padding: '10px'
};
const timerDiv: CSSProperties = {
    float: 'right',
    width: '20%',
}

export interface GamePageParams {
    gameId: string
}

export interface GamePageProps {
    history: H.History,
    match: match<GamePageParams>
    user?: UserModel
}

export interface GamePageState {
    game?: Game
}

export class GamePage extends Component<GamePageProps, GamePageState> {
    private socket!: SocketIOClient.Socket;

    constructor(props: GamePageProps) {
        super(props);

        this.state = {};
    }

    componentDidMount(): void {
        this.socket = io(Config.apiUrl + `/game/${this.props.match.params.gameId}`, {
            // @ts-ignore
            withCredentials: true
        });

        this.socket.on('auth', (result: AuthenticationResult) => {
            if (!result.authenticated) {
                this.props.history.push('/');
            }
        });

        this.socket.on('game', (game: Game) => {
            this.setState({
                game: game
            });
        });
    }

    componentWillUnmount(): void {
        this.socket.close();
    }

    pieceClick(x: number, y: number, b: number): void {

        let piece = b === 1 ? this.state.game?.board1[x][y] : this.state.game?.board2[x][y]

        console.log(piece)

    }

    private static renderPiece(type: PieceType | undefined): ReactElement | null {
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

    render() {
        return (
            <div>
                <div style={chessDiv}>
                    <div style={{float: 'right'}}>
                        <div style={{paddingBottom: '10px'}}>
                            <table id="enemySection1" style={{}}>
                                <tr>
                                    <td>
                                        <h5 style={{textAlign: 'left'}}>Enemy 1</h5>
                                    </td>
                                    <td>
                                        <div style={timerDiv}><h5>5:00</h5></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{backgroundColor: 'lightgrey'}} colSpan={2}>
                                        <div style={{width: '505px', height: '70px'}}>
                                            <img style={{padding: '10px'}} src="/TempChessPieces/bp.png"></img>
                                            <img style={{padding: '10px'}} src="/TempChessPieces/br.png"></img>
                                            <img style={{padding: '10px'}} src="/TempChessPieces/bn.png"></img>
                                            <img style={{padding: '10px'}} src="/TempChessPieces/bb.png"></img>
                                            <img style={{padding: '10px'}} src="/TempChessPieces/bq.png"></img>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        {this.makeBoard1()}
                    </div>
                </div>
                <div style={chessDiv}>
                    <div style={{paddingBottom: '10px'}}>
                        <table id="enemySection2" style={{}}>
                            <tr>
                                <td>
                                    <h5 style={{textAlign: 'left'}}>Enemy 2</h5>
                                </td>
                                <td>
                                    <div style={timerDiv}><h5>5:00</h5></div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{backgroundColor: 'lightgrey'}} colSpan={2}>
                                    <div style={{width: '505px', height: '70px'}}>
                                        <img style={{padding: '10px'}} src="/TempChessPieces/wp.png"></img>
                                        <img style={{padding: '10px'}} src="/TempChessPieces/wr.png"></img>
                                        <img style={{padding: '10px'}} src="/TempChessPieces/wn.png"></img>
                                        <img style={{padding: '10px'}} src="/TempChessPieces/wb.png"></img>
                                        <img style={{padding: '10px'}} src="/TempChessPieces/wq.png"></img>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {this.makeBoard2()}
                </div>
            </div>);
    }

    makeBoard2FileHeadings(): ReactElement {
        return <tr><th></th>{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(fileName => <th>{fileName}</th>)}</tr>;
    }

    makeBoard2Row(row: number): ReactElement {
        return <tr id={"r" + (9-row)}><th>{9-row}</th>{[0,1,2,3,4,5,6,7].map(
            rowNum => <td style={rowNum%2==row%2 ? whiteSquare: blackSquare}>
                {GamePage.renderPiece(this.state.game?.board1[8-row][rowNum])}</td>)}
        </tr>
    }

    makeBoardRow(row: number, board:number): ReactElement {
        return <tr id={"r" + (9-row)}><th>{9-row}</th>{[0,1,2,3,4,5,6,7].map(
            rowNum => <td style={rowNum%2==row%2 ? whiteSquare: blackSquare}>
                {GamePage.renderPiece(this.state.game?.board1[8-row][rowNum])}</td>)}
        </tr>
    }

    makeBoard2(): ReactElement{
        return <table id="board2" style={chessTable}>
            {this.makeBoard2FileHeadings()}
            {[8,7,6,5,4,3,2,1].reverse().map(row => this.makeBoard2Row(row))}
        </table>
    }

    makeBoard1FileHeadings(): ReactElement {
        return <tr><th></th>{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].reverse().map(fileName => <th>{fileName}</th>)}</tr>;
	}

    makeBoard1Row(row: number): ReactElement {
        return <tr id={"r" + (9-row)}><th>{9-row}</th>{[0,1,2,3,4,5,6,7].map(
            rowNum => <td style={rowNum%2==row%2 ? blackSquare: whiteSquare}>
                {GamePage.renderPiece(this.state.game?.board1[8-row][rowNum])}</td>)}
        </tr>
    }

    makeBoard1(): ReactElement{
        return <table id="board1" style={chessTable}>
            {this.makeBoard1FileHeadings()}
            {[8,7,6,5,4,3,2,1].map(row => this.makeBoard1Row(row))}
        </table>
    }
}
