import { Piece } from '../piece';
import wq from './ChessPieceImages/wq.png'
import bq from './ChessPieceImages/bq.png'

export class Queen extends Piece {
    constructor(props: any, player: number) {
        super(props, player)
    }

    render() {
        if (this.player === 1)
            return ( <img src={wq} alt={"White Queen"}/> )
        else
            return ( <img src={bq} alt={"Black Queen"}/> )
    }
}
