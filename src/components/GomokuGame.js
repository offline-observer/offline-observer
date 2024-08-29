import React, { useState, useEffect, useRef } from 'react';
import '../css/GomokuGame.css'; // 스타일을 위한 CSS 임포트

const GomokuGame = () => {
    const boardSize = 15;
    const [board, setBoard] = useState(Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)));
    const [gameOver, setGameOver] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState('P');
    const [lastMove, setLastMove] = useState(null);
    const [message, setMessage] = useState('');
    const boardRef = useRef(null);
    const messageRef = useRef(null);
    const restartButtonRef = useRef(null);
    const startButtonRef = useRef(null);

    useEffect(() => {
        startButtonRef.current.style.display = 'block';
    }, []);

    const createBoard = () => {
        const newBoard = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
        setBoard(newBoard);
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

        setLastMove({ row, col });

        const winningCells = checkWinner(row, col, currentPlayer);
        if (winningCells) {
            highlightWinningCells(winningCells);
            endGame(`${currentPlayer === 'P' ? 'User' : 'Computer'} wins!`);
            return;
        }

        const nextPlayer = currentPlayer === 'P' ? 'C' : 'P';
        setCurrentPlayer(nextPlayer);

        if (nextPlayer === 'C') {
            setTimeout(() => computerMove(), 500);
        }
    };

    const computerMove = () => {
        if (gameOver) return;

        let bestMove = getBestMove();
        if (bestMove) {
            makeMove(bestMove.row, bestMove.col);
        }
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
        // 예시: 승리한 돌의 배경색을 노란색으로 변경
        cells.forEach(({ row, col }) => {
            const cell = boardRef.current.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add('winning-move');
            }
        });
    };

    const endGame = (message) => {
        setGameOver(true);
        setMessage(message);
        if (restartButtonRef.current) {
            restartButtonRef.current.style.display = 'block';
        }
    };

    const restartGame = () => {
        createBoard();
        setCurrentPlayer('P');
        setGameOver(false);
        setLastMove(null);
        setMessage('');
        if (restartButtonRef.current) {
            restartButtonRef.current.style.display = 'none';
        }
    };

    const startGame = () => {
        createBoard();
        if (startButtonRef.current) {
            startButtonRef.current.style.display = 'none';
        }
    };

    return (
        <div className="game-wrapper">
            <div className="game-container">
                <div id="board" ref={boardRef} className="board">
                    {board.map((row, rowIndex) => (
                        row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`cell ${lastMove && lastMove.row === rowIndex && lastMove.col === colIndex ? 'last-move' : ''}`}
                                data-row={rowIndex}
                                data-col={colIndex}
                                onClick={() => onCellClick(rowIndex, colIndex)}
                            >
                                {cell && (
                                    <div className={`stone ${cell === 'P' ? 'black' : 'white'}`}></div>
                                )}
                            </div>
                        ))
                    ))}
                </div>
                <button id="start" ref={startButtonRef} onClick={startGame}>START</button>
                <button id="restart" ref={restartButtonRef} onClick={restartGame} style={{ display: 'none' }}>RESTART</button>
                <div id="message" ref={messageRef}>{message}</div>
            </div>
        </div>
    );
};

export default GomokuGame;
