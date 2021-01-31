import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import db from '../db.json'

import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import QuizContainer from '../src/components/QuizContainer'
import QuestionWidget from '../src/components/QuestionWidget'
import Loading from '../src/components/Loading'
import ResultWidget from '../src/components/ResultWidget'

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

const QuizPage = () => {
  const [questionActual, setQuestionActual] = useState(0)
  const [selected, setSelected] = useState(5)
  const [hits, setHits] = useState([])
  const [isCorrect, setIsCorrect] = useState(3)
  const [screenState, setScreenState] = useState(screenStates.LOADING)

  const question = db.questions[questionActual]
  const totalQuestion = db.questions.length

  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 2 * 1000)
  }, [])

  const confirm = () => {
    if (questionActual <= totalQuestion) {
      if (question.answer === Number(selected)) {
        setIsCorrect(1)
        setHits([...hits, true])
      } else if (question.answer !== Number(selected)) {
        setIsCorrect(0)
        setHits([...hits, false])
      }

      if (questionActual + 1 >= totalQuestion) {
        setTimeout(() => {
          setScreenState(screenStates.RESULT)
        }, 2 * 1000)
      }

      setTimeout(() => {
        setIsCorrect(3)
        setSelected(5)
        setQuestionActual(questionActual + 1)
      }, 2 * 1000)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              questionActual={questionActual}
              totalQuestion={totalQuestion}
              question={question}
              selectedFunc={(e) => setSelected(e.target.value)}
              selected={selected}
              confirm={confirm}
              questionCorrect={isCorrect}
            />
          )}

          {screenState === screenStates.LOADING && <Loading />}

          {screenState === screenStates.RESULT && (
            <ResultWidget
              results={hits}
              name={router.query.name}
              questionsTotal={totalQuestion}
            />
          )}
          <Footer />
        </QuizContainer>
      </QuizBackground>
    </>
  )
}

export default QuizPage
