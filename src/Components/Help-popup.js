import React from 'react'
import { Button } from 'react-bootstrap'

function HelpPopUp({onClose}) {
  return (
    <div className= "helpbox">
            <div className='helpcont'>
                <h3>How to Play Tic-Tac-Toe:</h3>
                <ul>
                    <li>Step 1: Press The Start Button</li>
                    <li>Step 2: A Menu will appear, choose the game mode you would like to play.</li> 
                    <li>Step 3: Choose whether you are play with X's or O's, then at the bottom of the screen either an X or an 0 will light up, indicating who is starting first.</li>
                    <li>Step 4: Now it is time to choose a spot on the 3 by 3 grid to place your symbol. Once you have done that, it is the other person's turn. You can only choose empty spaces.</li>
                    <li>Step 5: Finally in order to win you must a get 3 in a row, this can be done, veritcally, horizontally, or diagonally. </li>
                </ul>
            </div>
            <Button className='close' variant='danger' onClick={onClose}>Close Help</Button> 
      </div>
  )
}

export default HelpPopUp
