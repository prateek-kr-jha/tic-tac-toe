function Player(name, symbol) {
    return {
        name,
        symbol
    }
}

function Cell() {
    let value = '';
    const addToken = (token) => {
        value = token;
    }

    const getToken = () => {
        return value;
    }

    return {
        addToken,
        getToken
    }
}

function Gameboard() {
    let board = []
    for(let i = 0; i < 3; i++) {
        board[i] = [];
        for(let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;

    const dropToken = (token, idx1, idx2) => {
        if(idx1 <= 0 || idx2 <= 0 || idx1 > 3 || idx2 > 3) {
            console.log("Invalid gameboard idx");
            return;
        }
        let currentCell = board[idx1 - 1][idx2 - 1];
        if(currentCell.getToken() == '') {
            currentCell.addToken(token);
        } else {
            console.log("Already used by a player " + currentCell.getToken());
        }
    }

    const printBoard = () => {
        for(let i = 0; i < board.length; i++) {
            let str = ""
            for(let j = 0; j < board[i].length; j++) {
                str += board[i][j].getToken() + " | ";
            }
            console.log(str);
        }
    }

    return {
        getBoard,
        dropToken,
        printBoard
    }
}

function GameController(playerOne = "Player One", playerTwo = "Player Two") {
    const board = Gameboard();
    console.log(board, "board");
    const players = [
        Player(playerOne, "X"),
        Player(playerTwo, "O")
    ];

    let currentPlayer = players[0];

    const switchPlayer = () => {
        currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
    }

    const getCurrentPlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(currentPlayer.name + "'s turn");
    }

    const playRound = (idx1, idx2) => {
        board.dropToken(currentPlayer.symbol, idx1 , idx2);
        console.log(currentPlayer.name + ` marking ${idx1}, ${idx2} with ${currentPlayer.symbol}`);
        printNewRound();
        switchPlayer();
    }

    printNewRound();
    return {
        playRound,
        getCurrentPlayer
    }
}

let game = GameController();

game.playRound(1, 1);
game.playRound(1, 3);
game.playRound(3, 1);
game.playRound(2, 1);
game.playRound(3, 3);
game.playRound(3, 2);
game.playRound(2, 2);