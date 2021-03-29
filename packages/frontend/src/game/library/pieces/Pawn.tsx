import { Piece } from '../piece';
import wp from './ChessPieceImages/wp.png'
import bp from './ChessPieceImages/bp.png'

export class Pawn extends Piece {

    render() {
        if (this.props.player === 1)
            return ( <img src={wp} alt={"White Pawn"}/> )
        else
            return ( <img src={bp} alt={"Black Pawn"}/> )
    }
}
