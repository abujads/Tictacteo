console.log("Welcome To Tic Tac Toe");

let music = new Audio("gs.wav");
let turnaudio = new Audio("x.wav");
let gameover = new Audio("go.mp3");
let turn = "X";
let isgameover = false;

const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2, 11.5, 5, 0],
        [3, 4, 5, 11.5, 15, 0],
        [6, 7, 8, 11.5, 25, 0],
        [0, 3, 6, 1.5, 15, 90],
        [1, 4, 7, 11.5, 15, 90],
        [2, 5, 8, 21.5, 15, 90],
        [0, 4, 8, 11.5, 15, 45],
        [2, 4, 6, 11.5, 15, 135],
    ];
    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText =
                boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector(".line").style.transform = `translate(${e[3]}%, ${e[4]}%) rotate(${e[5]}deg)`;

            document.querySelector(".line").style.width = "22vw";
            gameover.play();
            setTimeout(() => {
                alert(boxtext[e[0]].innerText + " Won");
            }, 1000);
        }
    });
};

// Function to check if the current player is AI
const isAIPlayer = () => {
    return turn === "0" || turn === "1";
};

// Minimax algorithm for AI player
const minimax = (board, depth, isMaximizing) => {
    let scores = {
        X: -1,
        0: 1,
        1: 1,
    };

    let winner = checkWinner(board);

    if (winner) {
        return scores[winner];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "0";
                let score = minimax(board, depth + 1, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore - depth / 10000; // Adjusting the score based on depth and difficulty
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "X";
                let score = minimax(board, depth + 1, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore + depth / 10000; // Adjusting the score based on depth and difficulty
    }
};

// AI player's turn
const aiPlayerTurn = () => {
    if (!isgameover) {
        let board = Array.from(document.getElementsByClassName("boxtext")).map(
            (element) => element.innerText
        );
        let bestMove = -1;
        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "0";
                let score = minimax(board, 0, false);
                board[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        if (bestMove !== -1) {
            let boxtext = document.getElementsByClassName("boxtext")[bestMove];
            boxtext.innerText = turn;
            turn = changeTurn();
            turnaudio.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText =
                    "Turn for " + turn;
            }
        }
    }
};

// Game Logic
music.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isAIPlayer()) {
            boxtext.innerText = turn;
            turn = changeTurn();
            turnaudio.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText =
                    "Turn for " + turn;
                // Call the AI player's turn after the human player's turn
                setTimeout(aiPlayerTurn, 500);
            }
        }
    });
});

// Add onclick listener to reset button
reset.addEventListener("click", () => {
    music.play();
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText =
        "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
});

// Function to check the winner of the game
const checkWinner = (board) => {
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let win of wins) {
        if (
            board[win[0]] !== "" &&
            board[win[0]] === board[win[1]] &&
            board[win[1]] === board[win[2]]
        ) {
            return board[win[0]];
        }
    }

    return null;
};
