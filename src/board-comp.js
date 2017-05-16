import React from 'react'
import Cell from './cell'

const Board = ({ board, addPiece }) => {
  const cells = board.grid.map((column, y) => (
    <div key={y}>
      {
        column.map((cell, x) => (
          <Cell key={x} x={x} y={y}
            cell={cell.toString()}
            nextPlayer={board.nextPlayer}
            addPiece={addPiece} />
          )
        )
      }
    </div>
  ))


  return (
    <div className='container'>
      {cells}
    </div>
  )
}

export default Board
