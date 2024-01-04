/***********
Description: This file contains javascript code for a tic tac toe game.
Author: MisterWaner
Date: 01/01/2024
***********/

//Game variables
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let isTheEnd = false;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let nbMatchesPlayed = 0;
let currentPlayer = "X";

const nbMatches = document.querySelector("#nbMatches");
const score1 = document.querySelector("#score1");
const score2 = document.querySelector("#score2");
const msg = document.querySelector("#msg");



//Message when a player wins
const winningMessage = () => {
    if (currentPlayer === "X") {
        scorePlayer1++;
        if (scorePlayer1 < 2) score1.innerHTML = `${scorePlayer1} point`;
        else score1.innerHTML = `${scorePlayer1} points`;
        return `Le joueur joueur 1 a gagné !`;
    } else if (currentPlayer === "O") {
        scorePlayer2++;
        if (scorePlayer2 < 2) score2.innerHTML = `${scorePlayer2} point`;
        else score2.innerHTML = `${scorePlayer2} points`;
        return `Le joueur joueur 2 a gagné !`;
    }
};
//Message when the game is a draw
const drawMessage = () => `Match nul !`;
//Message for the current player's turn
const currentPlayerTurn = () => {
    if (currentPlayer === "X") {
        return `C'est au tour du joueur 1`;
    } else {
        return `C'est au tour du joueur 2`;
    }
};

msg.innerHTML = currentPlayerTurn();

//Event listeners
document
    .querySelectorAll(".cell")
    .forEach((cell) => cell.addEventListener("click", handleCellClick)); //Add an event listener to each cell
document.querySelector("#newMatch").addEventListener("click", handleNewMatch); //Add an event listener to the new match button
document.querySelector("#newGame").addEventListener("click", handleNewGame); //Add an event listener to the new game button

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute("data-cell-index")
    );

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [
    [0, 1, 2], //first line
    [3, 4, 5], //second line
    [6, 7, 8], //third line
    [0, 3, 6], //first column
    [1, 4, 7], //second column
    [2, 5, 8], //third column
    [0, 4, 8], //first diagonal
    [2, 4, 6], //second diagonal
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        msg.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        msg.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    msg.innerHTML = currentPlayerTurn();
}

function handleNewGame() {
    gameActive = true;
    nbMatchesPlayed = 0;
    nbMatches.innerHTML = `${nbMatchesPlayed} manche`;
    scorePlayer1 = 0;
    score1.textContent = `${scorePlayer1} point`;
    scorePlayer2 = 0;
    score2.textContent = `${scorePlayer2} point`;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    msg.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

function handleNewMatch() {
    nbMatchesPlayed++;
    if (nbMatchesPlayed < 2) nbMatches.innerHTML = `${nbMatchesPlayed} manche`;
    else nbMatches.innerHTML = `${nbMatchesPlayed} manches`;

    let i = 0;
    isTheEnd = false;
    gameActive = true;
    for (i = 0; i < 9; i++) {
        gameState[i] = "";
    }
    currentPlayer = "X";
    msg.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}


//new match
function newMatch() {
    let i = 0;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    createGrid();
    isTheEnd = false;
    nbCaseFull = 0;
    for (i = 0; i < 9; i++) {
        isCaseFull[i] = false;
        casesPlayer1[i] = 0;
        casesPlayer2[i] = 0;
    }
    if (isPlayerOne) {
        msg.innerHTML = `<span class="player1"> C'est au tour du joueur 1 </span>`;
        canvas.classList.add("cross").remove("circle");
    } else {
        msg.innerHTML = `<span class="player2"> C'est au tour du joueur 2 </span>`;
        canvas.classList.add("circle").remove("cross");
    }
}

//new game
function newGame() {
    scorePlayer1 = 0;
    score1.textContent = `${scorePlayer1} point`;
    scorePlayer2 = 0;
    score2.textContent = `${scorePlayer2} point`;

    nbMatchesPlayed = 0;
    nbMatches.innerHTML = `${nbMatchesPlayed} manche`;
    newMatch();
}

//On arrival on the page
function init() {
    score1.textContent = `${scorePlayer1} point`;
    score2.textContent = `${scorePlayer2} point`;
    nbMatches.textContent = `${nbMatchesPlayed} manche`;
    msg.innerHTML = currentPlayerTurn();
 
}

init();
