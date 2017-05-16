import React from 'react'
import classnames from 'classnames'

const Cell = ({ y, cell, nextPlayer, addPiece }) => {
  const handleAddPiece = () => {
    addPiece(y, nextPlayer)
  }

  const cellClasses = classnames({
    'cell': true,
    'cell-red': cell === 'red',
    'cell-blue': cell === 'blue'
  })

  return (
    <button className={cellClasses} onClick={handleAddPiece}>
    </button>
  )
}

export default Cell
