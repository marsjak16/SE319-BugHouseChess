import React, {Component,CSSProperties,ReactElement} from "react";
import {UserModel} from "../../../public/models/account/user-model";

import {Link} from "react-router-dom";

interface GameProps {
    user?: UserModel
}

const blackSquare: CSSProperties = {
	width: "60px",
	height: "60px",
	backgroundColor: 'black'
}
const whiteSquare: CSSProperties = {
	width: "60px",
	height: "60px",
	backgroundColor: 'white'
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
const timerDiv: CSSProperties = {
	float: 'right',
	width: '20%',
}

export class GamePage extends Component<GameProps,any>{
	constructor(props:GameProps){
		super(props);
		this.state = {	seconds1: 300,
						seconds2: 300,
						seconds3: 300,
						seconds4: 300,
						currentPlayer: 0,
					  };
		//this.timer1 = setInterval(this.countDown1,1000);	  
		//this.countDown1 = this.countDown1.bind(this);
	}

	/*countDown1(){
		let current=1;
		if(current==1){
			let secs=this.state.seconds1;
			secs--;
			this.setState({
				seconds1: secs
			});
		}
	}*/
	
	render(){
        return (
		<div>
			<div style={chessDiv}>
				<div style={{float:'right'}}>
				<div style={{paddingBottom: '10px'}}>
				<table id="enemySection1" style={{}}>
					<tr>
						<td>
							<h5 style={{textAlign:'left'}}>Enemy 1</h5>
						</td>
						<td>
							<div style={timerDiv}><h5>{Math.floor(this.state.seconds1/60)}:{(this.state.seconds1%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h5></div>
						</td>
					</tr>
					<tr>
						<td style={{backgroundColor:'lightgrey'}} colSpan={2}>
							<div style={{width:'505px',height:'70px'}}>
								<img style={{padding:'10px'}} src="/TempChessPieces/bp.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/br.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/bn.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/bb.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/bq.png"></img>
							</div>
						</td>
					</tr>
				</table>
				</div>
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
						<td id="A" style={whiteSquare}></td>
						<td id="B" style={blackSquare}></td>
						<td id="C" style={whiteSquare}></td>
						<td id="D" style={blackSquare}></td>
						<td id="E" style={whiteSquare}></td>
						<td id="F" style={blackSquare}></td>
						<td id="G" style={whiteSquare}></td>
						<td id="H" style={blackSquare}></td>
					</tr>
					<tr id="7">
						<th>7</th>
						<td id="A" style={blackSquare}></td>
						<td id="B" style={whiteSquare}></td>
						<td id="C" style={blackSquare}></td>
						<td id="D" style={whiteSquare}></td>
						<td id="E" style={blackSquare}></td>
						<td id="F" style={whiteSquare}></td>
						<td id="G" style={blackSquare}></td>
						<td id="H" style={whiteSquare}></td>
					</tr>
					<tr id="6">
						<th>6</th>
						<td id="A" style={whiteSquare}></td>
						<td id="B" style={blackSquare}></td>
						<td id="C" style={whiteSquare}></td>
						<td id="D" style={blackSquare}></td>
						<td id="E" style={whiteSquare}></td>
						<td id="F" style={blackSquare}></td>
						<td id="G" style={whiteSquare}></td>
						<td id="H" style={blackSquare}></td>
					</tr>
					<tr id="5">
						<th>5</th>
						<td id="A" style={blackSquare}></td>
						<td id="B" style={whiteSquare}></td>
						<td id="C" style={blackSquare}></td>
						<td id="D" style={whiteSquare}></td>
						<td id="E" style={blackSquare}></td>
						<td id="F" style={whiteSquare}></td>
						<td id="G" style={blackSquare}></td>
						<td id="H" style={whiteSquare}></td>
					</tr>
					<tr id="4">
						<th>4</th>
						<td id="A" style={whiteSquare}></td>
						<td id="B" style={blackSquare}></td>
						<td id="C" style={whiteSquare}></td>
						<td id="D" style={blackSquare}></td>
						<td id="E" style={whiteSquare}></td>
						<td id="F" style={blackSquare}></td>
						<td id="G" style={whiteSquare}></td>
						<td id="H" style={blackSquare}></td>
					</tr>
					<tr id="3">
						<th>3</th>
						<td id="A" style={blackSquare}></td>
						<td id="B" style={whiteSquare}></td>
						<td id="C" style={blackSquare}></td>
						<td id="D" style={whiteSquare}></td>
						<td id="E" style={blackSquare}></td>
						<td id="F" style={whiteSquare}></td>
						<td id="G" style={blackSquare}></td>
						<td id="H" style={whiteSquare}></td>
					</tr>
					<tr id="2">
						<th>2</th>
						<td id="A" style={whiteSquare}></td>
						<td id="B" style={blackSquare}></td>
						<td id="C" style={whiteSquare}></td>
						<td id="D" style={blackSquare}></td>
						<td id="E" style={whiteSquare}></td>
						<td id="F" style={blackSquare}></td>
						<td id="G" style={whiteSquare}></td>
						<td id="H" style={blackSquare}></td>
					</tr>
					<tr id="1">
						<th>1</th>
						<td id="A" style={blackSquare}></td>
						<td id="B" style={whiteSquare}></td>
						<td id="C" style={blackSquare}></td>
						<td id="D" style={whiteSquare}></td>
						<td id="E" style={blackSquare}></td>
						<td id="F" style={whiteSquare}></td>
						<td id="G" style={blackSquare}></td>
						<td id="H" style={whiteSquare}></td>
					</tr>
				</table>
				<div style={{paddingTop: '10px'}}>
				<table id="player" style={{}}>
					<tr>
						<td style={{backgroundColor:'lightgrey'}} colSpan={2}>
							<div style={{width:'505px',height:'70px'}}>
								<img style={{padding:'10px'}} src="/TempChessPieces/wp.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/wr.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/wn.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/wb.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/wq.png"></img>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							{this.props.user ? <h5 style={{textAlign:'left'}}>{this.props.user?.username}</h5> : 
											   <h5 style={{textAlign:'left'}}>Player</h5>}
						</td>
						<td>
							<div style={timerDiv}><h5>{Math.floor(this.state.seconds2/60)}:{(this.state.seconds2%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h5></div>
						</td>
					</tr>
				</table>
				</div>
				</div>
			</div>
			
			<div style={chessDiv}>
				<div style={{paddingBottom: '10px'}}>
				<table id="enemySection2" style={{}}>
					<tr>
						<td>
							<h5 style={{textAlign:'left'}}>Enemy 2</h5>
						</td>
						<td>
							<div style={timerDiv}><h5>{Math.floor(this.state.seconds3/60)}:{(this.state.seconds3%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h5></div>
						</td>
					</tr>
					<tr>
						<td style={{backgroundColor:'lightgrey'}} colSpan={2}>
							<div style={{width:'505px',height:'70px'}}>
								<img style={{padding:'10px'}} src="/TempChessPieces/wp.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/wr.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/wn.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/wb.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/wq.png"></img>
							</div>
						</td>
					</tr>
				</table>
				</div>
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
					<tr id="8">
						<th>8</th>
						<td id="A" style={whiteSquare}></td>
						<td id="B" style={blackSquare}></td>
						<td id="C" style={whiteSquare}></td>
						<td id="D" style={blackSquare}></td>
						<td id="E" style={whiteSquare}></td>
						<td id="F" style={blackSquare}></td>
						<td id="G" style={whiteSquare}></td>
						<td id="H" style={blackSquare}></td>
					</tr>
					<tr id="7">
						<th>7</th>
						<td id="A" style={blackSquare}></td>
						<td id="B" style={whiteSquare}></td>
						<td id="C" style={blackSquare}></td>
						<td id="D" style={whiteSquare}></td>
						<td id="E" style={blackSquare}></td>
						<td id="F" style={whiteSquare}></td>
						<td id="G" style={blackSquare}></td>
						<td id="H" style={whiteSquare}></td>
					</tr>
					<tr id="6">
						<th>6</th>
						<td id="A" style={whiteSquare}></td>
						<td id="B" style={blackSquare}></td>
						<td id="C" style={whiteSquare}></td>
						<td id="D" style={blackSquare}></td>
						<td id="E" style={whiteSquare}></td>
						<td id="F" style={blackSquare}></td>
						<td id="G" style={whiteSquare}></td>
						<td id="H" style={blackSquare}></td>
					</tr>
					<tr id="5">
						<th>5</th>
						<td id="A" style={blackSquare}></td>
						<td id="B" style={whiteSquare}></td>
						<td id="C" style={blackSquare}></td>
						<td id="D" style={whiteSquare}></td>
						<td id="E" style={blackSquare}></td>
						<td id="F" style={whiteSquare}></td>
						<td id="G" style={blackSquare}></td>
						<td id="H" style={whiteSquare}></td>
					</tr>
					<tr id="4">
						<th>4</th>
						<td id="A" style={whiteSquare}></td>
						<td id="B" style={blackSquare}></td>
						<td id="C" style={whiteSquare}></td>
						<td id="D" style={blackSquare}></td>
						<td id="E" style={whiteSquare}></td>
						<td id="F" style={blackSquare}></td>
						<td id="G" style={whiteSquare}></td>
						<td id="H" style={blackSquare}></td>
					</tr>
					<tr id="3">
						<th>3</th>
						<td id="A" style={blackSquare}></td>
						<td id="B" style={whiteSquare}></td>
						<td id="C" style={blackSquare}></td>
						<td id="D" style={whiteSquare}></td>
						<td id="E" style={blackSquare}></td>
						<td id="F" style={whiteSquare}></td>
						<td id="G" style={blackSquare}></td>
						<td id="H" style={whiteSquare}></td>
					</tr>
					<tr id="2">
						<th>2</th>
						<td id="A" style={whiteSquare}></td>
						<td id="B" style={blackSquare}></td>
						<td id="C" style={whiteSquare}></td>
						<td id="D" style={blackSquare}></td>
						<td id="E" style={whiteSquare}></td>
						<td id="F" style={blackSquare}></td>
						<td id="G" style={whiteSquare}></td>
						<td id="H" style={blackSquare}></td>
					</tr>
					<tr id="1">
						<th>1</th>
						<td id="A" style={blackSquare}></td>
						<td id="B" style={whiteSquare}></td>
						<td id="C" style={blackSquare}></td>
						<td id="D" style={whiteSquare}></td>
						<td id="E" style={blackSquare}></td>
						<td id="F" style={whiteSquare}></td>
						<td id="G" style={blackSquare}></td>
						<td id="H" style={whiteSquare}></td>
					</tr>
				</table>
				<div style={{paddingTop: '10px'}}>
				<table id="teammate" style={{}}>
					<tr>
						<td style={{backgroundColor:'lightgrey'}} colSpan={2}>
							<div style={{width:'505px',height:'70px'}}>
								<img style={{padding:'10px'}} src="/TempChessPieces/bp.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/br.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/bn.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/bb.png"></img>
								<img style={{padding:'10px'}} src="/TempChessPieces/bq.png"></img>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<h5 style={{textAlign:'left'}}>Teammate</h5>
						</td>
						<td>
							<div style={timerDiv}><h5>{Math.floor(this.state.seconds4/60)}:{(this.state.seconds4%60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</h5></div>
						</td>
					</tr>
				</table>
				</div>
			</div>
		</div>);
    }
}