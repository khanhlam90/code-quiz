// set up variables with array/objects for questions:
var questions = [
    {
        quesion:"How would you append the following to the DOM? var myDiv = document.createElement(\"\"div\"\");",
        choices: [
            "1. myDiv.appendChild.document.body;", 
            "2. document.body.appendChild(myDiv);", 
            "3. document.body.appendChild = myDiv;", 
            "4. document.body.appendChild(\"div\");"
        ],
        answer: "2. document.body.appendChild(myDiv);"
    },
    {
        quesion:"You would like to set var classAttribute equal to an element's class attribute so that you can use the variable later in your code. Which of the following would accomplish this?",
        choices:[
            "1. var classAttribute = element.setAttribute(\"class\");",
            "2. var classAttribute = element.setAttribute(\"class\", \"classAttribute);",
            "3. var classAttribute = element.getAttribute(\"class\");",
            "4. var classAttribute = element.removeAttribute(\"class);"
        ],
        answer: "3. var classAttribute = element.getAttribute(\"class\");"
    },
    {
        quesion:"How do we declare a conditional statement in JavaScript?",
        choices:[
            "1. difference...between",
            "2. for loop",
            "3. if...else",
            "4. while loop"
        ],
        answer:"3. if...else"
    },
    {
        quesion:"What value would we add to setInterval() if we want a function called, myTimer() to run every 3 seconds?",
        choices:[
            "1. setInterval(myTimer, 300)",
            "2. setInterval(myTimer, 30)",
            "3. setInterval(myTimer, 3000)",
            "4. setInterval(myTimer, 3)"
        ],
        answer:"3. setInterval(myTimer, 3000)"
    },
    {
        quesion:"Which statement best describes what is happening to data when it is persisted to local storage?",
        choices:[
            "1. event.addEventListener()",
            "2. event.preventDefault()",
            "3. event.stopPropagation()",
            "4. event.target"
        ],
        answer:"4. event.target"
    },
];
 // set up variables
var score = 0;
var questionIndex = 0;

var timeLapse = document.querySelector("#timelapse");
var startQuiz = document.querySelector("#startquiz");
var quizArea = document.querySelector("#quizarea");



var timer = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

// Start quiz by trigger event listener "click";
startQuiz.addEventListener("click", function () {
    
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timer--;
            timeLapse.textContent = "Time: " + timer;

            if (timer <= 0) {
                clearInterval(holdInterval);
                allDone();
                timeLapse.textContent = "Time's up!";
            }
        }, 1000);
    }
    runQuiz(questionIndex);
});

// Run quiz's questions and choices: 
function runQuiz(questionIndex) {

    // to clear the quiz's content on landing page
    quizArea.innerHTML = "";
    ulCreate.innerHTML = "";

    // this should be diabled/cleared out when player starts the quiz, to avoid quiz interuptions:
    //headerlink.innerHTML = "";

    // for loops to loop thru all questions
    for (var i = 0; i < questions.length; i++) {

        // to append question to quizArea
        //set quiz question and choices values:
        var quizQuestion = questions[questionIndex].quesion;
        var quizChoices = questions[questionIndex].choices;

        quizArea.setAttribute("class", "m-5 col-10 text-left font-weight-bold");
        quizArea.textContent = quizQuestion;
    }
    // create unordered listing for each choice:
    quizChoices.forEach(function (newItem) {
        var choiceItem = document.createElement("li");
        choiceItem.textContent = newItem;
        choiceItem.setAttribute("id","listyle");
        choiceItem.setAttribute("class","mt-3 col-8 text-left list-unstyled text-white");
        quizArea.appendChild(ulCreate);
        ulCreate.appendChild(choiceItem);
        choiceItem.addEventListener("click", (validateAnswer));
    })
}
// Event to validate player's answer choice with answer
function validateAnswer(event) {
    var element = event.target;

    //if player clicked on any "li" answer
    if (element.matches("li")) {
        
        //if clicked on any li, create div for right/wrong answer response
        var alertResponse = document.createElement("div");
        alertResponse.setAttribute("id", "alertResponse");
        alertResponse.setAttribute("class", "mt-5 col-12 border-top text-left");
        
        // if player's clicking matches answer in question array, then textcontent to div above "Right!":
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            alertResponse.textContent = "Correct!";
            
            // otherwise, substract 10 points from timer and textcontent "Wrong!" to div above: 
        } else {
            timer = timer - penalty;
            alertResponse.textContent = "Wrong!";
        }

    }
    // increment the index
    questionIndex++;

    // when player reaches over last questions, allDone() will takes place
    if (questionIndex >= questions.length) {
        allDone();

        //otherwise, continue the quiz until reach the last question:
    } else {
        runQuiz(questionIndex);
    }
    quizArea.appendChild(alertResponse);

}
// set up allDone function:
function allDone() {

    // to clear the quiz's question zone:
    quizArea.innerHTML = "";
    timeLapse.innerHTML = "";

    // create new h1 message saying "All Done!"
    var allDoneH1 = document.createElement("h1");
    allDoneH1.setAttribute("id", "allDoneH1");
    allDoneH1.setAttribute("class", "col-10 text-left font-weight-bold");
    allDoneH1.textContent = "All Done!"

    quizArea.appendChild(allDoneH1);

    // create a paragraph holder for player's score:
    var allDoneMessage = document.createElement("p");
    allDoneMessage.setAttribute("id", "allDoneMessage");
    allDoneMessage.setAttribute("class","mt-4 col-10 text-left font-weight-normal");

    quizArea.appendChild(allDoneMessage);

    // Get the current score after finishing quiz:
    if (timer >= 0) {
        var timeRemaining = timer;
        //var allDoneMessage2 = document.createElement("p");
        clearInterval(holdInterval);
        allDoneMessage.textContent = "Your final score is: " + timeRemaining;
        //quizArea.appendChild(allDoneMessage2);
    }

    // Call player's initials by vreating label
    var initialsCall = document.createElement("label");
    initialsCall.setAttribute("id", "initialsCall");
    initialsCall.setAttribute("class","mt-4 text-left font-weight-normal");
    initialsCall.textContent = "Enter your initials: ";

    quizArea.appendChild(initialsCall);

    // creating input for player's initials (could be empty):
    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("id", "initials");
    initialsInput.setAttribute("class","m-3");
    initialsInput.textContent = "";

    quizArea.appendChild(initialsInput);

    // creating a submit button
    var initialsSubmitBtn = document.createElement("button");
    initialsSubmitBtn.setAttribute("type", "submit");
    initialsSubmitBtn.setAttribute("id", "submit");
    initialsSubmitBtn.setAttribute("class","ml-3 btn btn-primary btn-lg")
    initialsSubmitBtn.textContent = "Submit";

    quizArea.appendChild(initialsSubmitBtn);

    // Tp capture player's initials and set local storage for initials and score
    initialsSubmitBtn.addEventListener("click", function () {
        var initials = initialsInput.value;
        
        //set final score object:
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        
        // recall from local storage and record new score:
        var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
        
            allScores.push(finalScore);
            
            var newScore = JSON.stringify(allScores);
            
            localStorage.setItem("allScores", newScore);
            
            // take player to high score page:
            window.location.replace("high-score.html");
    });

}
