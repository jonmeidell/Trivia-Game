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
var questionsDiv = document.getElementById("questions");
var questionImages = document.getElementById("questionImages");
var answersDiv = document.getElementById("answers");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var scoreDiv = document.getElementById("score");
var scoreContainer = document.getElementById("scoreContainer");
var lastQuestion = questions.length - 1;
var questionTime = 10;
let TIMER;
var right = 0;
// should I use let or var
let count
var runningQuestion = 0;

// look through all functions to find errors
// make sure everything is defined
// console log to check functionality


startGame = function () {
    runningQuestion = 0;
    renderQuestion();
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

$(".startButton").on("click", function () {
    startGame();
})

renderQuestion = function () {
    $(answersDiv).empty();
    // pull fromt he quest array, use runningQuestion as the index
    var displayQuestion = questions[runningQuestion];
    quizBody.style.display = "block";
    questionsDiv.innerHTML = displayQuestion.question;

    for (var i = 0; i < displayQuestion.answers.length; i++) {
        answersDiv.innerHTML += displayQuestion.answers[i];
        var answerButton = $("<button>");
        answerButton.attr("data-number", i);
        answerButton.html(displayQuestion.answers[i]);
        $(answersDiv).append(answerButton);
    }





    // question array
    runningQuestion++;
    // running question
    // increment runningQuestion
}
// start timer
// display questions (random order)?
// place in questions div
// diplay answers in buttons
// display question image after answer is chosen
// wait 4 seconds before going to next question
// restart timer after each question



// set to restart after each question is answered
var sec = 10
var timer = setInterval(function () {
    //put in message of time remaining
    $('#hideMsg span').text(sec--);
    if (sec == -1) {
        clearInterval(timer);
        // add in go to next question
    }
}, 1000);

renderProgress = function () {
    for (let quizProgress = 0; quizProgress <= lastQuestion; quizProgress++) {
        //progress.innerHTML += "<div class='prog' id=" + quizProgress + "></div>";
    }
}

renderCounter = function () {
    if (count <= questionTime) {
        counter.innerHTML = count;
        count++
    } else {
        count = 0;

        //answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            score();
        }
    }
}

checkAnswer = function (answer) {
    if (answer == questions[runningQuestion].correct) {
        right++;
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
        score();
    }
}

score = function () {
    scoreDiv.style.display = "block";
    const scorePerCent = Math.round(100 * right / questions.length);
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}