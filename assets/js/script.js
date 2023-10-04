const questions = [
    {
        question: "Operators are reserved-words that perform action on values and variables. Which of the following is not an operator?",
        choices: ["+","===","*","?"],
        correctAnswer: 3,
    },
    {
        question: "Which of the following does not create a variable?",
        choices: ["var","be","let","const"],
        correctAnswer: 1,
    },
    {
        question: "From the options below, choose the function you would use to join two arrays.",
        choices: ["concat()","splice()","add()","push()"],
        correctAnswer: 0,
    },
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        choices: ["if","then","in","exists"],
        correctAnswer: 2,
    },
    {
        question: "Which function is use to serialize an object into a JSON string in Javascript?",
        choices: ["serialize()","stringify()","convert()","null()"],
        correctAnswer: 1,
    },
    {
        question: "How do we write a comment in Javascript?",
        choices: ["//","<!--comment-->","##","/*/"],
        correctAnswer: 0,
    }
]

const quizContainer = document.getElementById("quiz");
const questionContainer = document.getElementById("question");
const choicesContainer = document.getElementById("choices");
const resultsContainer = document.getElementById("results");

let currentQuestion = 0;
let score = 0;
let quizEnded = false;
let timerInterval; 
let timeLeft = 60; 
let wrongAnswers = 0;

// Start of quiz. Replaces the Start button with the timer and first question
function startQuiz() {
    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
    startTimer();
    displayQuestion();
}

// Starts the timer and shows the timer
function startTimer() {
    const timerContainer = document.getElementById("timer-container");
    timerContainer.style.display = "block";
    timerInterval = setInterval(() => {
        if (currentQuestion < questions.length) {
            timeLeft--;
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            const timerDisplay = document.getElementById("timer");
            timerDisplay.textContent = `Time Remaining: ${timeLeft} seconds`;
            if (timeLeft === 0) {
                clearInterval(timerInterval); 
                handleQuizEnd();
            }
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
}
    

// Event listener that starts the quiz when the "Start" button is clicked
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startQuiz);

//Functions for displaying questions
function displayQuestion() {
    const currentQuestionObj = questions[currentQuestion];
    questionContainer.textContent = currentQuestionObj.question;
    choicesContainer.innerHTML = '';

    // Creates buttons for each choice
    currentQuestionObj.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", () => {
            checkAnswer(index); 
        });
        choicesContainer.appendChild(choiceButton);
    });
}

//Checks the answers as long as time is remaining
function checkAnswer(answerIndex) {
    if (timeLeft <= 0) {
        return;
    }
    const currentQuestionObj = questions[currentQuestion];
    if (answerIndex === currentQuestionObj.correctAnswer) {
        score++; 
    } else {
        wrongAnswers++;
        timeLeft -= 10;
    }

    // Move to the next question or finish the quiz
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        displayResults();
    }
}

// End of Quiz. Stop timer. Alert if time expired. Display results. Ask for intials
function handleQuizEnd() {
    quizEnded = true;
    clearInterval(timerInterval);
    if (timeLeft <= 0) {
        alert("Time's up! Your quiz has ended.");
    } else {
        const initialsContainer = document.getElementById("initials-container");
        initialsContainer.style.display = "block";
        const resultsContainer = document.getElementById("results-container");
        resultsContainer.style.display = "block";
    }
}

function displayResults() {
    // Hide the question and choices containers
    questionContainer.style.display = "none";
    choicesContainer.style.display = "none";

    // Show the initials input field and save button
    const initialsContainer = document.getElementById("initials-container");
    initialsContainer.style.display = "block";

    // Display the user's score
    resultsContainer.textContent = `You scored ${score} out of ${questions.length} questions.`;
    resultsContainer.style.display = "block";
}

//Save user initials and score
const saveButton = document.getElementById("save-initials");
saveButton.addEventListener("click", () => {
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;

    if (initials.trim() !== "") {
        const userScore = {
            initials: initials,
            score: score
        };

        // Check for existing scores
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        // Add the user's score to the high scores array
        highScores.push(userScore);

        // Sort the high scores array in descending order (highest to lowest)
        highScores.sort((a, b) => b.score - a.score);

        // Keep only the top 5 high scores
        const topScores = highScores.slice(0, 5);

        // Save the updated high scores back to local storage
        localStorage.setItem("highScores", JSON.stringify(topScores));

        // Displays a confirmation message
        alert(`Score saved successfully!`);
    } else {
        // Handle empty input or validation as needed
        alert("Please enter your initials.");
    }
});


