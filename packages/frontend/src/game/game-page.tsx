import React, {Component, CSSProperties, ReactElement} from "react";
import io from 'socket.io-client';
import {match} from "react-router-dom";
import {Config} from "../config/config";
import {AuthenticationResult} from "../../../public/models/account/authentication-result";
import * as H from "history";
import {BoardNum, Game, getBoardNum} from "../../../public/models/game/game";
import {UserModel} from "../../../public/models/account/user-model";
import {renderPiece, Square, SquareColor} from "./library/square";
import {PieceMoveRequest} from "../../../public/models/game/piece-move-request";
import {PossibleMovement} from "../../../public/models/game/possible-movement";
import _ from "lodash";
import {Scorecard} from "./scorecard";
import {PlacePiece} from "../../../public/models/game/place-piece";
import {isWhite, PieceType} from "../../../public/models/game/piece";
import {PlacementRequest} from "../../../public/models/game/placement-request";
import {Notifications} from "./notifications";
import {GameOver} from "./game-over";

const chessTable: CSSProperties = {
    backgroundColor: 'lightgrey',
    border: 'solid 10px lightgrey'
};

const chessDiv: CSSProperties = {
    float: 'left',
    width: '50%',
    padding: '10px'
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
    placements?: PlacePiece[]
}

export class GamePage extends Component<GamePageProps, GamePageState> {
    private socket!: SocketIOClient.Socket;

    constructor(props: GamePageProps) {
        super(props);

        this.socket = io(Config.apiUrl + `/game/${this.props.match.params.gameId}`, {
            // @ts-ignore
            withCredentials: true
        });

        this.state = {};
    }

    componentDidMount(): void {
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

        this.socket.on('placementOptions', (options: PlacePiece[]) => {
            const newState: GamePageState = _.cloneDeep(this.state);
            newState.placements = options;
            this.setState(newState);
        });
    }

    componentWillUnmount(): void {
        this.socket.close();
    }

    render() {
        return (
            <div>
                <div>
                    {(this.state.game?.winningTeam) ? <GameOver win={true}/> : null}
                </div>
                <Notifications socket={this.socket} usernames={this.state.game?.playerUsernames}/>
                <div style={chessDiv}>
                    <div style={{float: 'right'}}>
                        <Scorecard username={this.state.game?.playerUsernames?.[0]}
                                   pieces={this.state.game?.player1Pieces}
                                   isTurn={this.state.game?.game1Turn == 1}
                                   onClick={p => this.onPieceClick(p, 1)}/>
                        {this.makeBoard1()}
                        <Scorecard username={this.state.game?.playerUsernames?.[1]}
                                   pieces={this.state.game?.player2Pieces}
                                   isTurn={this.state.game?.game1Turn == 2}
                                   onClick={p => this.onPieceClick(p, 1)}/>
                    </div>
                </div>
                <div style={chessDiv}>
                    <Scorecard username={this.state.game?.playerUsernames?.[3]}
                               pieces={this.state.game?.player4Pieces}
                               isTurn={this.state.game?.game2Turn == 4}
                               onClick={p => this.onPieceClick(p, 2)}/>
                    {this.makeBoard2()}
                    <Scorecard username={this.state.game?.playerUsernames?.[2]}
                               pieces={this.state.game?.player3Pieces}
                               isTurn={this.state.game?.game2Turn == 3}
                               onClick={p => this.onPieceClick(p, 2)}/>
                </div>
            </div>);
    }

    private highlighted(row: number, col: number, board: number): boolean {
        if (this.state.moves) {
            return !!(this.state.moves.find(p => {
                return p.toRow == row && p.toCol == col && getBoardNum(p.playerNum) == board;
            }));
        } else if (this.state.placements) {
            return !!(this.state.placements.find(p => {
                return p.row == row && p.col == col && getBoardNum(p.playerNum) == board
            }));
        }

        return false;
    }

    private onPieceClick(piece: PieceType, boardNum: BoardNum) {
        const placementRequest: PlacementRequest = {
            piece,
            playerNum: (boardNum == 1) ? (isWhite(piece) ? 1 : 2) : (isWhite(piece) ? 3 : 4)
        };
        this.socket.emit('placementRequest', placementRequest);

        const newState: GamePageState = _.cloneDeep(this.state);
        newState.moves = undefined;
        newState.placements = undefined;
        this.setState(newState);
    }

    private onSquareClick(row: number, col: number, boardNum: BoardNum): void {
        const placement = this.state.placements?.find(p => {
            return p.row == row && p.col == col && getBoardNum(p.playerNum) == boardNum;
        });
        if (placement) {
            this.socket.emit('makePlacement', placement);
        } else {
            const move = this.state.moves?.find(p => {
                return p.toRow == row && p.toCol == col && getBoardNum(p.playerNum) == boardNum;
            });
            if (move) {
                this.socket.emit('makeMove', move);
            } else {
                const movementRequest: PieceMoveRequest = {row, col, boardNum};
                this.socket.emit('movementRequest', movementRequest);
            }
        }

        const newState: GamePageState = _.cloneDeep(this.state);
        newState.moves = undefined;
        newState.placements = undefined;
        this.setState(newState);
    }

    private static makeFileHeadings(): ReactElement {
        return <tr key={'header'}><td/>{['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(fileName => <td key={fileName}>{fileName}</td>)}</tr>;
    }

    private makeBoard2Row(row: number): ReactElement {
        return <tr key={row} id={"r" + (9 - row)}><th>{9 - row}</th>{[0, 1, 2, 3, 4, 5, 6, 7].map(
            col => <Square key={`${col}${row}`}
                           highlighted={this.highlighted(row, col, 2)}
                           color={col % 2 == row % 2 ? SquareColor.WHITE : SquareColor.BLACK}
                           onClick={() => this.onSquareClick(row, col, 2)}>
                {renderPiece(this.state.game?.board2[row][col])}</Square>)}
        </tr>
    }

    private makeBoard2(): ReactElement{
        return <table id="board2" style={chessTable}>
            <thead>
                {GamePage.makeFileHeadings()}
            </thead>
            <tbody>
                {[7, 6, 5, 4, 3, 2, 1, 0].map(row => this.makeBoard2Row(row))}
            </tbody>
        </table>
    }

    private makeBoard1Row(row: number): ReactElement {
        return <tr key={row} id={"r" + (9-row)}><th>{9-row}</th>{[0, 1, 2, 3, 4, 5, 6, 7].map(
            col => <Square key={`${col}${row}`}
                           highlighted={this.highlighted(7 - row, col, 1)}
                           color={col % 2 == row % 2 ? SquareColor.BLACK: SquareColor.WHITE}
                           onClick={() => this.onSquareClick(7 - row, col, 1)}>
                {renderPiece(this.state.game?.board1[7 - row][col])}</Square>)}
        </tr>
    }

    private makeBoard1(): ReactElement{
        return <table id="board1" style={chessTable}>
            <thead>
                {GamePage.makeFileHeadings()}
            </thead>
            <tbody>
                {[7, 6, 5, 4, 3, 2, 1, 0].map(row => this.makeBoard1Row(row))}
            </tbody>
        </table>
    }
}
