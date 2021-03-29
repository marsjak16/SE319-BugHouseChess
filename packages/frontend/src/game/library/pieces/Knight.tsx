import { Piece } from '../piece';
import wn from './ChessPieceImages/wn.png'
import bn from './ChessPieceImages/bn.png'

export class Knight extends Piece {

    render() {
        if (this.props.player === 1)
            return ( <img src={wn} alt={"White Knight"}/> )
        else
            return ( <img src={bn} alt={"Black Knight"}/> )
    }
}
