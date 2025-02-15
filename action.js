let scoreStr = localStorage.getItem("Score");
let score = scoreStr ? JSON.parse(scoreStr) : { win: 0, lost: 0, tie: 0 };

function displayScore() {
  return `🏆 Score - Won: ${score.win}, Lost: ${score.lost}, Tie: ${score.tie}`;
}

function resetScore() {
  score = { win: 0, lost: 0, tie: 0 };
  localStorage.setItem("Score", JSON.stringify(score));

  document.querySelector("#user-move").style.display = "none";
  document.querySelector("#computer-move").style.display = "none";
  document.querySelector("#result").style.display = "none";

  document.querySelector("#score").innerHTML = displayScore();
  document.querySelector("#score").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".display")
    .forEach((el) => (el.style.display = "none"));
  document.querySelector("#score").style.display = "block";
  document.querySelector("#score").innerHTML = displayScore();
});

function generateComputerChoice() {
  const choices = ["Bat", "Ball", "Stumps"];
  return choices[Math.floor(Math.random() * 3)];
}

function getResult(userMove, computerMove) {
  if (userMove === computerMove) {
    score.tie++;
    return `It's a tie!`;
  }

  const winningMoves = {
    Bat: "Ball",
    Ball: "Stumps",
    Stumps: "Bat",
  };

  if (winningMoves[userMove] === computerMove) {
    score.win++;
    return `You Won!`;
  } else {
    score.lost++;
    return `Computer Won!`;
  }
}

function showResult(userMove = "", computerMove = "", result = "") {
  localStorage.setItem("Score", JSON.stringify(score));

  let resultEmoji = "🤝";
  if (result.includes("You Won")) resultEmoji = "🧑🏾👩🏽‍🦰";
  if (result.includes("Computer Won")) resultEmoji = "🤖";

  document.querySelector("#user-move").innerHTML = userMove
    ? `🧑🏾👩🏽‍🦰 You chose ${userMove}.`
    : "";
  document.querySelector("#computer-move").innerHTML = computerMove
    ? `🤖 Computer chose ${computerMove}.`
    : "";
  document.querySelector("#result").innerHTML = `${resultEmoji} ${result}`;

  document.querySelector("#user-move").style.display = userMove
    ? "block"
    : "none";
  document.querySelector("#computer-move").style.display = computerMove
    ? "block"
    : "none";
  document.querySelector("#result").style.display = result ? "block" : "none";

  document.querySelector("#score").innerHTML = displayScore();
  document.querySelector("#score").style.display = "block";
}

function playGame(userMove) {
  const computerMove = generateComputerChoice();
  const result = getResult(userMove, computerMove);
  showResult(userMove, computerMove, result);
}

showResult();
