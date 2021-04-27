import React, {CSSProperties, ReactElement} from "react";
import {Link} from "react-router-dom";
import {JoinGamePage} from "../game/join-game-page";
import * as H from "history";

interface MainProps  {
    history: H.History
}

interface MainState {
    
}

const mainDiv: CSSProperties = {
	margin: 'auto',
    width: '70%',
};

const mainText: CSSProperties = {
	margin: 'auto',
    width: '95%',
};

export class MainPage extends React.Component<MainProps,MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = {};
    }

    render(): ReactElement {
        return <div style={mainDiv}>
			<h4>How To Play:</h4>
			<p style={mainText}>Bughouse Chess is played similarly to regular chess but with a few fun twists that allows for 
				two teams of two to play against each other. You and your teammate will sit on one side and the opposing team 
				will be on the other side. You will play one color and your teammate will play the opposite color. Whenever 
				your teammate captures a piece from the enemy, that piece will appear in front of you and vice-versa. During 
				your turn you can choose to place one of your captured pieces anywhere on the board instead of playing a regular 
				move. Besides that, it's basically just regular chess and the game ends when one player gets checkmate.</p>
			<br></br>
			<h4>How To Start A Game:</h4>
			<ol>
				<li>Log in or register using the link in the top right corner</li>
				<li>Click "Start Playing!"</li>
				<li>Join a queue and wait for your match to start</li>
			</ol>
			<br></br>
			<div style={{textAlign: 'center'}}><Link className='btn btn-primary' type='button' to='/join-game'>Start Playing!</Link></div>
        </div>;
    }
}