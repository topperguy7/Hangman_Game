// ✅ Predefined revision words (10 words)
const revisionWords = [
  "apple",
  "banana",
  "watermelon",
  "tomato",
  "orange",
  "pomogranete",
  "mango",
  "pineapple",
  "dragonfruit",
  "guava"
];

let selectedWord = "";
let correctLetters = [];
let wrongLetters = [];
let isGameStarted = false;
const maxWrong = 6;

// DOM elements
const revisionEl = document.getElementById("revision");
const timerText = document.getElementById("timerText");
const wordEl = document.getElementById("word");
const wrongEl = document.getElementById("wrong");
const lettersEl = document.getElementById("letters");
const messageEl = document.getElementById("message");

// 🧠 Show words for 10 seconds
function startRevision() {
  let timeLeft = 10;
  revisionEl.innerText = revisionWords.join(", ");
  timerText.innerText = `Revise these words (${timeLeft}s)`;

  const countdown = setInterval(() => {
    timeLeft--;
    timerText.innerText = `Revise these words (${timeLeft}s)`;

    if (timeLeft === 0) {
      clearInterval(countdown);
      startGame();
    }
  }, 1000);
}

// 🎮 Start Hangman game
function startGame() {
  revisionEl.innerText = "";
  timerText.innerText = "";

  isGameStarted = true;
  correctLetters = [];
  wrongLetters = [];
  messageEl.innerText = "";

  selectedWord =
    revisionWords[Math.floor(Math.random() * revisionWords.length)];

  createButtons();
  displayWord();
}

// 🔤 Display hidden word
function displayWord() {
  wordEl.innerHTML = selectedWord
    .split("")
    .map(letter => (correctLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

// 🔠 Create alphabet buttons
function createButtons() {
  lettersEl.innerHTML = "";

  for (let i = 97; i <= 122; i++) {
    const btn = document.createElement("button");
    btn.innerText = String.fromCharCode(i);

    btn.onclick = () => guessLetter(btn.innerText);
    lettersEl.appendChild(btn);
  }
}

// 🧩 Handle guesses
function guessLetter(letter) {
  if (!isGameStarted) return;

  if (selectedWord.includes(letter)) {
    if (!correctLetters.includes(letter)) {
      correctLetters.push(letter);
    }
  } else {
    if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
    }
  }

  updateGame();
}

// 🔄 Update game status
function updateGame() {
  displayWord();
  wrongEl.innerText = wrongLetters.join(", ");

  if (!wordEl.innerText.includes("_")) {
    messageEl.innerText = "🎉 You Won!";
    isGameStarted = false;
  }

  if (wrongLetters.length >= maxWrong) {
    messageEl.innerText = `❌ Game Over! Word was: ${selectedWord}`;
    isGameStarted = false;
  }
}

// 🔁 Restart game
function restartGame() {
  location.reload();
}

// 🚀 Start revision when page loads
startRevision();