function isHorizontal(grid) {
  const rowsNum = 6;
  const columnsNum = 7;

  let found = 0;
  let foundPiece = 0;

  for (let x = 0; x < rowsNum; x++) {
    for (let y = 0; y < columnsNum; y++) {
      let piece = grid[y][x];

      if (piece === 0) {
        found = 0;
        foundPiece = 0;
        continue;
      }

      if (piece !== foundPiece) {
        found = 1;
        foundPiece = piece;
        continue;
      }

      found++;

      if (found >= 4) {
        return true;
      }
    }
  }

  return false;
}

function isVertical(grid) {
  let found = 0;
  let foundPiece = 0;

  for (let column of grid) {
    for (let piece of column) {
      if (piece === 0) {
        found = 0;
        foundPiece = 0;
        continue;
      }

      if (piece !== foundPiece) {
        found = 1;
        foundPiece = piece;
        continue;
      }

      found++;

      if (found >= 4) {
        return true;
      }
    }
  }

  return false;
}

const matchReq = 4;
const numCols = 7;
const numRows = 6;

function isDiagonal(grid) {
  return isTopRight(grid) || isTopLeft(grid);
}

function isTopLeft(grid) {

  let found;
  let foundPiece;
  let col;

  for (let baseCol = matchReq - numRows; baseCol < numCols - (matchReq - 1); baseCol++) {

    found = 0;
    foundPiece = 0;
    col = baseCol - 1;

    for (let row = 0; row < numRows; row++) {
      col++;

      if (col >= 0 && col < numCols && row < numRows) {
        let piece = grid[col][row];

        if(!piece) {
          found = 0;
        }

        if (!!piece && (piece === foundPiece || !foundPiece) && (++found) === matchReq) {
          return true;
        }

        foundPiece = piece;
      }
    }
  }

  return false;
}


function isTopRight(grid) {
  let found;
  let foundPiece;
  let col;

  for (let baseCol = matchReq - numRows; baseCol < numCols - (matchReq - 1); baseCol++) {
      found = 0;
      foundPiece = 0;
      col = baseCol - 1;

      for (let row = numRows - 1; row >= 0; row--) {
        col++;

        if (col >= 0 && col < numCols && row < numRows) {
          let piece = grid[col][row];

          if(!piece) {
            found = 0;
          }

          if (!!piece && (piece === foundPiece || !foundPiece) && (++found) === matchReq) {
            return true;
          }

          foundPiece = piece;
      }
    }
  }

  return false;
}

function matches(grid) {
  return isHorizontal(grid) || isVertical(grid) || isDiagonal(grid);
}

export default matches;

