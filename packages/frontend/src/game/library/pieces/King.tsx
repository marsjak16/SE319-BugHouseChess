import { Piece } from '../piece';
import wk from './ChessPieceImages/wk.png'
import bk from './ChessPieceImages/bk.png'

export class King extends Piece {
    constructor(props: any, player: number) {
        super(props, player)
    }

    render() {
        if (this.player === 1)
            return ( <img src={wk} alt={"White King"}/> )
        else
            return ( <img src={bk} alt={"Black King"}/> )
    }
}

