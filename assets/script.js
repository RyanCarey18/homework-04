// Step1
// make button

// when button is clicked pull questions and answers from array Object and start Timer

// when choice is selected check if its correct or Not.
//     id true then add point to point total and load next questions
//     if false then remove time from timer and load new questions

//     once no more questions or timer === 0 then load Score alert? and entry for initials

//     once returned then load hiscores and add start button.

let points = 0;
let questionNum = 0;
const startButton = document.getElementById("startButton");
const timerEl = document.querySelector(".timeLeft");
const btn = document.querySelectorAll(".btn");
const startText = document.getElementById("startText");
const questionsEl = document.getElementById("questions");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const input = document.getElementById("input");
const iniBtn = document.getElementById("ini-btn");
const finalScore = document.getElementById("final-score");
const answerBtn = document.querySelectorAll(".answer-btns");
const answersEl = document.getElementById("answers");
const scoreList = document.getElementById("score-list");
const inputText = document.getElementById("input-text");
const keptScore = []
const questions = [
  {
    question: "What type of value is true and false?",
    answers: [
      { text: "Undefined"},
      { text: "Number"},
      { text: "Boolean"},
      { text: "String"},
    ],
    answer:"Boolean",
  },
  {
    question: "Arrays are kept in which type of bracket?",
    answers: [
      { text: "Parenthesis"},
      { text: "Quotation Marks"},
      { text: "Curly Brackets"},
      { text: "Square Brackets"},
    ],
    answer: "Square Brackets",
  },
  {
    question: "Which is NOT a way to declare a variable?",
    answers: [
      { text: "have"},
      { text: "let"},
      { text: "var"},
      { text: "const"},
    ],
    answer: "have",
  },
  {
    question: "How do you show a result within the console in the dubugger?",
    answers: [
      { text: "show.console"},
      { text: "print.console"},
      { text: "console.log"},
      { text: "console.print"},
    ],
    answer: "console.log",
  },
];

const answers = [1];

//Start Quiz
function startQuiz() {
  points = 0;
  questionNum = 0;
  timerTime = 30;
  startButton.classList.add("hidden");
  startText.classList.add("hidden");
  timerEl.classList.remove("hidden");
  questionsEl.classList.remove("hidden");
  answersEl.classList.remove("hidden");
  scoreList.classList.add("hidden");

  startTimer();
  nextQuestion(questionNum);
}

//Sets next question text
function nextQuestion(i) {
  if (questionNum < questions.length) {
  questionsEl.innerText = questions[i].question;
  btn1.innerText = questions[i].answers[0].text;
  btn2.innerText = questions[i].answers[1].text;
  btn3.innerText = questions[i].answers[2].text;
  btn4.innerText = questions[i].answers[3].text;
  }
    else {
      clearInterval(timer);
      gameOver();
    }
}
//Starts the timer
function startTimer() {
  timer = setInterval(function () {
    timerTime--;
    timerEl.textContent = "Time: "+ timerTime;
    if (timerTime <= 0) {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}
//Checks the selected answer
function checkAnswer(e) {
e.target.setAttribute("data-answer",questions[questionNum].answer)
if (questions[questionNum].answer === e.target.innerText) {
  points++;
  questionNum++;
  nextQuestion(questionNum);
}
  else{
    timerTime = timerTime-10;
    questionNum++;
    nextQuestion(questionNum);
  }
}

function gameOver() {
  timerEl.classList.add("hidden");
  questionsEl.classList.add("hidden");
  answersEl.classList.add("hidden");
  input.classList.remove("hidden");
  finalScore.innerText = ("Your final score is: " + points)
}

function scoreScreen(){
  input.classList.add("hidden");
  startButton.classList.remove("hidden");
  startButton.innerText = ("Try Again?")
  updateScores();

}

function updateScores() {
  scoreList.innerHTML = "";
  // Render a new li for each todo
  for (let i = 0; i < keptScore.length; i++) {
    let score = keptScore[i];
    let allLists = document.querySelectorAll("li");

    let li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);
    scoreList.appendChild(li);
  }
}

iniBtn.addEventListener("click",function(){
  let initials = inputText.value.trim() + " : " + points + " Points.";

  scoreList.classList.remove("hidden");
  keptScore.push(initials);
  inputText.value = "";
  scoreScreen();
  storeScores();
});

function storeScores() {
  localStorage.setItem("keptScore", JSON.stringify(keptScore));
  
}

for (let i = 0; i < answerBtn.length; i++) {
  answerBtn[i].addEventListener("click", checkAnswer);
}

startButton.addEventListener("click", startQuiz);

updateScores();