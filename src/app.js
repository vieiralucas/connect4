import React, { Component } from 'react';
import _ from 'lodash'
import Board from './board';

import BoardComponent from './board-comp';

class App extends Component {
  constructor() {
    super();

    this.state = {
      board: new Board()
    };
  }

  handleGameRestart() {
    this.setState({
      board: new Board()
    });
  }

  handleGameAddPiece(columnIndex, piece) {
    if (!this.state.board.isActive) {
      return;
    }

    this.state.board.addPiece(columnIndex, piece);
    this.setState({
      board: this.state.board
    });

    setTimeout(() => {
      const mM = minMax(this.state.board, 3, -Infinity, Infinity, true, [])
      if (mM.path.length)
        this.state.board.addPiece(mM.path[mM.path.length - 1], 'blue')
      this.setState({
        board: this.state.board
      });
    }, 0)
  }

  render() {
    return (
      <BoardComponent board={this.state.board} addPiece={this.handleGameAddPiece.bind(this)} />
    );
  }
}

function minMax(node, depth, alpha, beta, maximizing, path) {
  if (depth === 0 || node.didSomebodyWin()) {
    return {
      v: node.score(),
      path
    }
  }

  const moves = expand(node)
  let v
  let newPath

  if (maximizing) {
    v = -Infinity
    for (let i = 0; i < moves.length; i++) {
      const column = moves[i]
      const child = executeMove(node, column, 'blue')
      const mM = minMax(child, depth - 1, alpha, beta, false, [...path, column])
      newPath = mM.path
      v = Math.max(v, mM.v)
      alpha = Math.max(alpha, v)
      if (beta <= alpha) {
        break
      }
    }
  } else {
    v = Infinity
    for (let i = 0; i < moves.length; i++) {
      const column = moves[i]
      const child = executeMove(node, column, 'red')
      const mM = minMax(child, depth - 1, alpha, beta, true, [...path, column])
      newPath = mM.path
      v = Math.min(v, mM.v)
      beta = Math.min(beta, v)
      if (beta <= alpha) {
        break
      }
    }
  }

  return {
    v,
    path: newPath
  }
}

// given a board a column and a player return new board
function executeMove(board, move, player) {
  const newBoard = _.cloneDeep(board)

  newBoard.addPiece(move, player)
  return newBoard
}

// returns available columns
function expand(board) {
  let moves = []
  for (let i = 0; i < board.grid.length; i++) {
    if (board.grid[i][0] === 0) {
      moves.push(i)
    }
  }

  return moves
}

export default App
