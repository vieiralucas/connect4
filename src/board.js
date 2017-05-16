import matches from './matches';

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
    ];

    this.inserts = 0;

    this.nextPlayer = refreshPlayer(this.inserts);

    this.isActive = true;
  }


  addPiece(columnIndex, piece) {
    let column = this.grid[columnIndex];
    let cellIndex = -1;

    column.forEach((columnPiece, i) => {
      if (columnPiece === 0) {
        cellIndex = i;
      }
    });

    if (cellIndex >= 0) {
      column[cellIndex] = piece;

      this.inserts++;

      this.nextPlayer = refreshPlayer(this.inserts);

      if (this.didSomebodyWin()) {
        this.isActive = false;
      }
    }
  }

  didSomebodyWin() {
    return matches(this.grid);
  }

  scorePoint(x, y, dx, dy) {
    let humanScore = 0
    let iaScore = 0

    for (let i = 0; i < 4; i++) {
        if (x < 0 || x > this.grid.length - 1 || y < 0 || y > this.grid[x].length - 1) {
          break
        }

        const value = this.grid[x][y]

        if (value === 'blue') {
          iaScore++
        } else if (value === 'red') {
          humanScore++
        }

        y += dy
        x += dx
    }

    if (humanScore === 4) {
      return -10000
    } else if (iaScore === 4) {
      return 10000
    }

    return iaScore
  }

  score() {
    let score = 0
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        const verticalScore = this.scorePoint(x, y, 0, 1)
        if (Math.abs(verticalScore) === 10000)
          return verticalScore

        const horizontalScore = this.scorePoint(x, y, 1, 0)
        if (Math.abs(horizontalScore) === 10000)
          return verticalScore

        const diag1Score = this.scorePoint(x, y, 1, 1)
        if (Math.abs(diag1Score) === 10000)
          return verticalScore

        const diag2Score = this.scorePoint(x, y, -1, 1)
        if (Math.abs(diag2Score) === 10000)
          return verticalScore

        score += verticalScore + horizontalScore + diag1Score + diag2Score
      }
    }

    return score
  }
}


let availablePlayers = [
  'red',
  'blue'
];

function refreshPlayer(inserts) {
  return availablePlayers[inserts % 2];
}

export default Board
