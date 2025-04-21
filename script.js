// Gameboard Module (Immediately Invoked Function Expression)
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => [...board]; // this part returns a copy
    const updateCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };
    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];

    };

    return { getBoard, updateCell, reset };

})();

// Player Factory

const Player = (name, marker) => {
    return { name, marker };
};

// Game Controller Module (IIFE)
const GameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;

    const getCurrentPlayer = () => currentPlayer;

    const playRound = (index) => {

        if (gameOver) {
            console.log("Game is over. Restart to play again.");
            return;
        }

        if (Gameboard.updateCell(index, currentPlayer.marker)) {
            console.log(`${currentPlayer.name} placed ${currentPlayer.marker} at ${index}`);

            if (checkWinner(currentPlayer.marker)) {
                console.log(`${currentPlayer.name} wins!`)
                gameOver = true;
                return;
            }

            if (checkTie()) {
                console.log("It's a tie!");
                gameOver = true;
                return;
            }
            switchTurn();
        } else {
            console.log("Cell already taken!")
        }
    };

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const checkWinner = (marker) => {
        const b = Gameboard.getBoard();
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6],            // diagonals 
        ];

        return winConditions.some(condition => condition.every(index => b[index] === marker)
        );
    };

    const checkTie = () => {
        const b = Gameboard.getBoard();
        return b.every(cell => cell !== "");
    }

    const restart = () => {
        Gameboard.reset();
        currentPlayer = player1;
        gameOver = false;
        console.log("Game restarted!");
    };

    return { playRound, getCurrentPlayer, restart };
})();

const DisplayController = (() => {
    const boardContainer = document.getElementById("gameboard");

    const renderBoard = () => {
        const board = Gameboard.getBoard();
        boardContainer.innerHTML = "";

        board.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.textContent = cell; // X, O, or "";
           

            //Adding a click event to each cell
            cellDiv.addEventListener("click", () => {
                GameController.playRound(index);
                renderBoard(); // Re-render the board after a move
            });

            boardContainer.appendChild(cellDiv);
        });
    };

    return {renderBoard};
})();

console.log("Tic Tac Toe is ready!");