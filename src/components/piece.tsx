import React, { useRef } from 'react';

export class Piece {
  private ctx: CanvasRenderingContext2D;
  private color;
  private shape: number[][];

  private x;
  private y;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.color = 'blue';
    this.shape = [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0]
    ];

    // Начальная позиция
    this.x = 3;
    this.y = 0;
  }
}
