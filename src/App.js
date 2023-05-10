import './App.css';
import { useState, useEffect } from 'react';
import HelpPopUp from './Components/Help-popup';
import Slot from './Components/Slot';
import PlayerPopup from './Components/Player-Popup';
import GamemodeSelector from './Components/GamemodeSelector';

function App() {
  const [showHelp, setShowHelp] = useState(false)
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  const [showGame, setShowGame] = useState(false)
  const [playable, setPlayable] = useState(false)
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState("")

  const playerSymbol = ["X", "O"]

  const setPlayerX = () => {
    setPlayer1(playerSymbol[0])
    setPlayer2(playerSymbol[1])
    setShowPlayer(!showPlayer)   
  }
  const setPlayerO = () => {
    setPlayer1(playerSymbol[1])
    setPlayer2(playerSymbol[0])
    setShowPlayer(!showPlayer)
  }

  const gameHandler = () => {
    setShowGame(!showGame)
  }

  const helpHandler = () => {
    setShowHelp(!showHelp)
  }

  const playerHandler = () => {
    setShowGame(!showGame)
    setShowPlayer(!showPlayer)

  }

  const chooseSlot = (slot) => {
    if (board[slot] === "") {
      const newBoard = [...board];
      newBoard[slot] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer((prevPlayer) => (prevPlayer === player1 ? player2 : player1));
    }
  };

  useEffect(() => {
    setCurrentPlayer(player1)
  }, [player1])


  return (
      <div className='App-body'>
        <div className='header'>
          <h1>Tic Tac Toe</h1>
          <ul>
            <li className='start' onClick={gameHandler} >Start / Restart</li>
            <li className='help' onClick={helpHandler}>Help</li>
          </ul>
        </div>
        <div className="App">
        <div className='board'>
          <div className='row'>
          <Slot value={board[0]} chooseSlot={() => chooseSlot(0)} />
          <Slot value={board[1]} chooseSlot={() => chooseSlot(1)} />
          <Slot value={board[2]} chooseSlot={() => chooseSlot(2)} />

          </div>
          <div className='row'>
          </div>
          <div className='row'>
          </div>
        </div>

        <div>
          {showGame && <GamemodeSelector onClick={gameHandler} playerSelect={playerHandler}/>}
          {showPlayer && <PlayerPopup onClick={playerHandler} playerX={setPlayerX} playerO={setPlayerO} />}
          {showHelp && <HelpPopUp onClose={helpHandler}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
