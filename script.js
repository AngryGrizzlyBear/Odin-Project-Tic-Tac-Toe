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
    let player1;
    let player2;
    let currentPlayer;
    let gameOver = false;

    const setPlayers = (name1, name2) => {
        player1 = Player(name1 || "Player 1", "X");
        player2 = Player(name2 || "Player 2", "O");
        currentPlayer = player1;
        gameOver = false;
    };


    const getCurrentPlayer = () => currentPlayer;

    const playRound = (index) => {

        if (!currentPlayer || gameOver) {
            console.log("Game hasn't started or is already over");
            return;
        }

        if (Gameboard.updateCell(index, currentPlayer.marker)) {
            DisplayController.renderBoard();

            if (checkWinner(currentPlayer.marker)) {
                DisplayController.setStatus(`${currentPlayer.name} wins!`)
                gameOver = true;
                return;
            }

            if (checkTie()) {
                DisplayController.setStatus("It's a tie!");
                gameOver = true;
                return;
            }
            switchTurn();
            DisplayController.setStatus(`${currentPlayer.name}'s turn`);
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
        return Gameboard.getBoard().every(cell => cell !== "");
    }

    const restart = () => {
        Gameboard.reset();
        currentPlayer = player1;
        gameOver = false;
       DisplayController.renderBoard();
       DisplayController.setStatus(`${currentPlayer.name}'s turn`);
    };

    return { setPlayers, playRound, getCurrentPlayer, restart };
})();

const DisplayController = (() => {
    const boardContainer = document.getElementById("gameboard");
    const statusDiv = document.getElementById("status");
    const startBtn = document.getElementById("startBtn");

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
            });

            boardContainer.appendChild(cellDiv);
        });
    };

    const setStatus = (message) => {
        statusDiv.textContent = message;
    };

    //Start/restart Button logic
    startBtn.addEventListener("click", ()=> {
        const name1 = document.getElementById("player1").value;
        const name2 = document.getElementById("player2").value;

        GameController.setPlayers(name1, name2);
        GameController.restart();
    })
    return {renderBoard, setStatus};
})();

DisplayController.setStatus("Enter names to start the game.");
DisplayController.renderBoard();

console.log("Tic Tac Toe is ready!");