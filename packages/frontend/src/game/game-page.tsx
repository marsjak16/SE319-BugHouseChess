import React, {Component, CSSProperties, ReactElement} from "react";
import io from 'socket.io-client';
import { match } from "react-router-dom";
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
	border:'solid 10px lightgrey'
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

	render(){
        return (
		<div>
			<div style={chessDiv}>
				<div style={{float:'right'}}>
				<table id="board1" style={chessTable}>
					<tr>
						<th></th>
						<th>A</th>
						<th>B</th>
						<th>C</th>
						<th>D</th>
						<th>E</th>
						<th>F</th>
						<th>G</th>
						<th>H</th>
					</tr>
					<tr id="8">
						<th>8</th>
						<td id="8A" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[0][0])}</td>
						<td id="8B" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[0][1])}</td>
						<td id="8C" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[0][2])}</td>
						<td id="8D" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[0][3])}</td>
						<td id="8E" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[0][4])}</td>
						<td id="8F" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[0][5])}</td>
						<td id="8G" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[0][6])}</td>
						<td id="8H" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[0][7])}</td>
					</tr>
					<tr id="7">
						<th>7</th>
						<td id="7A" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[1][0])}</td>
						<td id="7B" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[1][1])}</td>
						<td id="7C" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[1][2])}</td>
						<td id="7D" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[1][3])}</td>
						<td id="7E" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[1][4])}</td>
						<td id="7F" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[1][5])}</td>
						<td id="7G" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[1][6])}</td>
						<td id="7H" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[1][7])}</td>
					</tr>
					<tr id="r6">
						<th>6</th>
						<td id="6A" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[2][0])}</td>
						<td id="6B" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[2][1])}</td>
						<td id="6C" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[2][2])}</td>
						<td id="6D" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[2][3])}</td>
						<td id="6E" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[2][4])}</td>
						<td id="6F" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[2][5])}</td>
						<td id="6G" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[2][6])}</td>
						<td id="6H" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[2][7])}</td>
					</tr>
					<tr id="r5">
						<th>5</th>
						<td id="5A" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[3][0])}</td>
						<td id="5B" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[3][1])}</td>
						<td id="5C" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[3][2])}</td>
						<td id="5D" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[3][3])}</td>
						<td id="5E" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[3][4])}</td>
						<td id="5F" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[3][5])}</td>
						<td id="5G" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[3][6])}</td>
						<td id="5H" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[3][7])}</td>
					</tr>
					<tr id="r4">
						<th>4</th>
						<td id="4A" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[4][0])}</td>
						<td id="4B" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[4][1])}</td>
						<td id="4C" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[4][2])}</td>
						<td id="4D" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[4][3])}</td>
						<td id="4E" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[4][4])}</td>
						<td id="4F" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[4][5])}</td>
						<td id="4G" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[4][6])}</td>
						<td id="4H" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[4][7])}</td>
					</tr>
					<tr id="r3">
						<th>3</th>
						<td id="3A" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[5][0])}</td>
						<td id="3B" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[5][1])}</td>
						<td id="3C" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[5][2])}</td>
						<td id="3D" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[5][3])}</td>
						<td id="3E" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[5][4])}</td>
						<td id="3F" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[5][5])}</td>
						<td id="3G" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[5][6])}</td>
						<td id="3H" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[5][7])}</td>
					</tr>
					<tr id="r2">
						<th>2</th>
						<td id="2A" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[6][0])}</td>
						<td id="2B" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[6][1])}</td>
						<td id="2C" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[6][2])}</td>
						<td id="2D" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[6][3])}</td>
						<td id="2E" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[6][4])}</td>
						<td id="2F" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[6][5])}</td>
						<td id="2G" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[6][6])}</td>
						<td id="2H" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[6][7])}</td>
					</tr>
					<tr id="r1">
						<th>1</th>
						<td id="1A" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[7][0])}</td>
						<td id="1B" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[7][1])}</td>
						<td id="1C" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[7][2])}</td>
						<td id="1D" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[7][3])}</td>
						<td id="1E" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[7][4])}</td>
						<td id="1F" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[7][5])}</td>
						<td id="1G" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board1[7][6])}</td>
						<td id="1H" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board1[7][7])}</td>
					</tr>
				</table>
				</div>
			</div>

			<div style={chessDiv}>
				<table id="board2" style={chessTable}>
					<tr>
						<th></th>
						<th>A</th>
						<th>B</th>
						<th>C</th>
						<th>D</th>
						<th>E</th>
						<th>F</th>
						<th>G</th>
						<th>H</th>
					</tr>
					<tr id="r8">
						<th>8</th>
						<td id="8A" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[0][0])}</td>
						<td id="8B" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[0][1])}</td>
						<td id="8C" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[0][2])}</td>
						<td id="8D" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[0][3])}</td>
						<td id="8E" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[0][4])}</td>
						<td id="8F" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[0][5])}</td>
						<td id="8G" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[0][6])}</td>
						<td id="8H" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[0][7])}</td>
					</tr>
					<tr id="7">
						<th>7</th>
						<td id="7A" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[1][0])}</td>
						<td id="7B" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[1][1])}</td>
						<td id="7C" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[1][2])}</td>
						<td id="7D" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[1][3])}</td>
						<td id="7E" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[1][4])}</td>
						<td id="7F" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[1][5])}</td>
						<td id="7G" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[1][6])}</td>
						<td id="7H" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[1][7])}</td>
					</tr>
					<tr id="r6">
						<th>6</th>
						<td id="6A" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[2][0])}</td>
						<td id="6B" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[2][1])}</td>
						<td id="6C" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[2][2])}</td>
						<td id="6D" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[2][3])}</td>
						<td id="6E" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[2][4])}</td>
						<td id="6F" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[2][5])}</td>
						<td id="6G" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[2][6])}</td>
						<td id="6H" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[2][7])}</td>
					</tr>
					<tr id="r5">
						<th>5</th>
						<td id="5A" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[3][0])}</td>
						<td id="5B" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[3][1])}</td>
						<td id="5C" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[3][2])}</td>
						<td id="5D" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[3][3])}</td>
						<td id="5E" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[3][4])}</td>
						<td id="5F" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[3][5])}</td>
						<td id="5G" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[3][6])}</td>
						<td id="5H" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[3][7])}</td>
					</tr>
					<tr id="r4">
						<th>4</th>
						<td id="4A" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[4][0])}</td>
						<td id="4B" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[4][1])}</td>
						<td id="4C" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[4][2])}</td>
						<td id="4D" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[4][3])}</td>
						<td id="4E" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[4][4])}</td>
						<td id="4F" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[4][5])}</td>
						<td id="4G" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[4][6])}</td>
						<td id="4H" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[4][7])}</td>
					</tr>
					<tr id="r3">
						<th>3</th>
						<td id="3A" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[5][0])}</td>
						<td id="3B" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[5][1])}</td>
						<td id="3C" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[5][2])}</td>
						<td id="3D" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[5][3])}</td>
						<td id="3E" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[5][4])}</td>
						<td id="3F" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[5][5])}</td>
						<td id="3G" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[5][6])}</td>
						<td id="3H" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[5][7])}</td>
					</tr>
					<tr id="r2">
						<th>2</th>
						<td id="2A" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[6][0])}</td>
						<td id="2B" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[6][1])}</td>
						<td id="2C" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[6][2])}</td>
						<td id="2D" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[6][3])}</td>
						<td id="2E" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[6][4])}</td>
						<td id="2F" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[6][5])}</td>
						<td id="2G" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[6][6])}</td>
						<td id="2H" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[6][7])}</td>
					</tr>
					<tr id="r1">
						<th>1</th>
						<td id="1A" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[7][0])}</td>
						<td id="1B" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[7][1])}</td>
						<td id="1C" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[7][2])}</td>
						<td id="1D" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[7][3])}</td>
						<td id="1E" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[7][4])}</td>
						<td id="1F" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[7][5])}</td>
						<td id="1G" style={blackSquare}>{GamePage.renderPiece(this.state.game?.board2[7][6])}</td>
						<td id="1H" style={whiteSquare}>{GamePage.renderPiece(this.state.game?.board2[7][7])}</td>
					</tr>
				</table>
			</div>
		</div>);
    }
}
