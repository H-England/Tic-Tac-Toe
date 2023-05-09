import './App.css';
import { useState, useEffect } from 'react';
import HelpPopUp from './Components/Help-popup';
import Slot from './Components/Slot';

function App() {
  const [showHelp, setShowHelp] = useState(false)
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])

  const helpHandler = () => {
    setShowHelp(!showHelp)
  }


  return (
      <div className='App-body'>
        <div className='header'>
          <h1>Tic Tac Toe</h1>
          <ul>
            <li className='start' >Start</li>
            <li className='help' onClick={helpHandler}>Help</li>
          </ul>
        </div>
        <div className="App">
        <div className='board'>
          <div className='row'>
            <Slot 
              value={board[0]} 
              chooseSquare={() => {
                alert(0)}} />
            <Slot 
              value={board[1]} 
              chooseSquare={() => {
                alert(0)}} />
            <Slot 
              value={board[2]} 
              chooseSquare={() => {
                alert(0)}} />
          </div>
          <div className='row'>
            <Slot 
                value={board[0]} 
                chooseSquare={() => {
                  alert(0)}} />
              <Slot 
                value={board[1]} 
                chooseSquare={() => {
                  alert(0)}} />
              <Slot 
                value={board[2]} 
                chooseSquare={() => {
                  alert(0)}} />
          </div>
          <div className='row'>
            <Slot 
                value={board[0]} 
                chooseSquare={() => {
                  alert(0)}} />
              <Slot 
                value={board[1]} 
                chooseSquare={() => {
                  alert(0)}} />
              <Slot 
                value={board[2]} 
                chooseSquare={() => {
                  alert(0)}} />
          </div>
        </div>

        <div>
          {showHelp && <HelpPopUp onClose={helpHandler}/>}
        </div>
      </div>
    </div>
  );
}

export default App;
