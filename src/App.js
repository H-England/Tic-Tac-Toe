import './App.css';
import { useState, useEffect } from 'react';
import HelpPopUp from './Components/Help-popup';
import Slot from './Components/Slot';
import PlayerPopup from './Components/Player-Popup';
import GamemodeSelector from './Components/GamemodeSelector';
import { WinCondition } from './WinConditions';
import WinMessage from './Components/WinMessage';

function App() {
  const [showHelp, setShowHelp] = useState(false)
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  const [showGame, setShowGame] = useState(false)
  const [playable, setPlayable] = useState(true)
  const [player1, setPlayer1] = useState("")
  const [player2, setPlayer2] = useState("")
  const [showPlayer, setShowPlayer] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState("")
  const [finish, setFinish] = useState(false)
  const [winner, setWinner] = useState("")
  const [isDraw, setIsDraw] = useState(true)

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
    setBoard(["", "", "", "", "", "", "", "", ""])
    setPlayable(true)
  }
  const winHandler = () => {
    setFinish(!finish)
  }

  const helpHandler = () => {
    setShowHelp(!showHelp)
  }

  const playerHandler = () => {
    setShowGame(!showGame)
    setShowPlayer(!showPlayer)

  }

  const chooseSlot = (slot) => {
    if (board[slot] === "" && playable) {
      const newBoard = [...board]
      newBoard[slot] = currentPlayer
      setBoard(newBoard)
      setCurrentPlayer((prevPlayer) => (prevPlayer === player1 ? player2 : player1))
      winCheck()
    }
  };

  useEffect(() => {
    setCurrentPlayer(player1)
  }, [player1])

  const winCheck = () => {
    let draw = true;
    
    WinCondition.forEach((currPattern) => {
      const [a, b, c] = currPattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const winner = currentPlayer === player1 ? player2 : player1;
        setPlayable(false);
        setFinish(true);
        setWinner(winner);
        draw = false;
      }
    });
  
    if (draw && board.every((value) => value !== "")) {
      setFinish(true);
      setPlayable(false);
      setIsDraw(true); // Update the isDraw state variable here
    } else {
      setIsDraw(false); // Update the isDraw state variable here
    }
  };
  

  useEffect(() => {
    if (currentPlayer !== "") {
      winCheck();
    }
  }, [board]);


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
          <Slot value={board[3]} chooseSlot={() => chooseSlot(3)} />
          <Slot value={board[4]} chooseSlot={() => chooseSlot(4)} />
          <Slot value={board[5]} chooseSlot={() => chooseSlot(5)} />
          </div>
          <div className='row'>
          <Slot value={board[6]} chooseSlot={() => chooseSlot(6)} />
          <Slot value={board[7]} chooseSlot={() => chooseSlot(7)} />
          <Slot value={board[8]} chooseSlot={() => chooseSlot(8)} />
          </div>
        </div>

        <div>
          {finish && <WinMessage onClick={winHandler} winner={winner} draw={isDraw}/>}
          {showGame && <GamemodeSelector onClick={gameHandler} playerSelect={playerHandler}/>}
          {showPlayer && <PlayerPopup onClick={playerHandler} playerX={setPlayerX} playerO={setPlayerO} />}
          {showHelp && <HelpPopUp onClose={helpHandler}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
