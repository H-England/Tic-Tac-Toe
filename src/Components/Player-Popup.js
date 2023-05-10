import React from 'react'



const PlayerPopup = ({ onClick, playerX, playerO }) => {
  return (
    <div className= "helpbox">
            <div className='helpcont'>
                <h3>Player 1, Please Choose your symbol:</h3>
                <button className='symbolBtnX' onClick={playerX}>X</button>
                <button className='symbolBtnO' onClick={playerO}>O</button>
            </div> 
      </div>
  )
}

export default PlayerPopup
