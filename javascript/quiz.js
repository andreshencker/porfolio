const questions=[
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Marketing Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlink and Text Markup Language", correct: false },
        ]
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            { text: "<script>", correct: false },
            { text: "<style>", correct: true },
            { text: "<css>", correct: false },
            { text: "<link>", correct: false },
        ]
    },
    {
        question: "Which property is used to change the background color in CSS?",
        answers: [
            { text: "color", correct: false },
            { text: "background-color", correct: true },
            { text: "bgcolor", correct: false },
            { text: "color-background", correct: false },
        ]
    },
    {
        question: "How do you add a comment in a CSS file?",
        answers: [
            { text: "// This is a comment", correct: false },
            { text: "<!-- This is a comment -->", correct: false },
            { text: "/* This is a comment */", correct: true },
            { text: "' This is a comment", correct: false },
        ]
    },
    {
        question: "Which JavaScript method is used to write on the browser's console?",
        answers: [
            { text: "browser.log()", correct: false },
            { text: "console.write()", correct: false },
            { text: "console.log()", correct: true },
            { text: "log.console()", correct: false },
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button")
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=>{
        if (button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You score ${score} out of ${questions.length}!`
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block"
}
function  handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex<questions.length){
        showQuestion()
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();

    }
});
startQuiz();
