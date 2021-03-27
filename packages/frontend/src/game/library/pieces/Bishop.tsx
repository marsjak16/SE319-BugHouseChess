import { Piece } from '../piece';
import wb from './ChessPieceImages/wb.png'
import bb from './ChessPieceImages/bb.png'

export class Bishop extends Piece {
    constructor(props: any, player: number) {
        super(props, player)
    }

    render() {
        if (this.player === 1)
            return ( <img src={wb} alt={"White Bishop"}/> )
        else
            return ( <img src={bb} alt={"Black Bishop"}/> )
    }
}
