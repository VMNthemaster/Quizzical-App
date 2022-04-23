import React, {useState} from 'react'

const QnA = (props) => {
  // console.log(props)
  const currentQuestion = props.completeItem
  // console.log(currentQuestion)    // try to make this as state variable
  let {randomOrderAnswers} = props.completeItem
  // console.log(randomOrderAnswers)
  // console.log(props.questions)

  const [updatedQuestion, setUpdatedQuestion] = useState(randomOrderAnswers)

  // console.log(updatedQuestion)

  const optionAID = randomOrderAnswers[0].id
  const optionBID = randomOrderAnswers[1].id
  const optionCID = randomOrderAnswers[2].id
  const optionDID = randomOrderAnswers[3].id

  const findText = (optionID) => {
    const element = document.getElementById(optionID)
    const text = element.innerText
    const answersArray = props.holdAnswer(props.question)
    // console.log(answersArray)

    const clickedAnswersArray = answersArray.map((item) => {
      return item.answer === text ? item.isClicked === true ? {...item, isClicked: false} : {...item, isClicked: true} : {...item, isClicked: false}
      } 
    )
    // console.log(clickedAnswersArray)
    
    currentQuestion.randomOrderAnswers = clickedAnswersArray
    // console.log(currentQuestion)
    setUpdatedQuestion(clickedAnswersArray)

    const completeUpdatedQuestions = props.questions.map((item) => {
      return item.question === currentQuestion.question ? currentQuestion : item
    })
    // console.log(completeUpdatedQuestions)

    props.handleClick(completeUpdatedQuestions)
  }

  const dontDoAnything = () => {
    // console.log("hi")
  }



  return (
    <div className='flex flex-col px-[2vw] py-[4vh] '>
        <h1 className='mb-[2vh] ml-[7%] font-[gabriola] text-[4vw] md:text-[3vw] text-violet-900 font-medium'>Question: {props.completeItem.question}</h1>
        <div className="">
            <ul className='flex space-x-[2%] justify-center'>
                <li id = {optionAID} className={`w-[20%] flex justify-center items-center  bg-white h-[5vh] text-[3vw] md:text-[2vw] font-[gabriola] rounded-md border-2 border-violet-900  cursor-pointer ${props.isShowAnswersClicked ? props.isAllChecked ? currentQuestion.randomOrderAnswers[0].isClicked ? currentQuestion.isCorrectAnswer ? "bg-green-600" : "bg-red-500" : "" : currentQuestion.randomOrderAnswers[0].isClicked ? "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"  : currentQuestion.randomOrderAnswers[0].isClicked ? "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"}`} onClick={!props.isAllChecked ? () => findText(optionAID) : dontDoAnything} >{currentQuestion.randomOrderAnswers[0].answer}</li>
                <li id = {optionBID} className={`w-[20%] flex justify-center items-center  bg-white h-[5vh] text-[3vw] md:text-[2vw] font-[gabriola] rounded-md border-2 border-violet-900  cursor-pointer ${props.isShowAnswersClicked ? props.isAllChecked ? currentQuestion.randomOrderAnswers[1].isClicked ? currentQuestion.isCorrectAnswer ? "bg-green-600" : "bg-red-500" : "" : currentQuestion.randomOrderAnswers[1].isClicked ? "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"  : currentQuestion.randomOrderAnswers[1].isClicked ? "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"}`} onClick={!props.isAllChecked ? () => findText(optionBID) : dontDoAnything} >{currentQuestion.randomOrderAnswers[1].answer}</li>
                <li id = {optionCID} className={`w-[20%] flex justify-center items-center  bg-white h-[5vh] text-[3vw] md:text-[2vw] font-[gabriola] rounded-md border-2 border-violet-900  cursor-pointer ${props.isShowAnswersClicked ? props.isAllChecked ? currentQuestion.randomOrderAnswers[2].isClicked ? currentQuestion.isCorrectAnswer ? "bg-green-600" : "bg-red-500" : "" : currentQuestion.randomOrderAnswers[2].isClicked ? "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"  : currentQuestion.randomOrderAnswers[2].isClicked ? "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"}`} onClick={!props.isAllChecked ? () => findText(optionCID) : dontDoAnything} >{currentQuestion.randomOrderAnswers[2].answer}</li>
                <li id = {optionDID} className={`w-[20%] flex justify-center items-center  bg-white h-[5vh] text-[3vw] md:text-[2vw] font-[gabriola] rounded-md border-2 border-violet-900  cursor-pointer ${props.isShowAnswersClicked ? props.isAllChecked ? currentQuestion.randomOrderAnswers[3].isClicked ? currentQuestion.isCorrectAnswer ? "bg-green-600" : "bg-red-500" : "" : currentQuestion.randomOrderAnswers[3].isClicked ? "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"  : currentQuestion.randomOrderAnswers[3].isClicked ? "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"}`} onClick={!props.isAllChecked ? () => findText(optionDID) : dontDoAnything} >{currentQuestion.randomOrderAnswers[3].answer}</li>
                {/* we have to give condition on if numofchecked === 5 and for that we have to takeit fro props */}
            </ul>
        </div>
    </div>
  )
}
export default QnA

// currentQuestion.randomOrderAnswers[3].isClicked ? props.isShowAnswersClicked ? currentQuestion.isCorrectAnswer ? "bg-green-600" : "bg-red-500" : "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"

// props.isShowAnswersClicked ? props.isAllChecked ? currentQuestion.randomOrderAnswers[0].isClicked ? currentQuestion.isCorrectAnswer ? "bg-green-600" : "bg-red-500" : "" : currentQuestion.randomOrderAnswers[0].isClicked ? "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"  : currentQuestion.randomOrderAnswers[0].isClicked ? "bg-violet-300" : "hover:bg-slate-100 hover:border-2 hover:border-black"