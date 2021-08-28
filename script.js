var quizSections = document.querySelectorAll(".quiz-selection");

//for the start button section
var start = document.getElementById("start");
var startBtn = document.getElementById("start-button");
var highScoresButton = document.getElementById("high-scoresbtn");

//for the quiz questions
var questionSection = document.getElementById("question-section");
var highScoreSection = document.getElementById("high-scores");
var timeRemaining = document.getElementById("time-remaining");
var question = document.getElementById("question");
var choices = document.getElementById("choices");
var highScoresDisplay = document.getElementById("high-scores-display");
var choiceStatus = document.querySelectorAll(".choice-status");
var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong");
console.log("hello")
//for end of quiz
var endSection = document.getElementById("end");
var endTitle = document.getElementById("end-title");
var score = document.getElementById("score");
var initials = document.getElementById("initials");
var submitScore = document.getElementById("submit-score");
var error = document.getElementById("error-message");

//Quiz Questions
var questionList = [
    {
        question: "Inside which HTML element do we put the JavaScript? ", 
        answers: ["<script>", "<scripting>", "<javascript>", "<js>"],
        correct: "<script>",
        indexOfCorrectChoice: 0 
    },
    {
        question: "Where is the correct place to insert a JavaScript? ", 
        answers: ["the <head> and <body> sections", "<body> section", "<head> section", "none of the above"],
        correct: "<body> section",
        indexOfCorrectChoice: 1 
    },
    {
        question: "How do you write 'Hello World' in an alert box? ", 
        answers: ["msgalert('Hello World');", "msg('Hellow World');", "msghello('Hellow World');", "alert('Hellow World');"],
        correct: "alert('Hellow World')",
        indexOfCorrectChoice: 3  
    },
    {
        question: "How do you create a function in js ", 
        answers: ["function:myFunction()", "function myFunction()", "function = myFunction", "createFunction()"],
        correct: "function myFunction()",
        indexOfCorrectChoice: 1  
    },
    {
        question: "How do you add a comment in JavaScript? ", 
        answers: ["//This is a comment", "<!--This is a comment-->", "'This is a comment", "/*This is a comment */"],
        correct: "//This is a comment",
        indexOfCorrectChoice: 0  
    },
];

let currentQuestion = 0;
let totalTime = 60;
let totalTimeInterval;
let choiceStatusTimeout;

//Event Listeners

startBtn.addEventListener("click", startGame);
highScoresButton.addEventListener("click", displayHighScore);
choices.addEventListener("click", processChoice);
submitScore.addEventListener("submit", processInput);

//game starts

function startGame() {
    showElement(quizSections, questionSection);

    timeRemaining.textContent = totalTime;
    displayQuestion();
    startTimer();
}

//show hidden elements
function showElement(siblingList, showElement) {
    for (element of siblingList){
        hideElement(element);
    }
    showElement.classList.remove("hidden");
}

function hideElement(element) {
    if (!element.classList.contains("hidden")) {
        element.classList.add("hidden");
    }
}

function startTimer() {
    totalTimeInterval = setInterval(function() {
        totalTime--;
        timeRemaining.textContent = totalTime;
        checkTime();
    }, 1000);
}

function checkTime() {
    if (totalTime <=0) {
        totalTime =0;
        endGame();
    }
}

//questions
function displayQuestion() {
    question.textContent = questionList[currentQuestion].question;

    displayChoiceList();
}
function displayChoiceList() {
    choices.innerHTML = "";

    questionList[currentQuestion].answers.forEach(function(answer, index) {
        var li = document.createElement("li");
        li.dataset.index = index;
        var button = document.createElement("button");
        button.textContent = (index + 1) + ". " + answer;
        li.appendChild(button);
        choices.appendChild(li);
    });
}
//when question is answered
function processChoice(event) {
    var userChoice = parseInt(event.target.parentElement.dataset.index);

    resetChoiceStatusEffects();
    checkChoice(userChoice);
    if (currentQuestion >= questionList.length) {
        endGame();

    } else {
        getNextQuestion();
    }
}
function resetChoiceStatusEffects() {
    clearTimeout(choiceStatusTimeout);
    styleTimeRemainingDefault();
}
function styleTimeRemainingDefault() {
    timeRemaining.style.color = "#4616E8";
}
function styleTimeRemainingWrong () {
    timeRemaining.style.color = "E81648";
}
function checkChoice(userChoice) {
    if (isChoiceCorrect(userChoice)) {
        displayCorrectChoiceEffects();
    }   else {
        displayWrongChoiceEffects();
    }
}
function isChoiceCorrect(choice) {
    return choice === questionList[currentQuestion].indexOfCorrectChoice;
}
function displayWrongChoiceEffects() {
    deductTimeBy(10);

    styleTimeRemainingWrong();
    showElement(choiceStatus, wrong);

    choiceStatusTimeout = setTimeout(function() {
        hideElement(wrong);
        styleTimeRemainingDefault();
    }, 1000);
}
function deductTimeBy(seconds) {
    totalTime -= seconds;
    checkTime();
    timeRemaining.textContent = totalTime;
}
function displayCorrectChoiceEffects () {
    showElement(choiceStatus, correct);

    choiceStatusTimeout = setTimeout(function() {
        hideElement(correct);
    }, 1000);
}
//to get to next question
function getNextQuestion() {
    currentQuestion++;
    if (currentQuestion >= questionList.length) {
        endGame();
    } else {
        displayQuestion();
    }
}
//ending game
function endGame() {
    clearInterval(totalTimeInterval);
    showElement(quizSections, endSection);
    hideElement(questionSection)
    displayScore();
    setEndHeading();
}
function displayScore() {
    score.textContent = totalTime;
}
function setEndHeading() {
    if (totalTime ===0) {
        endTitle.textContent = "Game Over, time ran out!"
    } else {
        endTitle.textContent = "You win!"
    }
}
//initials
function processInput (event) {
    event.preventDefault();
    var initialsInput = document.getElementById("initials");
    var initials = initialsInput.value.toUpperCase().trim();
    var score = initials + " " + totalTime;
    localStorage.setItem("high-score", score)
}

//display high scores

function displayHighScore () {

    var highScore = localStorage.getItem("high-score");
    showElement(quizSections, highScoreSection);
    highScoresDisplay.innerHTML = highScore;
}


