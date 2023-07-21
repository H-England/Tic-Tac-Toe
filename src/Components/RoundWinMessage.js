import React from 'react';
import { Button } from 'react-bootstrap';

const RoundWinMessage = ({ onClick, currentPlayer, previousPlayer }) => {
    const playerName = previousPlayer === "X" ? "Player X" : "Player O";
  
    return (
      <div className="helpbox">
        <div className="helpcont">
          <h3>Well done {playerName}, you have won the Round!</h3>
          <Button variant="danger" onClick={onClick}>
             Close 
          </Button>
        </div>
      </div>
    );
  };
  
  export default RoundWinMessage;