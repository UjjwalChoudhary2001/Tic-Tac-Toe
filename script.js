let turn = "O";
let totalturns = 0;
let board = document.querySelector(".board");

let winner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let board_array = new Array(9).fill("E"); //E represents empty.
console.log(board_array);
function checkWinner() {
  //   for (i of winner) {
  //     console.log(i);
  //   }
  //Destructuring of array
  for ([index0, index1, index2] of winner) {
    if (
      board_array[index0] !== "E" &&
      board_array[index0] === board_array[index1] &&
      board_array[index1] === board_array[index2]
    ) {
      return 1; // Winner found
    }
  }
  return 0;
}

const printer = (event) => {
  //console.log(event.target.id);

  let element = event.target;

  if (board_array[element.id] === "E") {
    totalturns++;
    if (turn == "O") {
      element.innerHTML = "O";
      board_array[element.id] = "O";
      // console.log(board_array);
      if (checkWinner()) {
        document.getElementById("winningMessage").innerText = "O wins !!";
        board.removeEventListener("click", printer); //If O/X wins we would not allow any activity on the board
        return; //So that even if totalturn==9 , Match Draw is not printed
      }
      turn = "X";
    } else {
      element.innerHTML = "X";
      board_array[element.id] = "X";
      // console.log(board_array);
      if (checkWinner()) {
        document.getElementById("winningMessage").innerText = "X wins !!";
        board.removeEventListener("click", printer); //If O/X wins we would not allow any activity on the board
        return; //So that even if totalturn==9 , Match Draw is not printed
      }
      turn = "O";
    }
  }

  if (totalturns == 9) {
    document.getElementById("winningMessage").innerText = "Match Draw !!";
    board.removeEventListener("click", printer); // No need but for code quality we can write as all the fields are filled already if the match draws.
  }
};

board.addEventListener("click", printer);

let restartBtn = document.getElementById("restartButton");
restartBtn.addEventListener("click", () => {
  let cellNodeList = document.getElementsByClassName("cell");
  Array.from(cellNodeList).forEach((div) => {
    div.innerHTML = "";
  });
  turn = "O";
  totalturns = 0;
  board_array = new Array(9).fill("E");
  document.getElementById("winningMessage").innerText = "";
  board.addEventListener("click", printer); //Added as after O/X wins the eventlistener is removed.
});
