import { KEY } from '../constants/keys';
import Piece from '../classes/piece';

export const moves = {
  [KEY.LEFT]: (piece: Piece) => ({ ...piece, x: piece.x - 1 }),
  [KEY.DOWN]: (piece: Piece) => ({ ...piece, y: piece.y + 1 }),
  [KEY.RIGHT]: (piece: Piece) => ({ ...piece, x: piece.x + 1 }),
};
