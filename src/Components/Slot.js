import React from 'react'
import "../App.css"

function Slot( {value, chooseSlot} ) {
  return (
    <div className='slot' onClick={chooseSlot}>
        {value}
    </div>
  )
}

export default Slot
