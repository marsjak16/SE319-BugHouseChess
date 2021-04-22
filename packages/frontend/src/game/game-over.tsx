import React, {Component, ReactElement} from "react";
import {Link} from "react-router-dom";

export interface GameOverProps {
    win: boolean
}

export class GameOver extends Component<GameOverProps> {
    render(): ReactElement {
        return <div className='modal'>
            <div className='row'>
                <span className='mx-auto'>
                    {(this.props.win) ? 'You won!' : 'You lost'}
                </span>
            </div>
            <div className='row'>
                <Link to='/join-game' className='btn btn-primary' type='button'>New Game</Link>
            </div>
        </div>
    }
}