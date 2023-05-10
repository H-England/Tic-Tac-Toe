import React from 'react'

const GamemodeSelector = ( {onClick, playerSelect} ) => {
  return (
    <div className= "helpbox">
            <div className='helpcont'>
                <h3>Please select a gamemode:</h3>
                <div className='gamemode'>
                  <button className='gm' onClick={playerSelect}>Single Match</button>
                  <p>Player vs. Player</p>  
                </div>
                <div className='gamemode'>
                <button className='gm' onClick={playerSelect}>First to 3 Wins</button>
                  <p>Player vs. Player</p>  
                </div>
                <div className='gamemode'>
                <button className='gm' onClick={playerSelect}>Single Match</button>
                  <p>Player vs. Ai</p>  
                </div>
                <div className='gamemode'>
                <button className='gm' onClick={playerSelect}>First to 3 Wins</button>
                  <p>Player vs. Ai</p>  
                </div>
            </div> 
      </div>
  )
}

export default GamemodeSelector
