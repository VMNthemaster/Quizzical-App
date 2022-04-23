import React, { useState } from 'react'
import axios from 'axios';
import QnA from './components/QnA';
import { nanoid } from 'nanoid';
import IMG from "./assets/loading_img_2.png"


function App() {


  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5)   // this gives the array elements in random order
  }

  const [showStartButton, setShowStartButton] = useState(true)

  const [questions, setQuestions] = useState([])
  // console.log(questions)

  const [isLoading, setIsLoading] = useState(false)

  const [numOfChecked, setNumOfChecked] = useState(0)

  const [isShowAnswersClicked, setIsShowAnswersClicked] = useState(false)

  const [isAllChecked, setIsAllChecked] = useState(false)

  const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0)

  // console.log(questions)
  // console.log(isShowAnswersClicked)

  const handleStart = async () => {
    let newQuestions = []

    setIsLoading(true)
    const response = await axios.get("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")

    const resData = response.data.results  // this is an array
    // console.log(resData)
    for (let i = 0; i < 5; i++) {
      const randomOrderAnswers = resData[i].incorrect_answers
      randomOrderAnswers.push(resData[i].correct_answer)
      const randomOrderAnswersObject = randomOrderAnswers.map((item) => {
        return {
          answer: item,
          isClicked: false,
          id: nanoid()

        }
      })
      // console.log(randomOrderAnswersObject)
      shuffle(randomOrderAnswersObject)
      // console.log(randomOrderAnswers)
      resData[i].randomOrderAnswers = randomOrderAnswersObject
      newQuestions.push(resData[i])
    }
    setQuestions(newQuestions)
    setShowStartButton(false) // writing this line above will run this line and re render the component and then run the axios statement which will return undefined
    setIsLoading(false)

  }

  // console.log(questions)

  const holdAnswer = (question) => {
    const holdAnswerArray = questions.filter((item) => {
      return item.question === question
    })    // this will give us the correct question's answers which are clicked and not all 5 questions    
    // console.log(holdAnswerArray[0].randomOrderAnswers)

    return holdAnswerArray[0].randomOrderAnswers
  }

  const toggleQuestions = (data) => {     // this function is used to change state value of variable in this file from a different file
    setQuestions(data)
  }

  const calculateAnswersFunc = () => {    // checking if number of answers checked === 5
    // console.log(questions)
    let num = 0
    for (let i = 0; i < 5; i++) {
      const isClickedArray = questions[i].randomOrderAnswers.map((item) => {
        return item.isClicked
      })
      // console.log(isClickedArray)
      if (isClickedArray[0] || isClickedArray[1] || isClickedArray[2] || isClickedArray[3]) {
        num = num + 1
      }
    }
    // console.log(num)
    setNumOfChecked(num)
    setIsShowAnswersClicked(true)
    
    if (num === 5) {
      setIsAllChecked(true)
      // write function here to calculate the number of correct answers
      findNumOfCorrectAnswers() 
    }
    
  }

  const calculateAnswers = calculateAnswersFunc

  const findNumOfCorrectAnswers = () => {
    let newArray = []

    for(let i = 0; i < 5; i++){
      const newArrayElement = questions[i].randomOrderAnswers.map((item) => {
        return item.isClicked ? {...questions[i], isCorrectAnswer : item.answer === questions[i].correct_answer} : questions[i]
        // this is correct     
      })
      newArray.push(newArrayElement)
    }

    // console.log(newArray)
    // run filter function to remove all null values

    let filteredNewArray = []

    for(let i = 0; i < 5; i++){
      const a = newArray[i]

      for(let j = 0; j < 4; j++){
        if(a[j].isCorrectAnswer === true || a[j].isCorrectAnswer === false){
          filteredNewArray.push(a[j])
        }
      }
    }

    // console.log(filteredNewArray)   // this is correct
    setQuestions(filteredNewArray)

    let num = 0

    for(let i = 0; i < 5; i++){
      if(filteredNewArray[i].isCorrectAnswer){
        num = num + 1
      }
    }
    // console.log(num)    // this is correct
    setNumOfCorrectAnswers(num)
  }

  const handleNewGame = () => {
    setQuestions([])
    setNumOfChecked(0)
    setIsShowAnswersClicked(false)
    setIsAllChecked(false)
    setNumOfCorrectAnswers(0)

    handleStart()

  }


  return (
    <div className="sm:mx-[2%] md:mx-[15%] h-[100%] ">
      <div className="">

        {showStartButton && !isLoading &&
          <div className={`space-y-[2vh] flex flex-col items-center h-[100vh] justify-center`}>
            <h1 className='text-blue-900 text-[6vw] md:text-[5vw] font-[gabriola]'>Quizzical</h1>
            <button onClick={handleStart} className={`bg-blue-700 px-4 py-2 rounded-md text-white text-[1.5vw] hover:bg-blue-600`}>Start Quiz</button>
          </div>}

        {/* {isLoading && <h1 className='flex items-center h-[100vh] justify-center text-[4vw] md:text-[3vw]'>Loading....</h1>} */}
        {isLoading && <div className="flex justify-center items-center h-[100vh]">
          <img className='h-[10vh] animate-spin ' src={IMG} alt = "loading Img" /> 
        </div>}

        {!showStartButton && !isLoading &&
          <div className="bg-slate-100 border-2 border-slate-300 rounded-md my-[2vh]">
            {questions.map((item) => {
              return (
                <QnA handleClick={toggleQuestions} questions={questions} setQuestions={setQuestions} isShowAnswersClicked = {isShowAnswersClicked} key={item.question} calculateNumOfChecked={numOfChecked => setNumOfChecked(numOfChecked)} isAllChecked = {isAllChecked} numOfChecked={numOfChecked} correctAnswer={item.correct_answer} completeItem={item} holdAnswer={() => holdAnswer(item.question)} />
              )
            })}
            <div className="btn flex justify-center items-center my-[1vh] gap-x-[2vw]">
              {!isAllChecked && <button id="showAnswersButton" onClick={calculateAnswers} className='bg-blue-600  hover:bg-blue-700 text-white w-[20%] px-1 py-2 font-serif text-[2vw] md:text-[1.5vw] rounded-md'>Show Answers</button>}
              {/* make this button disappear after loading answers */}
              {isShowAnswersClicked && numOfChecked !== 5 && <h1>Please Solve All Questions</h1>}
              
            </div>
            <div className="flex flex-col items-center gap-y-[2vh]">
              {isShowAnswersClicked && numOfChecked === 5 && <h1 className='font-serif text-[2vw] md:text-[1.5vw]'>You got {numOfCorrectAnswers}/5 right...Wanna play again?</h1>}
              {isShowAnswersClicked && numOfChecked === 5 && <button onClick={handleNewGame} className='bg-blue-600  hover:bg-blue-700 text-white w-[20%] px-1 py-2 font-serif text-[2vw] md:text-[1.5vw] rounded-md mb-[1.5vh]'>New Game</button>}
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
