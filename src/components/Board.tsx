import React, { useEffect, forwardRef, MutableRefObject } from 'react';
import { BLOCK_SIZE, ROWS, COLS } from '../constants';

const Board = forwardRef<HTMLCanvasElement>((props, ref) => {
  // init canvas
  useEffect(() => {
    const refInstance = ref as MutableRefObject<HTMLCanvasElement>;

    if (!refInstance.current) {
      return;
    }

    const ctx = refInstance.current.getContext('2d');

    if (!ctx) {
      return;
    }

    // canvas size
    ctx.canvas.width = COLS * BLOCK_SIZE;
    ctx.canvas.height = ROWS * BLOCK_SIZE;

    // canvas scale
    ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }, [ ref ]);

  return (
    <canvas id={'board'} className={'gameBoard'} ref={ref} />
  );
});

export default Board;
