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
const questions = [
    {
        question: "what was the original name of Javascript?",
        answers: {
            a: "mocha",
            b: "latte",
            c: "espresso",
            d: "java"
        },
        correctAnswer: "a"
    },
    {
        question: "what kind of language is javascript?",
        answers: {
            a: "logical",
            b: "procedural",
            c: "object based",
            d: "object oriented"
        },
        correctAnswer: "c"
    },
];

(function(){
function playGame() {
    const output = [];

    questions.forEach(
        (currentQuestion, questionNumber) => {

            const answers = [];

            for(letter in currentQuestion.answers){

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
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
        previousButton.style.display = 'none';
    }
    else{
        previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide(){
    showSlide(currentSlide + 1);
}

function showPreviousSlide(){
    showSlide(currentSlide - 1);
}

playGame();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;


showSlide(currentSlide);



previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
submitButton.addEventListener('click', showResults);

})();
