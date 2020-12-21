import React, { useRef, useEffect, useCallback } from 'react';
import { BLOCK_SIZE, ROWS, COLS } from '../constants';

function Board() {
  const board = useRef<HTMLCanvasElement>(null);

  // init canvas
  useEffect(() => {
    if (!board.current) {
      return;
    }

    const ctx = board.current.getContext('2d');

    if (!ctx) {
      return;
    }

    // canvas size
    ctx.canvas.width = COLS * BLOCK_SIZE;
    ctx.canvas.height = ROWS * BLOCK_SIZE;

    // canvas scale
    ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }, []);

  // reset field before new game
  const reset = useCallback(() => {

  }, []);

  // get empty matrix filled with 0
  const getEmptyBoard = useCallback(() => {
    return Array.from(
      { length: ROWS }, () => Array(COLS).fill(0),
    )
  }, []);

  return (
    <canvas id={'board'} className={'gameBoard'} ref={board} />
  );
}

export default Board;
