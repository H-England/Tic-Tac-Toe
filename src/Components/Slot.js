import React from 'react'
import "../App.css"

function Slot( {value, chooseSquare} ) {
  return (
    <div className='slot' onClick={chooseSquare}>
        {value}
    </div>
  )
}

export default Slot
