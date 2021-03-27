import { Piece } from '../piece';
import wr from './ChessPieceImages/wr.png'
import br from './ChessPieceImages/br.png'

export class Rook extends Piece {
    constructor(props: any, player: number) {
        super(props, player)
    }

    render() {
        if (this.player === 1)
            return ( <img src={wr} alt={"White Rook"}/> )
        else
            return ( <img src={br} alt={"Black Rook"}/> )
    }
}
