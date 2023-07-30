let gameOver = 0;
let score = 0;
let hintIndex = 0;
let currentCharacter;
let percent = 100;

const menuDiv = document.querySelector(".menu");
const settingsDiv = document.querySelector(".settings");
const settingsButton = document.querySelector(".settingsButton");
const backtomenuButton = document.querySelector(".backtomenuButton");
const audio = document.querySelector(".audio");
const volumeSlider = document.querySelector(".volumeSlider");
const volumeDisplay = document.querySelector(".volumeDisplay");
const gameDiv = document.querySelector(".game");
const characterImage = document.querySelector(".characterImage");
const form = document.querySelector(".form");
const answerInput = document.querySelector(".answerInput");
const submitButton = document.querySelector(".submitButton");
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
    gameDiv.style.display = "none";
    gameOver = 1;
    gameOverDiv.style.display = "flex";
    gameOverMessage.innerHTML = "Congratulations!";
    gameOverSubmessage.innerHTML = `Your score is: ${score}`;
  }
  percent = 100;
  const timer = setInterval(() => {
    percent -= 5;
    timerPercent.innerHTML = percent / 5 + " seconds left";
    timerBar.style.width = percent + "%";
    if (timerBar.style.width <= "0%" && gameOver == 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
};

const endGame = () => {
  gameDiv.style.display = "none";
  gameOverDiv.style.display = "flex";
  gameOverMessage.innerHTML = "Time is up!";
  gameOverSubmessage.innerHTML = `Your score is: ${score}`;
};

const submitAnswer = (event) => {
  event.preventDefault();
  const answer = answerInput.value;
  if (answer.toLowerCase() === currentCharacter.name.toLowerCase()) {
    score += 1;
    const audioCorrect = new Audio("assets/music/correct.mp3");
    audioCorrect.play();
    const messages = [
      "Impressive work!",
      "Outstanding!",
      "You did it!",
      "Great job!",
      "Well done!",
      "Fantastic effort!",
      "You're on fire!",
      "Exceptional performance!",
      "Brilliant!",
      "Bravo!",
      "Outstanding!",
      "Great response!",
      "Amazing work!",
      "You got it!",
      "Keep it up!",
    ];
    const showMessage = () => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      messageDiv.innerHTML = message;
      setTimeout(() => {
        messageDiv.style.display = "none";
        showPoints();
      }, 1500);
    };
    showMessage();
    currentCharacter =
      characters[Math.floor(Math.random() * characters.length)];
    const index = characters.findIndex(
      (character) => character.name === currentCharacter.name
    );
    characters.splice(index, 1);
    if (characters.length === 0) {
      gameDiv.style.display = "none";
      gameOver = 1;
      gameOverDiv.style.display = "flex";
      gameOverMessage.innerHTML = "Congratulations!";
      gameOverSubmessage.innerHTML = `Your score is: ${score}`;
    }
    characterImage.style.backgroundImage = `url(${currentCharacter.image})`;
    percent = 100;
    timerPercent.innerHTML = "20 seconds left";
    timerBar.style.width = "100%";
  } else {
    const audioIncorrect = new Audio("assets/music/incorrect.mp3");
    audioIncorrect.play();
    const messages = [
      "Wrong character!",
      "Incorrect answer!",
      "Bad answer!",
      "Mistake!",
      "Incorrect response!",
      "Unfortunately, not the right character!",
      "Oops, wrong character!",
      "Try again!",
      "Not quite there!",
      "Close, but not quite!",
      "Keep practicing!",
      "You're getting warmer!",
      "Not the answer we're looking for!",
      "Not quite on target!",
      "That's not it, but don't give up!",
    ];
    const showMessage = () => {
      const message = messages[Math.floor(Math.random() * messages.length)];
      messageDiv.innerHTML = message;
      setTimeout(() => {
        messageDiv.style.display = "none";
        showPoints();
      }, 1500);
    };
    showMessage();
  }
  answerInput.value = "";
  hintDiv.style.display = "none";
  hintIndex = 0;
};

function showPoints() {
  messageDiv.innerHTML = `Your score is: ${score}`;
  messageDiv.style.display = "block";
}

const useHint = () => {
  if (score >= 1) {
    setTimeout(() => {
      showPoints();
    }, 1500);
    messageDiv.innerHTML = `Hint used!`;
    score -= 1;
    hintIndex++;
    hintDiv.innerHTML = currentCharacter.name
      .split("")
      .map((char, index) => {
        if (index < hintIndex) {
          return char;
        } else {
          return char === " " ? "  " : "_";
        }
      })
      .join("");
    hintDiv.style.display = "block";
  } else {
    setTimeout(() => {
      showPoints();
    }, 1500);
    messageDiv.innerHTML = `You don't have enough points!`;
  }
};

const restartGame = () => {
  gameOverDiv.style.display = "none";
  menuDiv.style.display = "flex";
  score = 0;
  hintDiv.innerHTML = "";
  messageDiv.innerHTML = "";
  hintIndex = 0;
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

volumeSlider.addEventListener("input", (event) => {
  handleVolumeChange();
  audio.volume = event.target.value;
});

const handleVolumeChange = () => {
  audio.volume = volumeSlider.value / 100;
  volumeDisplay.innerHTML = `${volumeSlider.value}%`;
};

function init() {
  audio.volume = volumeSlider.value / 100;
  volumeDisplay.innerHTML = `${volumeSlider.value}%`;

  startButton.addEventListener("click", function handleClick(event) {
    event.target.classList.add("menuAnimation");
    setTimeout(startGame, 500);
    restartButton.classList.remove("menuAnimation");
  });
  settingsButton.addEventListener("click", function handleClick(event) {
    event.target.classList.add("menuAnimation");
    setTimeout(settings, 500);
    backtomenuButton.classList.remove("menuAnimation");
  });
  backtomenuButton.addEventListener("click", function handleClick(event) {
    event.target.classList.add("menuAnimation");
    setTimeout(menuBack, 400);
    settingsButton.classList.remove("menuAnimation");
  });
  restartButton.addEventListener("click", function handleClick(event) {
    event.target.classList.add("menuAnimation");
    setTimeout(restartGame, 400);
  });

  form.addEventListener("submit", submitAnswer);
  hintButton.addEventListener("click", useHint);
}
window.addEventListener("load", init);
