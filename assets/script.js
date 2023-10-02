//Variables
var startButtonEl = document.getElementById('#start-button');
var timeEl = document.getElementById('#timer');

var questions = [
    {
        name: "Operators are reserved-words that perform action on values and variables. Which of the following is not an operator?",
        answers: ["+","===","*","?"],
        correct: 3,
    },
    {
        name: "Which of the following does not create a variable?",
        answers: ["var","be","let","const"],
        correct: 1,
    },
    {
        name: "From the options below, choose the function you would use to join two arrays.",
        answers: ["concat()","splice()","add()","push()"],
        correct: 0,
    },
    {
        name: "What keyword is used to check whether a given property is valid or not?",
        answers: ["if","then","in","exists"],
        correct: 2,
    },
    {
        name: "Which function is use to serialize an objedct into a JSON string in Javascript?",
        answers: ["serialize()","stringify()","convert()","null()"],
        correct: 1,
    },
    {
        name: "How do we write a comment in Javascript?",
        answers: ["//","<!--comment-->","##","/*/"],
        correct: 0,
    }
]

//Page displays instructions and start button

//User clicks start button

//First question appears and countdown timer begins

//User clicks button to answer the question

//If user clicked button === correct answer, display message correct and move to next question
//else display message incorrect, subtract 10 seconds, and move to next question

//Next question appears

//Game ends when all questions answered or timer ends

startButtonEl.on('onclick', setInterval)
    function(){
        (function(){
        var counter = 5;
        setInterval(function() {
            counter--;
            if (counter >= 0) {
            span = document.getElementById("count");
            span.innerHTML = counter;
            }
            if (counter === 0) {
                alert('sorry, out of time');
                clearInterval(counter);
            }
        }, 1000);
        })();
        }