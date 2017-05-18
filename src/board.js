class Board {
  constructor() {
    this.grid = [
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0 ]
    ]

    this.inserts = 0

    this.nextPlayer = Math.random() > 0.5 ? 'red' : 'blue'

    this.isActive = true
  }


  addPiece(columnIndex, piece) {
    let column = this.grid[columnIndex]
    let cellIndex = -1

    column.forEach((columnPiece, i) => {
      if (columnPiece === 0) {
        cellIndex = i
      }
    })

    if (cellIndex >= 0) {
      column[cellIndex] = piece

      this.inserts++

      this.nextPlayer = nextPlayer(this.nextPlayer)

      if (this.isOver()) {
        this.isActive = false
      }
    }
  }

  isOver() {
    const walk = (x, y, dx, dy) => {
      const curr = this.grid[x][y]

      if (curr === 0) {
        return false
      }

      for (let i = 1; i < 4; i++) {
        const next = (this.grid[x + (i * dx)] || [])[y + (i * dy)]

        if (next !== curr) {
          return false
        }
      }

      return true
    }

    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        const left = () => walk(x, y, -1, 0)
        const right = () => walk(x, y, 1, 0)
        const up = () => walk(x, y, 0, -1)
        const down = () => walk(x, y, 0, -1)
        const diagUpLeft = () => walk(x, y, -1, -1)
        const diagUpRight = () => walk(x, y, 1, -1)
        const diagDownLeft = () => walk(x, y, -1, 1)
        const diagDownRight = () => walk(x, y, 1, 1)

        if (left() || right() || up() || down() || diagUpLeft() || diagUpRight() || diagDownLeft() || diagDownRight()) {
          return true
        }
      }
    }

    return false
  }

  score() {
    const horizontal = (x, y) => {
      const pos = this.grid[x][y]
      const previous = (this.grid[x - 1] || [])[y]
      let friends = 0
      for (let i = 0; i < 4; i++) {
        const curr = (this.grid[x + i] || [])[y]
        if (curr === pos) {
          friends++
        } else if (curr !== 0) {
          // enemy found, this is useless
          break
        }
      }

      if (friends === 3) {
        return previous === 0 ? 10000 : 100
      } else if (friends === 4) {
        return 100000
      }

      return 0
    }

    const vertical = (x, y) => {
      const pos = this.grid[x][y]
      const previous = this.grid[x][y - 1]
      let friends = 0
      for (let i = 0; i < 4; i++) {
        const curr = this.grid[x][y + i]
        if (curr === pos) {
          friends++
        } else if (curr !== 0) {
          // enemy found, this is useless
          break
        }
      }

      if (friends === 3) {
        return previous === 0 ? 10000 : 100
      } else if (friends === 4) {
        return 100000
      }

      return 0
    }

    const diag1 = (x, y) => {
      const pos = this.grid[x][y]
      const previous = (this.grid[x - 1] || [])[y - 1]
      let friends = 0
      for (let i = 0; i < 4; i++) {
        const curr = (this.grid[x - i] || [])[y + i]
        if (curr === pos) {
          friends++
        } else if (curr !== 0) {
          // enemy found, this is useless
          break
        }
      }

      if (friends === 3) {
        return previous === 0 ? 10000 : 100
      } else if (friends === 4) {
        return 100000
      }

      return 0
    }

    const diag2 = (x, y) => {
      const pos = this.grid[x][y]
      const previous = (this.grid[x + 1] || [])[y - 1]
      let friends = 0
      for (let i = 0; i < 4; i++) {
        const curr = (this.grid[x + i] || [])[y + i]
        if (curr === pos) {
          friends++
        } else if (curr !== 0) {
          // enemy found, this is useless
          break
        }
      }

      if (friends === 3) {
        return previous === 0 ? 10000 : 100
      } else if (friends === 4) {
        return 100000
      }

      return 0
    }

    let score = 0
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        const pos = this.grid[x][y]

        if (pos === 0) {
          continue
        }

        score += (horizontal(x, y) + vertical(x, y) + diag1(x, y) + diag2(x, y)) * (pos === 'blue' ? 1 : -1)
      }
    }

    return score / (this.inserts || 1)
  }
}


function nextPlayer(curr) {
  if (curr === 'red') {
    return 'blue'
  }

  return 'red'
}

export default Board
