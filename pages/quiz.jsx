import React, { useEffect, useState } from 'react'

import db from '../db.json'

import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import QuizContainer from '../src/components/QuizContainer'
import QuestionWidget from '../src/components/QuestionWidget'
import Loading from '../src/components/Loading'

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

const QuizPage = () => {
  const [questionActual, setQuestionActual] = useState(0)
  const [selected, setSelected] = useState(5)
  const [hits, setHits] = useState(0)
  const [screenState, setScreenState] = useState(screenStates.LOADING)

  const question = db.questions[questionActual]
  const totalQuestion = db.questions.length

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, [])

  const confirm = () => {
    if (questionActual <= totalQuestion) {
      if (question.answer === Number(selected)) {
        setHits(hits + 1)
        setSelected(5)
      }
      if (questionActual + 1 >= totalQuestion) {
        setScreenState(screenStates.RESULT)
      }
      setQuestionActual(questionActual + 1)
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
            />
          )}

          {screenState === screenStates.LOADING && <Loading />}

          {screenState === screenStates.RESULT && (
            <div>Você acertou {hits} questões, parabéns!</div>
          )}
          <Footer />
        </QuizContainer>
      </QuizBackground>
    </>
  )
}

export default QuizPage
