import './App.css';
import { useState, useEffect } from 'react';
import HelpPopUp from './Components/Help-popup';
import Slot from './Components/Slot';
import PlayerPopup from './Components/Player-Popup';
import GamemodeSelector from './Components/GamemodeSelector';
import { WinCondition } from './WinConditions';
import WinMessage from './Components/WinMessage';
import RoundWinMessage from './Components/RoundWinMessage';
import { calculateBestMove } from './Components/Algorithm';
import { checkWin } from './Components/Algorithm';



function App() {
  const [showHelp, setShowHelp] = useState(false);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [showGame, setShowGame] = useState(false);
  const [playable, setPlayable] = useState(true);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [finish, setFinish] = useState(false);
  const [winner, setWinner] = useState("");
  const [isDraw, setIsDraw] = useState(true);
  const [isFirstToThree, setIsFirstToThree] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [roundMessage, setRoundMessage] = useState(false);
  const [previousPlayer, setPreviousPlayer] = useState("");
  const [isAITurn, setIsAITurn] = useState(false); 

  const playerSymbol = ["X", "O"];

  const setPlayerX = () => {
    setPlayer1(playerSymbol[0])
    setPlayer2(playerSymbol[1])
    setShowPlayer(!showPlayer)
  };

  const setPlayerO = () => {
    setPlayer1(playerSymbol[1])
    setPlayer2(playerSymbol[0])
    setShowPlayer(!showPlayer)
  };

  const gameHandler = (isFirstToThree) => {
    setShowGame(!showGame);
    setBoard(["", "", "", "", "", "", "", "", ""])
    setPlayable(true);
    setIsFirstToThree(isFirstToThree)
    setPlayer1Score(0)
    setPlayer2Score(0)
  };

  const roundHandler = () => {
    setRoundMessage(!roundMessage)
    setWinner(currentPlayer)
  };

  const winHandler = () => {
    setFinish(!finish)
  };

  const helpHandler = () => {
    setShowHelp(!showHelp)
  };

  const playerHandler = () => {
    setShowGame(!showGame)
    setShowPlayer(!showPlayer)
  };

  const chooseSlot = (slot) => {
    if (board[slot] === "" && playable && currentPlayer === player1 && !isAITurn) {
      const newBoard = [...board];
      newBoard[slot] = currentPlayer;
      setBoard(newBoard);
      setPreviousPlayer(currentPlayer);
      setCurrentPlayer(player2);
      setIsAITurn(true);
    }
  
    if (isAITurn && currentPlayer === player2) {
      setTimeout(() => {
        const bestMove = calculateBestMove(board, 0, true);
        const aiSlot = bestMove.index;
  
        if (board[aiSlot] === "") {
          const newBoard = [...board];
          newBoard[aiSlot] = currentPlayer;
          setBoard(newBoard);
          setPreviousPlayer(currentPlayer);
          setCurrentPlayer(player1);
          setIsAITurn(false);
        }
      }, 100);
    }
  
    if (checkWin(board)) {
      const winner = currentPlayer === player1 ? player2 : player1;
      updateScores(winner);
    } else if (board.every((value) => value !== "")) {
      setFinish(true);
      setWinner("draw");
      setPlayable(true);
      setBoard(Array(9).fill(""));
      setCurrentPlayer(player1);
      checkWin(board);
    }
  };
  
  useEffect(() => {
    if (currentPlayer !== "") {
      winCheck();
    }
  }, [currentPlayer]);

  
  useEffect(() => {
    setCurrentPlayer(player1)
  }, [player1])

  const winCheck = () => {
    WinCondition.forEach((currPattern) => {
      const [a, b, c] = currPattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        const winner = currentPlayer === player1 ? player2 : player1;
        setIsDraw(false);
        if (isFirstToThree) {
          updateScores(winner);
        } else {
          setFinish(true);
          setWinner(winner);
          setPlayable(false);
        }
      }
    });
  
    if (!finish && board.every((value) => value !== "")) {
      setFinish(true);
      setWinner("draw");
      setPlayable(true);
      setBoard(Array(9).fill(""));
      setCurrentPlayer(player1);
      setIsDraw(true);
    }
  };
  
  const updateScores = (winner) => {
    if (winner === player1) {
      setPlayer1Score((prevScore) => prevScore + 1);
      if (player1Score + 1 === 3 && isFirstToThree) {
        setFinish(true);
        setShowGame(false);
        setWinner(player1);
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setPlayer1Score(0);
        setPlayer2Score(0);
        setPlayable(true);
        setCurrentPlayer("")
      } else {
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setRoundMessage(true);
      }
    } else if (winner === player2) {
      setPlayer2Score((prevScore) => prevScore + 1);
      if (player2Score + 1 === 3 && isFirstToThree) {
        setFinish(true);
        setShowGame(false);
        setWinner(player2);
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setPlayer1Score(0);
        setPlayer2Score(0);
        setPlayable(true);
        setCurrentPlayer("")
      } else {
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setRoundMessage(true);
      }
    } else if (winner === "draw") {
      setBoard(["", "", "", "", "", "", "", "", ""]);
      setRoundMessage(true);
    }
  };

  useEffect(() => {
    if (isAITurn) {
      setTimeout(() => {
        const bestMove = calculateBestMove(board, 0, true)
        chooseSlot(bestMove.index)
        setIsAITurn(false)
      }, 500)
    }
  }, [isAITurn])

  return (
    <div className='App-body'>
      <div className='header'>
        <h1>Tic Tac Toe</h1>
        <ul>
          <li className='start' onClick={gameHandler}>
            Start / Restart
          </li>
          <li className='help' onClick={helpHandler}>
            How to Play
          </li>
        </ul>
        <div className='game-info'>
          <p>Game Mode: {isFirstToThree ? "First to 3 Wins" : "Single Match"}</p>
          <p>Player 1's Score: {player1Score}</p>
          <p>Player 2's Score: {player2Score}</p>
          <p>It's {currentPlayer} turn</p>
        </div>
      </div>
      <div className='App'>
        <div className='board'>
          <div className='row'>
            <Slot value={board[0]} chooseSlot={() => chooseSlot(0)} disabled={isAITurn} />
            <Slot value={board[1]} chooseSlot={() => chooseSlot(1)} disabled={isAITurn} />
            <Slot value={board[2]} chooseSlot={() => chooseSlot(2)} disabled={isAITurn} />
          </div>
          <div className='row'>
            <Slot value={board[3]} chooseSlot={() => chooseSlot(3)} disabled={isAITurn} />
            <Slot value={board[4]} chooseSlot={() => chooseSlot(4)} disabled={isAITurn} />
            <Slot value={board[5]} chooseSlot={() => chooseSlot(5)} disabled={isAITurn} />
          </div>
          <div className='row'>
            <Slot value={board[6]} chooseSlot={() => chooseSlot(6)} disabled={isAITurn} />
            <Slot value={board[7]} chooseSlot={() => chooseSlot(7)} disabled={isAITurn} />
            <Slot value={board[8]} chooseSlot={() => chooseSlot(8)} disabled={isAITurn} />
          </div>
        </div>

        <div>
          {roundMessage && (
            <RoundWinMessage
              onClick={roundHandler}
              currentPlayer={currentPlayer}
              previousPlayer={previousPlayer}
            />
          )}
          {finish && <WinMessage onClick={winHandler} winner={winner} draw={isDraw} />}
          {showGame && <GamemodeSelector onClick={gameHandler} playerSelect={playerHandler} firsttothree={setIsFirstToThree} />}
          {showPlayer && <PlayerPopup onClick={playerHandler} playerX={setPlayerX} playerO={setPlayerO} />}
          {showHelp && <HelpPopUp onClose={helpHandler} />}
        </div>
      </div>
    </div>
  );
}

export default App;


