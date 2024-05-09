const probElement =  document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourFeild = document.querySelector(".our-feild")
const scoreObtained = document.querySelector(".score-obtained")
const questionsRemaining = document.querySelector(".questions-remaining")
const questionProgress = document.querySelector(".progress-inner")
const quizEnd = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")
let state ={
    score:0,
    QuestionCount: 10,
    
}

function updateProblem()
{
    state.currentProblem = generateProb()
    probElement.innerHTML =`${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
    ourFeild.value = ""
    ourFeild.focus()
}
updateProblem()
function generateNum(max)
{
    return Math.floor(Math.random()*( max +1 ))
}



function generateProb()
{
   let tempNum1 =0
   let tempCorrect=0 
   let tempNum2=0
   let tempoperator = ['+','-','x','/'][generateNum(3)]

   switch(tempoperator){
    case'+':
    tempNum1= generateNum(12)
    tempNum2 = generateNum(12)
    tempCorrect = tempNum1 + tempNum2
    return {

        numberOne: tempNum1,
        numberTwo: tempNum2,
        operator: tempoperator,
        correctAns : tempCorrect 

        
    }

    case'-':
    tempNum1= generateNum(12)
    tempNum2 = generateNum(12)
    tempCorrect = tempNum1 - tempNum2
    return {

        numberOne: tempNum1,
        numberTwo: tempNum2,
        operator: tempoperator,
        correctAns : tempCorrect 

        
    }

    case'/':
    tempNum1= generateNum(50)
    do{
        tempNum2 = generateNum(50)

    }while(tempNum2 === 0)
   
    tempCorrect = tempNum1 / tempNum2
    return {

        numberOne: tempNum1,
        numberTwo: tempNum2,
        operator: tempoperator,
        correctAns : tempCorrect 

        
    }

    case'x':
    tempNum1 = generateNum(50)
    tempNum2 = generateNum(50)
    tempCorrect = tempNum1 * tempNum2
    return {

        numberOne: tempNum1,
        numberTwo: tempNum2,
        operator: tempoperator,
        correctAns : tempCorrect 

        
    }
    default:
        return {

            numberOne: tempNum1,
            numberTwo: tempNum2,
            operator: tempoperator,
            correctAns : tempCorrect 
    
            
        }

    
   }


}

ourForm.addEventListener("submit",Submithandeling)

function Submithandeling(evt)
{
    //Stops browser from reloading and redirecting
    evt.preventDefault()

    const prob = state.currentProblem

    if(parseFloat(ourFeild.value) === prob.correctAns)
    {
        state.score++
        state.QuestionCount--
        scoreObtained.textContent = state.score
        alert("Correct Answer")
        
        questionsRemaining.textContent = state.QuestionCount
    
        updateProblem()
        displayQuestionBar()
    }else
    {
        state.QuestionCount--
        scoreObtained.textContent = state.score
        questionsRemaining.textContent = state.QuestionCount
        probElement.classList.add("animate-wrong")
         setTimeout(() => probElement.classList.remove("animate-wrong"),331)
         updateProblem()
        displayQuestionBar()
     }
    QuizCheck()

}
function QuizCheck()
{
    if(state.QuestionCount === 0 )
    {
        quizEnd.textContent ="You have completed the quiz you got " + state.score +"/"+10+" would you like to play again"
        document.body.classList.add("overlay-is-open")
        //arrow function
        setTimeout(()=> resetButton.focus(),333)

    }
 
    

}
resetButton.addEventListener("click",quizReset)

function quizReset()
{
    document.body.classList.remove("overlay-is-open")    
    updateProblem()
    state.QuestionCount = 10
    state.score = 0
    //state.questionsRemaining = 10
    questionsRemaining.textContent =10
    scoreObtained.textContent =0
    displayQuestionBar()

}

function displayQuestionBar()
{
    questionProgress.style.transform = `scaleX(${state.QuestionCount/10})`
}  