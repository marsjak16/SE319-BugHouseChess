import React, {Component, CSSProperties, ReactElement} from "react";
import io from 'socket.io-client';
import {match} from "react-router-dom";
import {Config} from "../config/config";
import {AuthenticationResult} from "../../../public/models/account/authentication-result";
import * as H from "history";
import {BoardNum, Game, getBoardNum} from "../../../public/models/game/game";
import {King} from "./library/pieces/King";
import {Queen} from "./library/pieces/Queen";
import {Bishop} from "./library/pieces/Bishop";
import {Knight} from "./library/pieces/Knight";
import {Rook} from "./library/pieces/Rook";
import {Pawn} from "./library/pieces/Pawn";
import {UserModel} from "../../../public/models/account/user-model";
import {Square, SquareColor} from "./library/square";
import {PieceType} from "../../../public/models/game/piece";
import {PieceMoveRequest} from "../../../public/models/game/piece-move-request";
import {PossibleMovement} from "../../../public/models/game/possible-movement";
import _ from "lodash";
import {MoveError} from "../../../public/models/game/move-error";
import {PlacementError} from "../../../public/models/game/placement-error";

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
};

export interface GamePageParams {
    gameId: string
}

export interface GamePageProps {
    history: H.History,
    match: match<GamePageParams>
    user?: UserModel
}

export interface GamePageState {
    game?: Game,
    moves?: PossibleMovement[]
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
            const newState: GamePageState = _.cloneDeep(this.state);
            newState.game = game;
            this.setState(newState);
        });

        this.socket.on('movementOptions', (options: PossibleMovement[]) => {
            const newState: GamePageState = _.cloneDeep(this.state);
            newState.moves = options;
            this.setState(newState);
        });

        this.socket.on('moveError', (error: MoveError) => {
            console.log(error.message);
        });

        this.socket.on('placementError', (error: PlacementError) => {
            console.log(error.message);
        });
    }

    componentWillUnmount(): void {
        this.socket.close();
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

    private highlighted(row: number, col: number, board: number): boolean {
        return !!(this.state.moves?.find(p => {
            return p.toRow == row && p.toCol == col && getBoardNum(p.playerNum) == board;
        }));
    }

    private onSquareClick(row: number, col: number, boardNum: BoardNum): void {
        const move = this.state.moves?.find(p => {
            return p.toRow == row && p.toCol == col && getBoardNum(p.playerNum) == boardNum;
        });
        if (move) {
            console.log(move);
            this.socket.emit('makeMove', move);
        } else {
            const movementRequest: PieceMoveRequest = {row, col, boardNum};
            this.socket.emit('movementRequest', movementRequest);
        }

        const newState: GamePageState = _.cloneDeep(this.state);
        newState.moves = undefined;
        this.setState(newState);
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

    private static makeFileHeadings(): ReactElement {
        return <tr><th/>{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(fileName => <th>{fileName}</th>)}</tr>;
    }

    private makeBoard2Row(row: number): ReactElement {
        return <tr id={"r" + (9 - row)}><th>{9 - row}</th>{[0, 1, 2, 3, 4, 5, 6, 7].map(
            col => <Square highlighted={this.highlighted(row, col, 2)}
                              color={col % 2 == row % 2 ? SquareColor.WHITE : SquareColor.BLACK}
                              onClick={() => this.onSquareClick(row, col, 2)}>
                {GamePage.renderPiece(this.state.game?.board2[row][col])}</Square>)}
        </tr>
    }

    private makeBoard2(): ReactElement{
        return <table id="board2" style={chessTable}>
            {GamePage.makeFileHeadings()}
            {[7, 6, 5, 4, 3, 2, 1, 0].reverse().map(row => this.makeBoard2Row(row))}
        </table>
    }

    private makeBoard1Row(row: number): ReactElement {
        return <tr id={"r" + (9-row)}><th>{9-row}</th>{[0, 1, 2, 3, 4, 5, 6, 7].map(
            col => <Square highlighted={this.highlighted(7 - row, col, 1)}
                           color={col % 2 == row % 2 ? SquareColor.BLACK: SquareColor.WHITE}
                           onClick={() => this.onSquareClick(7 - row, col, 1)}>
                {GamePage.renderPiece(this.state.game?.board1[7 - row][col])}</Square>)}
        </tr>
    }

    private makeBoard1(): ReactElement{
        return <table id="board1" style={chessTable}>
            {GamePage.makeFileHeadings()}
            {[7, 6, 5, 4, 3, 2, 1, 0].map(row => this.makeBoard1Row(row))}
        </table>
    }
}
