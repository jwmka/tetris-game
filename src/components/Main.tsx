import React, { useCallback, useEffect, useRef, useState } from 'react';

import Board from './Board';
import Piece, { Coords } from '../classes/piece';
import '../index.css';
import { COLS, ROWS } from '../constants';
import { Color } from '../enums/color';
import { moves } from '../utils/moves';

function Main() {
  const boardRef = useRef<HTMLCanvasElement>(null);

  const [ grid, setGrid ] = useState<any[][]>([]);
  const [ pieces, setPieces ] = useState([]);
  const [ activePiece, setActivePiece ] = useState<Piece>();

  // Сбрасывает игровое поле перед началом новой игры
  const reset = useCallback(() => {
    setGrid(getEmptyBoard());
  }, [ setGrid ]);

  // Создает матрицу нужного размера, заполненную нулями
  const getEmptyBoard = () => {
    return Array.from(
      {length: ROWS}, () => Array(COLS).fill(0)
    );
  };

  // -------------------------------------------------------------------------------------------------------------------

  const insideWall = useCallback((x: number) => x >= 0 && x <= COLS, []);
  const aboveFloor = useCallback((y: number) => y >= 0 && y <= ROWS, []);
  const notOccupied = useCallback((x: number, y: number) => grid[y] && grid[x][y] === 0, [grid]);
  const valid = useCallback((p: Piece) => {
    return p.shape.every((row: number[], indexY: number) => {
      return row.every((value, indexX) => {
        const x = p.x + indexX;
        const y = p.y + indexY;

        return value === 0 ||
          (insideWall(x) && aboveFloor(y) && notOccupied(x, y));
      })
    })
  }, [insideWall, aboveFloor, notOccupied]);

  // -------------------------------------------------------------------------------------------------------------------

  const play = useCallback(() => {
    if (!boardRef.current) {
      return;
    }

    const ctx = boardRef.current.getContext('2d');

    reset();

    const shape = [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0]
    ];

    debugger
    let piece = new Piece(ctx, Color.BLUE, shape, 3, 0);
    debugger
    piece.draw();

    // make it active
    setActivePiece(piece);
  }, [ reset, boardRef ]);

  const onKeyDown = useCallback((event, ctx) => {
    if (moves[event.keyCode]) {
      // отмена действий по умолчанию
      event.preventDefault();

      console.log('activePiece >', activePiece);
      if (activePiece) {
        // получение новых координат фигурки
        let newActivePiece = moves[event.keyCode](activePiece);
        console.log('newActivePiece >', newActivePiece);

        // проверка нового положения
        if (valid(newActivePiece as any)) {
          // реальное перемещение фигурки, если новое положение допустимо
          activePiece.move(newActivePiece);

          // стирание старого отображения фигуры на холсте
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          activePiece.draw();
        }
      }
    }
  }, [activePiece, valid]);

  useEffect(() => {
    if (!boardRef.current) {
      return;
    }

    const ctx = boardRef.current.getContext('2d');

    if (!ctx) {
      return;
    }

    document.addEventListener('keydown', event => onKeyDown(event, ctx));

    return () => document.removeEventListener('keydown', event => onKeyDown(event, ctx));
  }, [boardRef, onKeyDown]);

  // -------------------------------------------------------------------------------------------------------------------

  return (
    <div className="grid">
      <Board ref={boardRef} />
      <div className={'rightColumn'}>
        <div>
          <h1>TETRIS</h1>
          <p>Score: <span id={'score'}>0</span></p>
          <p>Lines: <span id={'lines'}>0</span></p>
          <p>Level: <span id={'level'}>0</span></p>
          <canvas id={'next'} className={'next'} />
        </div>
        <button onClick={play} className={'playButton'}>Play</button>
      </div>
    </div>
  );
}

export default Main;
