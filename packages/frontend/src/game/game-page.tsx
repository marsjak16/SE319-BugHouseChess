import React, {Component,CSSProperties} from "react";
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
}
const chessDiv: CSSProperties = {
	float: 'left',
	width: '50%',
	padding: '10px'
}

export class GamePage extends Component{
    /*populate(){
		var row = document.getElementById("board1").getElementById("7");
		for(var i=0;i<8;i++){
			row.getElementById()
		}
	}*/
	
	
	
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
						<td id="8A" style={whiteSquare}><Rook/></td>
						<td id="8B" style={blackSquare}><Knight/></td>
						<td id="8C" style={whiteSquare}><Bishop/></td>
						<td id="8D" style={blackSquare}><Queen/></td>
						<td id="8E" style={whiteSquare}><King/></td>
						<td id="8F" style={blackSquare}><Bishop/></td>
						<td id="8G" style={whiteSquare}><Knight/></td>
						<td id="8H" style={blackSquare}><Rook/></td>
					</tr>
					<tr id="7">
						<th>7</th>
						<td id="7A" style={blackSquare}><Pawn/></td>
						<td id="7B" style={whiteSquare}><Pawn/></td>
						<td id="7C" style={blackSquare}><Pawn/></td>
						<td id="7D" style={whiteSquare}><Pawn/></td>
						<td id="7E" style={blackSquare}><Pawn/></td>
						<td id="7F" style={whiteSquare}><Pawn/></td>
						<td id="7G" style={blackSquare}><Pawn/></td>
						<td id="7H" style={whiteSquare}><Pawn/></td>
					</tr>
					<tr id="r6">
						<th>6</th>
						<td id="6A" style={whiteSquare}></td>
						<td id="6B" style={blackSquare}></td>
						<td id="6C" style={whiteSquare}></td>
						<td id="6D" style={blackSquare}></td>
						<td id="6E" style={whiteSquare}></td>
						<td id="6F" style={blackSquare}></td>
						<td id="6G" style={whiteSquare}></td>
						<td id="6H" style={blackSquare}></td>
					</tr>
					<tr id="r5">
						<th>5</th>
						<td id="5A" style={blackSquare}></td>
						<td id="5B" style={whiteSquare}></td>
						<td id="5C" style={blackSquare}></td>
						<td id="5D" style={whiteSquare}></td>
						<td id="5E" style={blackSquare}></td>
						<td id="5F" style={whiteSquare}></td>
						<td id="5G" style={blackSquare}></td>
						<td id="5H" style={whiteSquare}></td>
					</tr>
					<tr id="r4">
						<th>4</th>
						<td id="4A" style={whiteSquare}></td>
						<td id="4B" style={blackSquare}></td>
						<td id="4C" style={whiteSquare}></td>
						<td id="4D" style={blackSquare}></td>
						<td id="4E" style={whiteSquare}></td>
						<td id="4F" style={blackSquare}></td>
						<td id="4G" style={whiteSquare}></td>
						<td id="4H" style={blackSquare}></td>
					</tr>
					<tr id="r3">
						<th>3</th>
						<td id="3A" style={blackSquare}></td>
						<td id="3B" style={whiteSquare}></td>
						<td id="3C" style={blackSquare}></td>
						<td id="3D" style={whiteSquare}></td>
						<td id="3E" style={blackSquare}></td>
						<td id="3F" style={whiteSquare}></td>
						<td id="3G" style={blackSquare}></td>
						<td id="3H" style={whiteSquare}></td>
					</tr>
					<tr id="r2">
						<th>2</th>
						<td id="2A" style={whiteSquare}><Pawn/></td>
						<td id="2B" style={blackSquare}><Pawn/></td>
						<td id="2C" style={whiteSquare}><Pawn/></td>
						<td id="2D" style={blackSquare}><Pawn/></td>
						<td id="2E" style={whiteSquare}><Pawn/></td>
						<td id="2F" style={blackSquare}><Pawn/></td>
						<td id="2G" style={whiteSquare}><Pawn/></td>
						<td id="2H" style={blackSquare}><Pawn/></td>
					</tr>
					<tr id="r1">
						<th>1</th>
						<td id="1A" style={blackSquare}><Rook/></td>
						<td id="1B" style={whiteSquare}><Knight/></td>
						<td id="1C" style={blackSquare}><Bishop/></td>
						<td id="1D" style={whiteSquare}><Queen/></td>
						<td id="1E" style={blackSquare}><King /></td>
						<td id="1F" style={whiteSquare}><Bishop/></td>
						<td id="1G" style={blackSquare}><Knight/></td>
						<td id="1H" style={whiteSquare}><Rook/></td>
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
						<td id="8A" style={whiteSquare}><Rook/></td>
						<td id="8B" style={blackSquare}><Knight/></td>
						<td id="8C" style={whiteSquare}><Bishop/></td>
						<td id="8D" style={blackSquare}><Queen/></td>
						<td id="8E" style={whiteSquare}><King/></td>
						<td id="8F" style={blackSquare}><Bishop/></td>
						<td id="8G" style={whiteSquare}><Knight/></td>
						<td id="8H" style={blackSquare}><Rook/></td>
					</tr>
					<tr id="7">
						<th>7</th>
						<td id="7A" style={blackSquare}><Pawn/></td>
						<td id="7B" style={whiteSquare}><Pawn/></td>
						<td id="7C" style={blackSquare}><Pawn/></td>
						<td id="7D" style={whiteSquare}><Pawn/></td>
						<td id="7E" style={blackSquare}><Pawn/></td>
						<td id="7F" style={whiteSquare}><Pawn/></td>
						<td id="7G" style={blackSquare}><Pawn/></td>
						<td id="7H" style={whiteSquare}><Pawn/></td>
					</tr>
					<tr id="r6">
						<th>6</th>
						<td id="6A" style={whiteSquare}></td>
						<td id="6B" style={blackSquare}></td>
						<td id="6C" style={whiteSquare}></td>
						<td id="6D" style={blackSquare}></td>
						<td id="6E" style={whiteSquare}></td>
						<td id="6F" style={blackSquare}></td>
						<td id="6G" style={whiteSquare}></td>
						<td id="6H" style={blackSquare}></td>
					</tr>
					<tr id="r5">
						<th>5</th>
						<td id="5A" style={blackSquare}></td>
						<td id="5B" style={whiteSquare}></td>
						<td id="5C" style={blackSquare}></td>
						<td id="5D" style={whiteSquare}></td>
						<td id="5E" style={blackSquare}></td>
						<td id="5F" style={whiteSquare}></td>
						<td id="5G" style={blackSquare}></td>
						<td id="5H" style={whiteSquare}></td>
					</tr>
					<tr id="r4">
						<th>4</th>
						<td id="4A" style={whiteSquare}></td>
						<td id="4B" style={blackSquare}></td>
						<td id="4C" style={whiteSquare}></td>
						<td id="4D" style={blackSquare}></td>
						<td id="4E" style={whiteSquare}></td>
						<td id="4F" style={blackSquare}></td>
						<td id="4G" style={whiteSquare}></td>
						<td id="4H" style={blackSquare}></td>
					</tr>
					<tr id="r3">
						<th>3</th>
						<td id="3A" style={blackSquare}></td>
						<td id="3B" style={whiteSquare}></td>
						<td id="3C" style={blackSquare}></td>
						<td id="3D" style={whiteSquare}></td>
						<td id="3E" style={blackSquare}></td>
						<td id="3F" style={whiteSquare}></td>
						<td id="3G" style={blackSquare}></td>
						<td id="3H" style={whiteSquare}></td>
					</tr>
					<tr id="r2">
						<th>2</th>
						<td id="2A" style={whiteSquare}><Pawn/></td>
						<td id="2B" style={blackSquare}><Pawn/></td>
						<td id="2C" style={whiteSquare}><Pawn/></td>
						<td id="2D" style={blackSquare}><Pawn/></td>
						<td id="2E" style={whiteSquare}><Pawn/></td>
						<td id="2F" style={blackSquare}><Pawn/></td>
						<td id="2G" style={whiteSquare}><Pawn/></td>
						<td id="2H" style={blackSquare}><Pawn/></td>
					</tr>
					<tr id="r1">
						<th>1</th>
						<td id="1A" style={blackSquare}><Rook/></td>
						<td id="1B" style={whiteSquare}><Knight/></td>
						<td id="1C" style={blackSquare}><Bishop/></td>
						<td id="1D" style={whiteSquare}><Queen/></td>
						<td id="1E" style={blackSquare}><King /></td>
						<td id="1F" style={whiteSquare}><Bishop/></td>
						<td id="1G" style={blackSquare}><Knight/></td>
						<td id="1H" style={whiteSquare}><Rook/></td>
					</tr>
				</table>
			</div>
		</div>);
    }
}