const quotes = [
  "Practice makes perfect.",
  "The quick brown fox jumps over the lazy dog.",
  "Success is the sum of small efforts.",
  "Dream big, work hard.",
  "Believe in yourself.",
  "Coding is the language of the future.",
  "Mistakes are proof that you are trying.",
  "Stay focused and never give up.",
  "Every expert was once a beginner.",
  "Push yourself, because no one else will.",
  "Great things never come from comfort zones.",
  "Discipline is choosing between what you want now and what you want most.",
  "Do something today that your future self will thank you for.",
  "Typing fast is a superpower in disguise.",
  "You miss 100% of the shots you don’t take.",
  "Be stronger than your excuses."
];


let currentQuote = "";
let timer;
let timeLeft = 30;

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTest() {
  resetTest();
  currentQuote = getRandomQuote();
  document.getElementById("quote").textContent = currentQuote;
  document.getElementById("highlightedText").innerHTML = currentQuote; // Add this
  document.getElementById("input").disabled = false;
  document.getElementById("input").focus();

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function getCorrectCharacterCount() {
  const input = document.getElementById("input").value;
  let count = 0;
  for (let i = 0; i < input.length && i < currentQuote.length; i++) {
    if (input[i] === currentQuote[i]) {
      count++;
    }
  }
  return count;
}

function checkCompletion() {
  const input = document.getElementById("input").value;

  if (input === currentQuote) {
    const totalTypedChars = input.length;
    const correctChars = getCorrectCharacterCount();
    const accuracy = Math.round((correctChars / totalTypedChars) * 100) || 0;

    // ✅ End only if accuracy is 100%
    if (accuracy === 100) {
      clearInterval(timer);
      endTest();
    }
  }
}


function endTest() {
  const input = document.getElementById("input").value;
  const totalTypedChars = input.length;
  const correctChars = getCorrectCharacterCount();
  const accuracy = Math.round((correctChars / totalTypedChars) * 100) || 0;
  const wpm = Math.round((correctChars / 5) / ((30 - timeLeft) / 30)) || 0;

  document.getElementById("input").disabled = true;
  document.getElementById("wpm").textContent = wpm;
  document.getElementById("accuracy").textContent = accuracy;

  const message = document.getElementById("message");
  message.classList.remove("green", "yellow", "red");

  if (accuracy === 100) {
    message.textContent = "Excellent! 100% accuracy! 🎯";
    message.classList.add("green");
    confetti(); // celebration
  } else if (accuracy >= 50) {
    message.textContent = "Good job! Keep it up 💪";
    message.classList.add("yellow");
  } else {
    message.textContent = "You can do better! Don’t give up 🌱";
    message.classList.add("red");
  }
}

function resetTest() {
  clearInterval(timer);
  timeLeft = 30;
  document.getElementById("timer").textContent = timeLeft;
  document.getElementById("input").value = "";
  document.getElementById("quote").textContent = "Loading...";
  document.getElementById("wpm").textContent = 0;
  document.getElementById("accuracy").textContent = 0;
  document.getElementById("message").textContent = "";
  document.getElementById("input").disabled = true;
}
function updateHighlight() {
  const input = document.getElementById("input").value;
  let result = "";

  for (let i = 0; i < currentQuote.length; i++) {
    if (i < input.length) {
      if (input[i] === currentQuote[i]) {
        result += `<span class="correct">${currentQuote[i]}</span>`;
      } else {
        result += `<span class="incorrect">${currentQuote[i]}</span>`;
      }
    } else {
      result += `<span class="remaining">${currentQuote[i]}</span>`;
    }
  }

  document.getElementById("highlightedText").innerHTML = result;
}
