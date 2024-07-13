const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const popup = document.createElement('div');
const popupContent = document.createElement('div');
const popupMessage = document.createElement('p');
const closePopupButton = document.createElement('button');

popup.className = 'popup';
popupContent.className = 'popup-content';
closePopupButton.textContent = 'Close';

popupContent.appendChild(popupMessage);
popupContent.appendChild(closePopupButton);
popup.appendChild(popupContent);
document.body.appendChild(popup);

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        popupMessage.textContent = `Player ${currentPlayer} has won!`;
        popup.classList.add('active');
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.textContent = 'Draw!';
        popupMessage.textContent = 'Draw!';
        popup.classList.add('active');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    popup.classList.remove('active');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
closePopupButton.addEventListener('click', () => popup.classList.remove('active'));
