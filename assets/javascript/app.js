var questions = [
    {
        question: "Which person leads the X-Men?",
        image: "assets/images/xavier.jpg",
        answers: ["Xavier", "Beast", "Jean Grey", "Colossus"],
        correct: "3"
    },
    {
        question: "Who was not on the original X-Men team?",
        image: "assets/images/first.jpg",
        answers: ["Ice Man", "Rogue", "Beast", "Agel"],
        correct: "1"
    },
    {
        question: "Who claimed to be the first mutant?",
        image: "assets/images/apocalypse.jpg",
        answers: ["Woverine", "Xavier", "Apocalypse", "Magneto"],
        correct: "2"
    },
    {
        question: "",
        image: "",
        answers: [""],
        correct: ""
    },
    {
        question: "",
        image: "",
        answers: [""],
        correct: ""
    }
];

var startGame = document.getElementById("startGame");
var quizBody = document.getElementById("quizBody");
var questions = document.getElementById("questions");
var questionImages = document.getElementById("questionImages");
var choiceA = document.getElementById("choiceA");
var choiceB = document.getElementById("choiceB");
var choiceC = document.getElementById("choiceC");
var choiceD = document.getElementById("choiceD");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var score = document.getElementById("score");
var scoreContainer = document.getElementById("scoreContainer");
var lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
var questionTime = 10;
var gaugeWidth = 150;
var gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startGame);
$(".startButton").on("click", function() {
    startGame();
})

function startGame() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;

        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show score
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender() {
    scoreDiv.style.display = "block";
    const scorePerCent = Math.round(100 * score / questions.length);
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}