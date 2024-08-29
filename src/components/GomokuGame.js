import React, { useState, useEffect, useRef } from 'react';
import '../css/GomokuGame.css'; // CSS 파일로 스타일링

const GomokuGame = () => {
    const boardSize = 15;
    const dotPositions = [];
    const [board, setBoard] = useState(Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)));
    const [gameOver, setGameOver] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('P');
    const [lastMove, setLastMove] = useState(null);
    const messageElement = useRef(null);
    const restartButton = useRef(null);
    const startButton = useRef(null);

    useEffect(() => {
        if (startButton.current) {
            startButton.current.style.display = 'block';
        }
    }, []);

    const createBoard = () => {
        return Array(boardSize).fill(null).map((_, row) => (
            Array(boardSize).fill(null).map((_, col) => (
                <div key={`${row}-${col}`} className="cell" data-row={row} data-col={col} onClick={() => onCellClick(row, col)}>
                    {renderDot(row, col)}
                    {renderStone(row, col)}
                </div>
            ))
        ));
    };

    const renderDot = (row, col) => {
        const position = row * boardSize + col + 1;
        if (dotPositions.includes(position)) {
            return <div className="dot"></div>;
        }
        return null;
    };

    const renderStone = (row, col) => {
        if (board[row][col] === 'P') {
            return <div className="stone black"></div>;
        } else if (board[row][col] === 'C') {
            return <div className="stone white"></div>;
        }
        return null;
    };

    const onCellClick = (row, col) => {
        if (!board[row][col] && !gameOver && currentPlayer === 'P') {
            makeMove(row, col);
        }
    };

    const makeMove = (row, col) => {
        const newBoard = board.map(r => r.slice());
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);

        const winningCells = checkWinner(row, col, currentPlayer);
        if (winningCells) {
            highlightWinningCells(winningCells);
            endGame(`${currentPlayer === 'P' ? 'User' : 'Computer'} wins!`);
            return;
        }

        setCurrentPlayer(currentPlayer === 'P' ? 'C' : 'P');
        setLastMove({ row, col });

        if (currentPlayer === 'C') {
            setTimeout(computerMove, 500);
        }
    };

    const computerMove = () => {
        if (gameOver) return;

        let bestMove = getBestMove();
        if (bestMove) {
            makeMove(bestMove.row, bestMove.col);
        }
    };

    const getBestMove = () => {
        let bestMove = null;
        let maxScore = -Infinity;

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (!board[row][col]) {
                    let attackScore = evaluateMove(row, col, 'C');
                    let defenseScore = evaluateMove(row, col, 'P');

                    let score = attackScore + defenseScore * 0.9;

                    if (score > maxScore) {
                        maxScore = score;
                        bestMove = { row, col };
                    }
                }
            }
        }

        return bestMove;
    };

    const evaluateMove = (row, col, player) => {
        let score = 0;
        const directions = [
            { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: -1 }
        ];

        for (const { x, y } of directions) {
            let count = 1;
            let open = 0;

            for (let i = 1; i < 6; i++) {
                const newRow = row + i * y;
                const newCol = col + i * x;
                if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize) {
                    break;
                }
                if (board[newRow][newCol] === player) count++;
                else if (board[newRow][newCol] === null) {
                    open++;
                    break;
                } else {
                    break;
                }
            }

            for (let i = 1; i < 6; i++) {
                const newRow = row - i * y;
                const newCol = col - i * x;
                if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize) {
                    break;
                }
                if (board[newRow][newCol] === player) count++;
                else if (board[newRow][newCol] === null) {
                    open++;
                    break;
                } else {
                    break;
                }
            }

            if (count >= 5) score += 1000000;
            else if (count === 4 && open === 2) score += 500000;
            else if (count === 4 && open === 1) score += 100000;
            else if (count === 3 && open === 2) score += 50000;
            else if (count === 3 && open === 1) score += 10000;
            else if (count === 2 && open === 2) score += 5000;
            else if (count === 2 && open === 1) score += 1000;
            else if (count === 1 && open === 2) score += 500;

            // Defensive scoring
            if (player === 'P') {
                if (count === 4 && open === 1) score += 90000;
                else if (count === 3 && open === 2) score += 40000;
            }
        }

        return score;
    };

    const checkWinner = (row, col, player) => {
        const directions = [
            { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: -1 }
        ];

        for (const { x, y } of directions) {
            let count = 1;
            let cells = [{ row, col }];

            for (let i = 1; i < 5; i++) {
                const newRow = row + i * y;
                const newCol = col + i * x;
                if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize || board[newRow][newCol] !== player) {
                    break;
                }
                count++;
                cells.push({ row: newRow, col: newCol });
            }

            for (let i = 1; i < 5; i++) {
                const newRow = row - i * y;
                const newCol = col - i * x;
                if (newRow < 0 || newRow >= boardSize || newCol < 0 || newCol >= boardSize || board[newRow][newCol] !== player) {
                    break;
                }
                count++;
                cells.push({ row: newRow, col: newCol });
            }

            if (count >= 5) {
                return cells;
            }
        }
        return null;
    };

    const highlightWinningCells = (cells) => {
        cells.forEach(({ row, col }) => {
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) cell.classList.add('winning-move');
        });
    };

    const endGame = (message) => {
        setGameOver(true);
        if (messageElement.current) {
            messageElement.current.textContent = message;
        }
        if (restartButton.current) {
            restartButton.current.style.display = 'block';
        }
    };

    const restartGame = () => {
        setBoard(Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)));
        setCurrentPlayer('P');
        setGameOver(false);
        setLastMove(null);
        if (messageElement.current) {
            messageElement.current.textContent = '';
        }
        if (restartButton.current) {
            restartButton.current.style.display = 'none';
        }
    };

    const startGame = () => {
        if (startButton.current) {
            startButton.current.style.display = 'none';
        }
        createBoard();
    };

    return (
        <div className="game-wrapper">
            <div className="game-container">
                <div id="board">{createBoard()}</div>
                <button id="start" ref={startButton} onClick={startGame}>START</button>
                <button id="restart" ref={restartButton} onClick={restartGame} style={{ display: 'none' }}>RESTART</button>
                <div id="message" ref={messageElement}></div>
            </div>
        </div>
    );
};

export default GomokuGame;
