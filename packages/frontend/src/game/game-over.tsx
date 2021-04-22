import React, {Component, CSSProperties, ReactElement} from "react";
import {Link} from "react-router-dom";

const GameOverModalStyle: CSSProperties = {
    width: '400px',
    display: 'block',

    top: '100px',
    left: 'calc(50% - 200px)'
};

export interface GameOverProps {
    win: boolean
}

export class GameOver extends Component<GameOverProps> {
    render(): ReactElement {
        console.log('WIN!');
        return <div className='modal fade show' style={GameOverModalStyle}>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className="modal-header">
                        <h5 className="modal-title">Game Over</h5>
                    </div>
                    <div className='modal-body'>
                        {(this.props.win) ? 'You team has won the game!' : 'Your team has   lost'}
                    </div>
                    <div className='modal-footer'>
                        <Link to='/join-game' className='btn btn-primary'>New Game</Link>
                    </div>
                </div>
            </div>
        </div>
    }
}