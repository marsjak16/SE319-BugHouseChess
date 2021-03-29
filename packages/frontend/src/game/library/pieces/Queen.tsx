import { Piece } from '../piece';
import wq from './ChessPieceImages/wq.png'
import bq from './ChessPieceImages/bq.png'

export class Queen extends Piece {

    render() {
        if (this.props.player === 1)
            return ( <img src={wq} alt={"White Queen"}/> )
        else
            return ( <img src={bq} alt={"Black Queen"}/> )
    }
}
