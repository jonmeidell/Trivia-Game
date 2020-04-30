var questions = [
    {
        question: "Which person leads the X-Men?",
        image: "assets/images/xavier.jpg",
        answers: ["Xavier", "Beast", "Jean Grey", "Colossus"],
        correct: "0"
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
var scoreDiv = document.getElementById("score");
var scoreContainer = document.getElementById("scoreContainer");
let TIMER;
let right = 0;
let wrong = 0;
// let unanswered = 0; possibly add in feature on later version
let timeLeft = 10;
let runningQuestion = 0;

// not diplaying all the questions

startGame = function () {
    runningQuestion = 0;
    renderQuestion();
    renderProgress();
}

$(".startButton").on("click", function () {
    startGame();
    // hides start button
    $(".startButton").hide();
})

renderQuestion = function () {
    console.log(runningQuestion);
    // timer is hidden after each question is answered/timer runs-out
    $("#timer").show();
    renderCounter(); // 1000ms = 1s
    $(questionImages).empty();
    $(answersDiv).empty();
    var displayQuestion = questions[runningQuestion];
    quizBody.style.display = "block";
    questionsDiv.innerHTML = displayQuestion.question;

    for (var i = 0; i < displayQuestion.answers.length; i++) {
        var answerButton = $("<button>");
        $(answerButton.addClass("answer-button"));
        answerButton.attr("data-number", i);
        answerButton.html(displayQuestion.answers[i]);
        $(answersDiv).append(answerButton);
    }
    runningQuestion++;
}
// display questions (random order) - add in feature in later version

renderProgress = function () {
    for (let quizProgress = 0; quizProgress <= questions.length; quizProgress++) {
    }
}

renderCounter = function () {
    // makes sure timer starts displaying at 10
    $("#counter").text("10");
    timeLeft = 10;
    TIMER = setInterval(function () {
        timeLeft--;

        if (timeLeft <= 0) {
            wrong++; // change to unanswered when feature is added in
            // shows correct answer
            let displayQuestionImage = questions[runningQuestion - 1];
            quizBody.style.display = "block";
            let image = $("<img>");
            $(image).attr("src", displayQuestionImage.image);
            $(image).appendTo(questionImages);
            let correctAnswer = questions[runningQuestion - 1].answers[displayQuestionImage.correct];
            $("<p> The correct answer is " + correctAnswer + "</p>").appendTo(questionImages);
            clearInterval(TIMER);
            $('#timer').hide();
            setTimeout(renderQuestion, 4000);

            if (runningQuestion < questions.length) {

            } else {
                // end the quiz and show score
                clearInterval(TIMER);
                // clear out picture and answers
                score();
            }
        };
        counter.textContent = timeLeft;
    }, 1000);
}

checkAnswer = function (answer) {
    var displayQuestionImage = questions[runningQuestion - 1];
    quizBody.style.display = "block";
    var image = $("<img>");
    $(image).attr("src", displayQuestionImage.image);
    $(image).appendTo(questionImages);
    var correctAnswer = questions[runningQuestion - 1].answers[displayQuestionImage.correct];
    $("<p> The correct answer is " + correctAnswer + "</p>").appendTo(questionImages);

    if (parseInt(answer) === parseInt(questions[runningQuestion - 1].correct)) {
        right++;
    } else {
        wrong++;
    }

    if (runningQuestion < questions.length) {
        clearInterval(TIMER);
        $("#answers").empty();
        $('#timer').hide();
        setTimeout(renderQuestion, 4000);
    } else {
        // end the quiz and show score
        clearInterval(TIMER);
        $("#timer").hide();
        // clear out picture and answers
        score();
    }
}

$("body").on("click", ".answer-button", function () {
    var answer = $(this).attr("data-number");
    checkAnswer(answer);
});

score = function () {
    $("#answers").empty();
    $("#questions").empty();
    $('#timer').hide();
    scoreDiv.style.display = "block";
    const scorePerCent = Math.round(100 * right / questions.length);
    scoreDiv.innerHTML += "<p>Your score is " + scorePerCent + "%</p>";
    $(".startButton").show();
};