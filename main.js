import characters from "./characters.js";
import correctMessages from "./correctMessages.js";
import incorrectMessages from "./incorrectMessages.js";

let timer;
let gameOver = 0;
let score = 0;
let usedHintsCount = 0;
let currentCharacter;
let percent = 100;

const menuDiv = document.querySelector(".menu");
const settingsDiv = document.querySelector(".settings");
const settingsButton = document.querySelector(".settingsButton");
const backToMenuButton = document.querySelector(".backtomenuButton");
const audio = document.querySelector(".audio");
const volumeSlider = document.querySelector(".volumeSlider");
const volumeDisplay = document.querySelector(".volumeDisplay");
const gameDiv = document.querySelector(".game");
const characterImage = document.querySelector(".characterImage");
const form = document.querySelector(".form");
const answerInput = document.querySelector(".answerInput");
const hintButton = document.querySelector(".hintButton");
const messageDiv = document.querySelector(".message");
const hintDiv = document.querySelector(".hint");
const timerPercent = document.querySelector(".timerPercent");
const timerBar = document.querySelector(".timerBar");
const gameOverDiv = document.querySelector(".gameOver");
const gameOverMessage = document.querySelector(".gameOverMessage");
const gameOverSubmessage = document.querySelector(".gameOverSubmessage");
const startButton = document.querySelector(".startButton");
const restartButton = document.querySelector(".restartButton");

const startGame = () => {
  menuDiv.style.display = "none";
  gameDiv.style.display = "flex";
  currentCharacter = characters[Math.floor(Math.random() * characters.length)];
  characterImage.style.backgroundImage = `url(${currentCharacter.image})`;
  const index = characters.findIndex(
    (character) => character.name === currentCharacter.name
  );
  characters.splice(index, 1);
  if (characters.length === 0) {
    endGame();
    return;
  }
  percent = 100;
  timer = setInterval(updateTimerBar, 1000);
};

const endGame = () => {
  clearInterval(timer);
  gameDiv.style.display = "none";
  gameOverDiv.style.display = "flex";
  gameOverMessage.innerHTML = "Congratulations!";
  gameOverSubmessage.innerHTML = `Your score is: ${score}`;
};

const updateTimerBar = () => {
  percent -= 5;
  timerPercent.innerHTML = percent / 5 + " seconds left";
  timerBar.style.width = percent + "%";
  if (percent <= 0 && gameOver === 0) {
    endGame();
  }
};

const submitAnswer = (event) => {
  event.preventDefault();
  const answer = answerInput.value;
  const correctAnswer = currentCharacter.name.toLowerCase();

  if (answer.toLowerCase() === correctAnswer) {
    handleCorrectGuess();
  } else {
    handleIncorrectGuess();
  }
  answerInput.value = "";
  hintDiv.style.display = "none";
  usedHintsCount = 0;
};

const handleCorrectGuess = () => {
  score += 1;
  const audioCorrect = new Audio("assets/music/correct.mp3");
  audioCorrect.play();
  showRandomMessage(correctMessages);
  handleNextCharacter();
};

const handleIncorrectGuess = () => {
  const audioIncorrect = new Audio("assets/music/incorrect.mp3");
  audioIncorrect.play();
  showRandomMessage(incorrectMessages);
};

const showRandomMessage = (messages) => {
  const message = messages[Math.floor(Math.random() * messages.length)];
  messageDiv.innerHTML = message;
  setTimeout(() => {
    messageDiv.style.display = "none";
    showPoints();
  }, 1500);
};

const showPoints = () => {
  messageDiv.innerHTML = `Your score is: ${score}`;
  messageDiv.style.display = "block";
};

const useHint = () => {
  if (score >= 1) {
    showPoints();
    messageDiv.innerHTML = `Hint used!`;
    score -= 1;
    usedHintsCount++;
    hintDiv.innerHTML = currentCharacter.name
      .split("")
      .map((char, index) =>
        index < usedHintsCount ? char : char === " " ? "  " : "_"
      )
      .join("");
    hintDiv.style.display = "block";
  } else {
    showPoints();
    messageDiv.innerHTML = `You don't have enough points!`;
  }
};

const handleNextCharacter = () => {
  currentCharacter = characters[Math.floor(Math.random() * characters.length)];
  characterImage.style.backgroundImage = `url(${currentCharacter.image})`;
  const index = characters.findIndex(
    (character) => character.name === currentCharacter.name
  );
  characters.splice(index, 1);
  if (characters.length === 0) {
    endGame();
  }
  percent = 100;
  timerPercent.innerHTML = "20 seconds left";
  timerBar.style.width = "100%";
};

const restartGame = () => {
  gameOverDiv.style.display = "none";
  menuDiv.style.display = "flex";
  score = 0;
  hintDiv.innerHTML = "";
  messageDiv.innerHTML = "";
  usedHintsCount = 0;
  startButton.classList.remove("menuAnimation");
  percent = 100;
  timerPercent.innerHTML = "20 seconds left";
  timerBar.style.width = "100%";
  messageDiv.innerHTML = `Your score is: ${score}`;
};

const settings = () => {
  menuDiv.style.display = "none";
  settingsDiv.style.display = "flex";
};

const menuBack = () => {
  settingsDiv.style.display = "none";
  menuDiv.style.display = "flex";
};

const handleVolumeChange = () => {
  audio.volume = volumeSlider.value / 100;
  volumeDisplay.innerHTML = `${volumeSlider.value}%`;
};

volumeSlider.addEventListener("input", (event) => {
  handleVolumeChange();
  audio.volume = event.target.value;
});

function init() {
  audio.volume = volumeSlider.value / 100;
  volumeDisplay.innerHTML = `${volumeSlider.value}%`;

  startButton.addEventListener("click", (event) => {
    event.target.classList.add("menuAnimation");
    setTimeout(startGame, 500);
    restartButton.classList.remove("menuAnimation");
  });
  settingsButton.addEventListener("click", (event) => {
    event.target.classList.add("menuAnimation");
    setTimeout(settings, 500);
    backToMenuButton.classList.remove("menuAnimation");
  });
  backToMenuButton.addEventListener("click", (event) => {
    event.target.classList.add("menuAnimation");
    setTimeout(menuBack, 400);
    settingsButton.classList.remove("menuAnimation");
  });
  restartButton.addEventListener("click", (event) => {
    event.target.classList.add("menuAnimation");
    setTimeout(restartGame, 400);
  });

  form.addEventListener("submit", submitAnswer);
  hintButton.addEventListener("click", useHint);
}

window.addEventListener("load", init);
