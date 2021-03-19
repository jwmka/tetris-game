import { Color } from '../enums/color';

export interface Coords {
  x: number;
  y: number;
}

class Piece {
  public ctx;
  public readonly color: Color;
  public readonly shape: number[][];
  public x: number;
  public y: number;

  constructor(ctx: any, color: Color, shape: number[][], x: number, y: number) {
    this.ctx = ctx;
    this.color = color;
    this.shape = shape;
    this.x = x;
    this.y = y;
  }

  public draw() {
    debugger
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, i) => {
      row.forEach((value, j) => {
        // this.j, this.i - левый верхний угол фигурки на игровом поле
        // j, i - координаты ячейки относительно матрицы фигурки (3х3)
        // this.j + j - координаты ячейки на игровом поле
        if (value > 0) {
          this.ctx.fillRect(this.x + j, this.y + i, 1, 1);
        }
      });
    });
  }

  public move({ x, y }: Coords) {
    this.x = x;
    this.y = y;
  }
}

export default Piece;
