const board = document.querySelector(".board");
const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");

// total players
const players = ["X", "O"];

// Current players

let currentPlayer = players[0]; // this will make sure the game start with player X which is at 0 index

// at first message will display X turns
message.textContent = `X's turns`;
// we have to make winning pattern

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// for loop we have to run in sqaures
for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", () => {
    // Now 1st we have to check, if X or O is already there than we should not change them, for that we can use if statement and we also need to check any player has won or if won also we can return
    // textContent will check the text present in the square
    if (squares[i].textContent !== "" || checkWinner(currentPlayer)) {
      return;
    }

    // Now we have to make the text of sqaure equal to current player
    squares[i].textContent = currentPlayer; // here we will get only X as current player we make X by default in line 10

    if (checkWinner(currentPlayer)) {
      message.textContent = `Game Over. ${currentPlayer} wins the Game! Please restart the game.`;
      //   Change color of text to green
      message.style.color = "green";
      return;
    }

    // to check draw case
    if (checkTiedResult()) {
      message.textContent = `Match Draw! Please restart the Game.`;

      //   Change color of text to red
      message.style.color = "red";
      return;
    }
    // to make the player change after every click we can use ternary operator

    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

    if (currentPlayer === players[0]) {
      message.textContent = `X's turns`;
    } else {
      message.textContent = `O's turns`;
    }
  });
}

// Now we have to check winner

function checkWinner(currentPlayer) {
  for (let i = 0; i < winningPattern.length; i++) {
    const [a, b, c] = winningPattern[i];

    if (
      squares[a].textContent === currentPlayer &&
      squares[b].textContent === currentPlayer &&
      squares[c].textContent === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

// to check for draw we need to check if all the sqaures are not empty means it is a draw  somebody won

function checkTiedResult() {
  for (let i = 0; i < squares.length; i++) {
    // here we check if any sqare is empty means someone won so it is not a draw case
    if (squares[i].textContent === "") {
      return false;
    }
  }

  //   here it will return true if all the square has text in it means no one won so it is a draw case.
  return true;
}

// here directly I have selected the restart button and on click I run over the all the sqaure and make the text of all sqaure empty and make the message X turn first and current player to be player[0] i.e X .

document.querySelector(".restart-btn").addEventListener("click", () => {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }

  message.textContent = `X's turn`;
  currentPlayer = players[0];
  message.style.color = "black";
});
