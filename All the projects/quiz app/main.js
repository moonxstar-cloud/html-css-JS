//  Array of Questions
 
 const questions = [
    {   
        // question in  string
        
        question:"Which is the largest animal in the world?",
        //  array of answers
        answers:[
            // answer is an object containing
            // text (answer option),
            // correct (whether it’s the right answer or not)
            { text:"Shark",correct:false},
            { text:"Blue Whale",correct:true},
            { text:"Elephant",correct:false},
            { text:"Giraffe",correct:false}
        ]

    },

    {
        question:"Which is the largest desert in the world?",
        answers:[
            { text:"Kalahari",correct:false},
            { text:"Gobi",correct:false},
            { text:"Sahara",correct:true},
            { text:"Antartica",correct:false}
        ]

    },

    {
        question:"Which is the smallest continent in the world?",
        answers:[
            { text:"Asia",correct:false},
            { text:"Australia",correct:true},
            { text:"Artic",correct:false},
            { text:"Africa",correct:false}
        ]

    },

    {
        question:"Which is the smallest country in the world?",
        answers:[
            { text:"Vatican city",correct:true},
            { text:"Bhutan",correct:false},
            { text:"Nepal",correct:false},
            { text:"Sri Lanka",correct:false}
        ]

    },
 ];
// Displays the current question
const  questionElement =document.getElementById("question");
// Holds the answer choices
const  answerButton =document.getElementById("answer-buttons");
//  button used to move to the next question.
const  nextButton =document.getElementById("next-btn");


// Tracks the current question.
let curentQuestionIndex=0;
// Keeps track of the player's score.
let score=0;

// function resets the quiz
function startQuiz(){
    curentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    // if curentQuestionIndex is 0, this gets the first question.
    // questions is an array
    // curentQuestionIndex is a number that tracks which question we're on.
    // currentQuestion will store the question at the current index
    let currentQuestion=questions[curentQuestionIndex];
    let questionNo=curentQuestionIndex +1;
    // questionElement is the part of your webpage where the question will be displayed.
    // innerHTML is used to insert content (text) inside this element.
    //  combines the question number and the actual question text.
    questionElement.innerHTML=questionNo +". "+currentQuestion.question;

    // This starts a loop to go through each possible answer for the current question. 
    // The forEach function runs once for each answer in currentQuestion.answers. 
    // The answer is a placeholder for each answer option as we loop through them.
    currentQuestion.answers.forEach(answer=> {
        // creates a new button for each answer
        const button=document.createElement("button");
        // This line adds text to the button.
        button.innerHTML=answer.text;
        // This line adds a CSS class called "btn" to the button.
        button.classList.add("btn");
        // this line adds the button we just created to the webpage.
        answerButton.appendChild(button);
        // it's checking: "Is this answer the right one? if yes then
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        // if (answer.correct) {
        //     button.classList.add("correct");
        // }
        

        button.addEventListener("click", selectAnswer);
    });

}



function resetState(){
    // Next" button is hidden so it doesn't appear
    //  until the user answers the current question.
    nextButton.style.display="none";
    // The function removes all the answer buttons from the 
    // screen to make space for the next question's answers.
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

// function will handle what happens when a user selects an answer by clicking a button.
function selectAnswer(e){
    // e is the event that occurs when the user clicks a button.
    // e.target gives us the specific element (button) that was clicked.

    // in short Which button did the user click
    const selectedBtn=e.target;
    //Is the selected button the correct answer?" 
    // retrieves the data-correct attribute from the button.This could be either "true" or "false". 
    const isCorrect =selectedBtn.dataset.correct=== "true";

    if(isCorrect){
        // If the selected button is correct, this line adds a CSS class called "correct" to the button.
        selectedBtn.classList.add("correct");
        score++;
    }else{
        // line adds a CSS class called "incorrect" to the button when the user selects the wrong answer.
        selectedBtn.classList.add("incorrect");
    }
    // This converts the HTMLCollection of child elements (buttons) under the answerButton container into an array. 
    // This starts a loop that goes through each button in the array. 
    
    Array.from(answerButton.children).forEach(button => {
        
        // Mark the correct answer even if it wasn't selected
        if (button.dataset.correct === "true") {
            // If the condition is true (meaning the answer is correct), 
            // it adds the correct CSS class to the button
            button.classList.add("correct");
        }
        //   this line disables the current button, preventing any further interaction 
        // with it after the answer has been selected
        button.disabled = true;
    });
    // this line makes the "Next" button visible so that the user can proceed to the next question.
    nextButton.style.display = "block";
}
// This line listens for clicks on the Next button
nextButton.addEventListener("click",()=>{
    // if the current question index (curentQuestionIndex) is less than the total number of questions (questions.length).
    if(curentQuestionIndex<questions.length){
        // If true, it calls the handleNextButton() function to move to the next question.
        handleNextButton();
    }else {
        // If false, it calls the startQuiz() function to restart the quiz.
        startQuiz();
    }
})

function handleNextButton(){
    // this function increases the current question index by 1
    curentQuestionIndex++;
    // it checks again if there are more questions.
    if(curentQuestionIndex<questions.length){
        // If yes, it calls showQuestion() to display the next question.
        showQuestion();
    }else{
        // If no, it calls showScore() to display the score.
        showScore();
    }
}

function showScore(){
    // This function resets any previous state 
    resetState();
    // It then displays the score in the questionElement
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    // It changes the text of the Next button to Play again.
    nextButton.innerHTML="Play again";
    // Finally, it makes the Next button visible again.
    nextButton.style.display="block";
}
startQuiz();