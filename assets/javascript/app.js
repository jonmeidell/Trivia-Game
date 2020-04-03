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
        answers: ["Ice Man", "Rogue", "Beast", "Angel"],
        correct: "1"
    },
    {
        question: "Who claimed to be the first mutant?",
        image: "assets/images/apocalypse.jpg",
        answers: ["Woverine", "Xavier", "Apocalypse", "Magneto"],
        correct: "2"
    },
    {
        question: "Who is the father of Cable?",
        image: "assets/images/cable.jpg",
        answers: ["Cyclops", "Wolverine", "Ice Man", "Pyro"],
        correct: "0"
    },
    {
        question: "Who was not born a mutant?",
        image: "assets/images/deadpool.jpg",
        answers: ["Angel", "Magneto", "Deadpool", "Rogue"],
        correct: "2"
    }
];

var startGame = document.getElementById("startGame");
var quizBody = document.getElementById("quizBody");
var questions = document.getElementById("questions");
var questionImages = document.getElementById("questionImages");
var answers = document.getElementById("answers");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var score = document.getElementById("score");
var scoreContainer = document.getElementById("scoreContainer");
var lastQuestion = questions.length - 1;
var questionTime = 10;
let TIMER;
var right = 0;
// should I use let or var
let count
var runningQuestion = 0;



start.addEventListener("click", startGame);
$(".startButton").on("click", function() {
    startGame();
})

function startGame() {
    runningQuestion = 0;
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// not sure if I want to keep
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// not sure if I want to keep or just alter
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
        right++;
//        answerIsCorrect();
//    } else {
//        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show score
//        clearInterval(TIMER);
        score();
    }
}

//function answerIsCorrect() {
//    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
//}

//function answerIsWrong() {
//    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
//}

function score() {
    scoreDiv.style.display = "block";
    const scorePerCent = Math.round(100 * right / questions.length);
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}