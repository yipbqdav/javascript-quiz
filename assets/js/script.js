// generateBtn.addEventListener("click", restartGame);
// let currentQuestion = 0;

// const questions = [
//     {
//         question: "what was the original name of javascript?",
//         answers: [
//             {option1:"mocha",answer:true},
//             {option2:"latte",answer:false},
//             {option3:"espresso",answer:false},
//             {option4:"java",answer:false},
//         ]
//     },

//     {
//         question: "what kind of language is javascript?",
//         answers: [
//             {option1:"object based",answer:true},
//             {option2:"logical",answer:false},
//             {option3:"procedural",answer:false},
//             {option4:"object oriented",answer:false}
//         ]
//     }
// ]
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const playButton = document.getElementById("play");
const playAgain = document.getElementById("playAgain");
const questions = [
    {
        question: "what was the original name of Javascript?",
        answers: {
            A: "mocha",
            B: "latte",
            C: "espresso",
            D: "java"
        },
        correctAnswer: "a"
    },
    {
        question: "what kind of language is javascript?",
        answers: {
            A: "logical",
            B: "procedural",
            C: "object based",
            D: "object oriented"
        },
        correctAnswer: "c"
    },
];

/*
function initGame() {
    const output = [];

    questions.forEach(
        (currentQuestion, questionNumber) => {

            const answers = [];

            for(let letter in currentQuestion.answers){
                //console.log(letter);
                answers.push(
                    `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        }
    );

    quizContainer.innerHTML = output.join('');
}
*/

function initGame() {
    playAgain.style.display = 'none';
    nextButton.style.display = 'none';
    previousButton.style.display = 'none';
    submitButton.style.display = 'none';
}

document.onload = initGame();


function showResults(){

    const answerContainers = quizContainer.querySelectorAll('.answers');

    let numCorrect = 0;

    questions.forEach( (currentQuestion,questionNumber) => {

        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;

            answerContainers[questionNumber].style.color = 'lightgreen';
        }

        else{
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;
}



function showSlide(n) {
    // pull from the nth value of questions
    let currentSlide = questions[n]
    // add to innerhtml of page
    document.getElementById("quiz").innerHTML = `
    <form id="question-form">
    <label>
    <input type="radio" name="question${n}" value="A">
    A :
    ${currentSlide.answers["A"]}
    </label>
    
    
        <label>
            <input type="radio" name="question${n}" value="B">
            B :
            ${currentSlide.answers["B"]}
        </label>
    
    
    <label>
    <input type="radio" name="question${n}" value="C">
    C :
    ${currentSlide.answers["C"]}
    </label>
    
    
    <label>
    <input type="radio" name="question${n}" value="D">
    D :
    ${currentSlide.answers["A"]}
    </label>
    </form>
    `

}

function showNextSlide(){
    const form = new FormData(document.getElementById("question-form"))
    console.log(form, document.getElementById("question-form"))
    currentSlide++;
    showSlide(currentSlide);
}

function showPreviousSlide(){
    currentSlide--;
    showSlide(currentSlide);
}

//playGame();

//document.onload = function(){playGame()}


let currentSlide = 0;




previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
submitButton.addEventListener('click', showResults);
playButton.addEventListener('click', startGame);



// timer

var timer;
var timeLeft = 60;

function startGame() {
    setTimer();
    showSlide(currentSlide);
    nextButton.style.display = 'inline-block';
    playButton.style.display = 'none';
}


function setTimer() {
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft = timeLeft - 1;
    if(timeLeft >=0)
        document.getElementById("timer").innerHTML = timeLeft;
        //$('timer').html(timeLeft);
    else {
        gameOver();
    }
}

function gameOver() {
    clearInterval(timer);
    //cancelInterval(timer);
    if(timer === 0)
        showResults();
}