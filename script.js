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

    const getCurrentPlayer = () => currentPlayer;

    const playRound = (index) => {
        if (Gameboard.updateCell(index, currentPlayer.marker)) {
            console.log(`${currentPlayer.name} placed ${currentPlayer.marker} at ${index}`);
            switchTurn();
        } else {
            console.log("Cell already taken!")
        }
    };

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const restart = () => {
        Gameboard.reset();
        currentPlayer = player1;
    };

    return { playRound, getCurrentPlayer, restart };
})();

console.log("Tic Tac Toe is ready!");