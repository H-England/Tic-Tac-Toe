import React from 'react'
import { Button } from 'react-bootstrap'

const WinMessage = ({ onClick, winner, draw }) => {

    if(draw){
        return(
            <div className= "helpbox">
                <div className='helpcont'>
                    <h3>That is a Draw!</h3>
                    <Button variant='danger' onClick={onClick}>Close</Button>
                </div> 
            </div>
        )
    }
  return (
    <div className= "helpbox">
            <div className='helpcont'>
                <h3>Well done {winner}, You have won!</h3>
                <Button variant='danger' onClick={onClick}>Close</Button>
            </div> 
      </div>
  )
}

export default WinMessage
