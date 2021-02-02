import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion } from 'framer-motion'

import QuizLogo from '../../src/components/QuizLogo'
import QuizBackground from '../../src/components/QuizBackground'
import Footer from '../../src/components/Footer'
import QuizContainer from '../../src/components/QuizContainer'
import QuestionWidget from '../../src/components/QuestionWidget'
import Loading from '../../src/components/Loading'
import ResultWidget from '../../src/components/ResultWidget'

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
  const [db, setDb] = useState()

  const router = useRouter()

  const res = useMemo(async () => {
    const { id } = await router.query
    const res = id && require(`../../src/database/${id}.json`)
    return res
  }, [router.query.id])

  useEffect(() => {
    res
      .then((res) => {
        if (res !== undefined) {
          setDb(res)
        }
      })
      .catch(() => {
        router.push({
          pathname: '/home',
          query: { id: router.query.id }
        })
      })
  })

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 2 * 1000)
  }, [])

  if (db === undefined) {
    return <div> </div>
  }
  const question = db.questions[questionActual]

  const totalQuestion = db.questions.length

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
        }, 3 * 900)
      }

      setTimeout(() => {
        setIsCorrect(3)
        setSelected(5)
        setQuestionActual(questionActual + 1)
      }, 3 * 900)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <>
      <Head>
        <title>{db.title}</title>
      </Head>
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
            <ResultWidget results={hits} questionsTotal={totalQuestion} />
          )}
          <Footer
            as={motion.footer}
            transition={{ duration: 1, delay: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' }
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
      </QuizBackground>
    </>
  )
}

export default QuizPage
