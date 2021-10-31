// Declare variables:

//Variable with array/objects for questions
var questions = [
    {
        question:"How would you append the following to the DOM? var myDiv = document.createElement(\"\"div\"\");",
        choices: [
            "1. myDiv.appendChild.document.body;", 
            "2. document.body.appendChild(myDiv);", 
            "3. document.body.appendChild = myDiv;", 
            "4. document.body.appendChild(\"div\");"
        ],
        answer: "document.body.appendChild(myDiv);"
    },
    {
        question:"You would like to set var classAttribute equal to an element's class attribute so that you can use the variable later in your code. Which of the following would accomplish this?",
        choices:[
            "1. var classAttribute = element.setAttribute(\"class\");",
            "2. var classAttribute = element.setAttribute(\"class\", \"classAttribute);",
            "3. var classAttribute = element.getAttribute(\"class\");",
            "4. var classAttribute = element.removeAttribute(\"class);"
        ],
        answer: "var classAttribute = element.getAttribute(\"class\");"
    },
    {
        question:"How do we declare a conditional statement in JavaScript?",
        choices:[
            "1. difference...between",
            "2. for loop",
            "3. if...else",
            "4. while loop"
        ],
        answer:"if...else"
    },
    {
        question:"What value would we add to setInterval() if we want a function called, myTimer() to run every 3 seconds?",
        choices:[
            "1. setInterval(myTimer, 300)",
            "2. setInterval(myTimer, 30)",
            "3. setInterval(myTimer, 3000)",
            "4. setInterval(myTimer, 3)"
        ],
        answer:"setInterval(myTimer, 3000)"
    },
    {
        question:"Which statement best describes what is happening to data when it is persisted to local storage?",
        choices:[
            "1. event.addEventListener()",
            "2. event.preventDefault()",
            "3. event.stopPropagation()",
            "4. event.target"
        ],
        answer:"event.target"
    },
];


var score = 0;

var questionIndex = 0;

var timeRemaining = document.querySelector("#timer");
var startQuiz = document.querySelector("#start-quiz");
var quizArea = document.querySelector("#quiz-area");

var timeLeft = 76;
var holdTimer = 0;
var penalty = 10;
var questionCreate = document.createElement("ul");

startQuiz.addEventListener("click", function() {
    if (holdTimer === 0) {
        holdTimer = setInterval(function() {
            timeLeft--;
            timeRemaining.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(holdTimer);
                allDone();
                timeRemaining.textContent = "Time's up!";
            }
        }, 1000);
    }
    runQuiz(questionIndex);
});

function runQuiz(questionIndex) {
    quizArea.innerHTML = "";
    questionCreate.innerHTML = "";

    for (var i = 0; i<questions.length; i++) {
        var runQuestion = questions[questionIndex].question;
        var runChoices = questions[questionIndex].choices;
        quizArea.textContent = runQuestion;
    }

    runChoices.forEach(function(newItem) {
        var listItem = document.createElement("li");
        listItem.setAttribute("class", "m-4 col-12 text-left");
        listItem.textContent = newItem;
        quizArea.appendChild(questionCreate);
        questionCreate.appendChild(listItem);
        listItem.addEventListener("click", validate);
    })
};

function validate(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].answer){
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            
        } else {
            timeLeft = timeLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }
    }

    questionIndex++;

    if (questionIndex >= questions.length) {

        allDone();

        createDiv.textContent = "All Done!" + " " + "Your final score is  " + score + "/" + questions.length + " Correct!";
    } else {
        runQuiz(questionIndex);
    }
    quizArea.appendChild(createDiv);
}

function allDone () {
    quizArea.innerHTML = "";
    timeRemaining.innerHTML = "";

    var createH1=document.createElement("h1");
    createH1.setAttribute("id","createH1");
    createH1.textContent="All Done!";

    quizArea.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id","createP");

    quizArea.appendChild(createP);

    if (timeRemaining>=0) {
        var timeLeft = timeRemaining;
        var createP2=document.createElement("p");
        clearInterval(holdTimer);
        createP.textContent = "Your final score is: " + timeLeft;

        quizArea.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    quizArea.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    quizArea.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";

    quizArea.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeLeft
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}