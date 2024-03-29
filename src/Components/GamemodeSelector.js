import React from 'react'

const GamemodeSelector = ( {onClick, playerSelect, firsttothree} ) => {

  const handleSingleMatch = () => {
    onClick(false)
    playerSelect()
    firsttothree(false)
  }

  const handleFirstToThree = () => {
    onClick(true)
    playerSelect()
  }

  return (
    <div className= "helpbox">
            <div className='helpcont'>
                <h3>Select a Gamemode:</h3>
                <div className='gamemode'>
                <button className='gm' onClick={handleSingleMatch}>Single Match</button>
                  <p>Player vs. AI</p>  
                </div>
                <div className='gamemode'>
                <button className='gm' onClick={handleFirstToThree}>Best of Five</button>
                  <p>Player vs. AI</p>  
                </div>
            </div> 
      </div>
  )
}

export default GamemodeSelector
