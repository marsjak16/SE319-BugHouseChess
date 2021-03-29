import { Piece } from '../piece';
import wk from './ChessPieceImages/wk.png'
import bk from './ChessPieceImages/bk.png'

export class King extends Piece {

    render() {
        if (this.props.player === 1)
            return ( <img src={wk} alt={"White King"}/> )
        else
            return ( <img src={bk} alt={"Black King"}/> )
    }
}

