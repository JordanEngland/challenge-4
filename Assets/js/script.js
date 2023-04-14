var questions = [
  {
    question: "What does HTML stand for?",
    options: ["A. HyperText Model Language", "B. HyperText Markup Language", "C. HyperText Madeup Language", "D.HyperText Marking Language"],
    answer: "B. HyperText Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: ["A. Cascading Style Sheet", "B. Creative Style Sheet", "C. Colorful Style Sheet", "D. Compact Style Sheet"],
    answer: "A. Cascading Style Sheet"
  },
  {
    question: "What does JS stand for?",
    options: ["A. Java Source", "B. Just Saying", "C. JavaScript", "D. Jumping Spider"],
    answer: "C. JavaScript"
  },
  {
    question: "What characters are used for JavaScript string?",
    options: ["A. ( )", "B. < >", "C. ! &", "D. ''"],
    answer: "D. ''"
  }
];

var currentQuestionIndex = 0;
var timerValue = 30;
var score = 0;
var timerInterval;

var startButton = document.getElementById("start-button");
var questionText = document.getElementById("question-text");
var answerOptions = document.getElementById("answer-options");
var resultText = document.getElementById("result-text");
var timerValueSpan = document.getElementById("timer-value");
var scoreText = document.getElementById("score-value");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.disabled = true;
  showQuestion();
  timerInterval = setInterval(updateTimer, 1000);
}

function showQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  answerOptions.innerHTML = "";
  for (var i = 0; i < currentQuestion.options.length; i++) {
    var optionElement = document.createElement("li");
    optionElement.textContent = currentQuestion.options[i];
    optionElement.classList.add("answer-option");
    optionElement.addEventListener("click", checkAnswer);
    answerOptions.appendChild(optionElement);
  }
}

function checkAnswer(event) {
  var selectedOption = event.target;
  var currentQuestion = questions[currentQuestionIndex];
  if (selectedOption.textContent === currentQuestion.answer) {
    resultText.textContent = "Correct!";
    score += 10;
  } else {
    resultText.textContent = "Wrong!";
    timerValue -= 10;
    if (timerValue < 0) {
      timerValue = 0;
    }
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(showQuestion, 1000);
  } else {
    endQuiz();
  }
}

function updateTimer() {
  timerValue--;
  if (timerValue <= 0) {
    timerValue = 0;
    endQuiz();
  }
  timerValueSpan.textContent = timerValue;
}

function endQuiz() {
  clearInterval(timerInterval);
  resultText.textContent = "Quiz Over";
  scoreText.textContent = score;
}
