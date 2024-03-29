export function calculateBestMove(board, depth, maximizingPlayer, currentSymbol, player1Symbol, player2Symbol, alpha = -Infinity, beta = Infinity) {
  const opponentSymbol = currentSymbol === player1Symbol ? player2Symbol : player1Symbol;

  const difficulty = 100;

  if (checkWin(board)) {
      if (maximizingPlayer) {
          return { score: -difficulty + depth };
      } else {
          return { score: difficulty - depth };
      }
  } else if (checkDraw(board)) {
      return { score: 0 };
  }

  const moves = [];

  for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
          const move = {};
          move.index = i;

          board[i] = currentSymbol;
          const result = calculateBestMove(board, depth + 1, !maximizingPlayer, opponentSymbol, player1Symbol, player2Symbol, alpha, beta);
          move.score = result.score;

          board[i] = '';
          moves.push(move);

          if (maximizingPlayer) {
              alpha = Math.max(alpha, move.score);
          } else {
              beta = Math.min(beta, move.score);
          }

          if (beta <= alpha) {
              break;
          }
      }
  }

  let bestMove;
  if (maximizingPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
          }
      }
  } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
          }
      }
  }

  return moves[bestMove];
}

export function checkWin(board) {
  const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return true;
      }
  }

  return false;
}

function checkDraw(board) {
  return !board.includes('');
}