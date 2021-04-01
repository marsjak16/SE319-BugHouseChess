import { Piece } from '../piece';
import wr from './ChessPieceImages/wr.png'
import br from './ChessPieceImages/br.png'

export class Rook extends Piece {

    render() {
        if (this.props.player === 1)
            return ( <img src={wr} alt={"White Rook"}/> )
        else
            return ( <img src={br} alt={"Black Rook"}/> )
    }
}
