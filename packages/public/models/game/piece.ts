export enum PieceType {
    EMPTY = 'EMPTY',
    WHITE_PAWN = 'WHITE_PAWN',
    WHITE_KNIGHT = 'WHITE_KNIGHT',
    WHITE_BISHOP = 'WHITE_BISHOP',
    WHITE_ROOK = 'WHITE_ROOK',
    WHITE_QUEEN = 'WHITE_QUEEN',
    WHITE_KING = 'WHITE_KING',
    BLACK_PAWN = 'BLACK_PAWN',
    BLACK_KNIGHT = 'BLACK_KNIGHT',
    BLACK_BISHOP = 'BLACK_BISHOP',
    BLACK_ROOK = 'BLACK_ROOK',
    BLACK_QUEEN = 'BLACK_QUEEN',
    BLACK_KING = 'BLACK_KING',
}

export function isSamePlayer(piece1: PieceType, piece2: PieceType): boolean {
    if (piece1 == PieceType.EMPTY || piece2 == PieceType.EMPTY) {
        return false;
    }
    console.log(piece1.substring(0, 5));
    console.log(piece2.substring(0, 5));
    return piece1.substring(0, 5) == piece2.substring(0, 5);
}

export function isWhite(piece: PieceType): boolean {
    return piece.substring(0, 5) == 'WHITE';
}