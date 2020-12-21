import React, { useCallback } from 'react';

import Board from './components/board';
import './App.css';

function App() {
  const play = useCallback(() => {}, []);

  return (
    <div className="grid">
      <Board />
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

export default App;
