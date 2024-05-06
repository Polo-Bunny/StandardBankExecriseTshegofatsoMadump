const probElement =  document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourFeild = document.querySelector(".our-feild")
const scoreObtained = document.querySelector(".score-obtained")
const questionsRemaining = document.querySelector(".questions-remaining")
const questionProgress = document.querySelector(".progress-inner")
const quizEnd = document.querySelector(".end-message")
const resetButton = document.querySelector(".rest-button")
let state ={
    score:0,
    QuestionCount: 10,
}

function updateProblem()
{
    state.currentProblem = generateProb()
    problemElement.innerHTML =`${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
    ourFeild.value = ""
    ourFeild.focus()
}
function generateNum(max)
{
    return Math.floor(Math.random()*( max +1 ))
}



function generateProb()
{
    return {
        numberOne: generateNum(10),
        numberTwo: generateNum(10),
        operator: ['+','-','x','/'][generateNum(3)]
    }
}

ourForm.addEventListener("submit",Submithandeling)

function Submithandeling(evt)
{
    //Stops browser from reloading and redirecting
    evt.preventDefault()
    let correctAns
    const prob = state.currentProblem
    if(prob.operator == "+") {
        prob.numberOne = generateNum(12)
        prob.numberTwo = generateNum(12)
        correctAns = prob.numberOne + prob.numberTwo}

    if(prob.operator == "-"){
        prob.numberOne = generateNum(12)
        prob.numberTwo = generateNum(12) 
        correctAns = prob.numberOne - prob.numberTwo}

    if(prob.operator == "x"){
        prob.numberOne = generateNum(50)
        prob.numberTwo = generateNum(50) 
        correctAns = prob.numberOne * prob.numberTwo
    }
    if(prob.operator == "/"){
        prob.numberOne = generateNum(50)
        prob.numberTwo = generateNum(50) 
        correctAns = prob.numberOne / prob.numberTwo}

    if(parseInt(ourFeild.value,10) === correctAns)
    {
        state.score++
        alert("Correct Answer")
        questionsRemaining.textContent = 10 - state.score
        updateProblem()
        displayQuestionBar()
    }else
    {
        state.QuestionCount--
     
        scoreObtained.textContent = state.score
        probElement.classList.add("animate-wrong")
    setTimeout(() =>         probElement.classList.remove("animate-wrong"),331)
     }
    QuizCheck()

}
function QuizCheck()
{
    if(state.QuestionCount === 0)
    {

        quizEnd.textContent ="You have completed the quiz you got" + state.score +"/"+10+"would you like to play again"
        document.body.classList.add("overlay-is-open")
        //arrow function
        setTimeout(()=>focus(),332)
       // quizReset()

    }


}
resetButton.addEventListener("click",quizReset)

function quizReset()
{
    document.body.classList.remove("overlay-is-open")    
    updateProblem()
    state.score = 0
    state.questionsRemaining = 10
    questionsRemaining.textContent =10
    scoreObtained.textContent =0
    displayQuestionBar()

}

function displayQuestionBar()
{
    questionProgress.style.transform = `scaleX(${state.QuestionCount/10})`
}