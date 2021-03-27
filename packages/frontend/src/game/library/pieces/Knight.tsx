import { Piece } from '../piece';
import wn from './ChessPieceImages/wn.png'
import bn from './ChessPieceImages/bn.png'

export class Knight extends Piece {
    constructor(props: any, player: number) {
        super(props, player)
    }

    render() {
        if (this.player === 1)
            return ( <img src={wn} alt={"White Knight"}/> )
        else
            return ( <img src={bn} alt={"Black Knight"}/> )
    }
}
