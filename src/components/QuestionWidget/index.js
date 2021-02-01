import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { MdChevronLeft } from 'react-icons/md'
import { motion } from 'framer-motion'

import Button from '../Button'
import Question from '../Question'
import Widget from '../Widget'
import Image from '../Image'

const Results = styled.p`
  width: 50%;
  margin: 20px auto 0;
  text-align: center;
  background-color: ${({ state, theme }) =>
    state === 1 ? theme.colors.success : theme.colors.wrong};
  color: ${({ theme }) => theme.colors.contrastText};
  font-weight: bold;
  border-radius: 4px;
  transition: 0.4s ease-in-out;
  padding: 4px 0;
`

const QuestionWidget = ({
  question,
  totalQuestion,
  questionActual,
  selectedFunc,
  selected,
  confirm,
  questionCorrect
}) => {
  return (
    <Widget
      as={motion.section}
      transition={{ duration: 1, delay: 0.5 }}
      variants={{
        show: { opacity: 1, y: '0' },
        hidden: { opacity: 0, y: '100%' }
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <Link href="/">
          <a>
            <MdChevronLeft size={20} />
          </a>
        </Link>
        <h1>
          Pergunta {questionActual + 1} de {totalQuestion}
        </h1>
      </Widget.Header>
      <Image backgroundImage={question.image} />
      <Widget.Content>
        <h3>{question.title}</h3>
        <span>{question.description}</span>

        {question.alternatives.map((alt, index) => {
          return (
            <Question
              as={motion.button}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.7, delay: 1 }}
              variants={{
                show: { opacity: 1 },
                hidden: { opacity: 0 }
              }}
              initial="hidden"
              animate="show"
              className={
                (Number(selected) === index &&
                  questionCorrect === 1 &&
                  'success') ||
                (Number(selected) === index &&
                  questionCorrect === 0 &&
                  'error') ||
                (Number(selected) === index && 'active')
              }
              key={alt}
              value={index}
              onClick={selectedFunc}
            >
              {alt}
            </Question>
          )
        })}

        <Button
          as={motion.button}
          whileTap={{ scale: 0.9 }}
          type="button"
          disabled={selected === 5}
          onClick={confirm}
        >
          CONFIRMAR
        </Button>

        {questionCorrect === 1 && (
          <Results state={questionCorrect}>Você Acertou</Results>
        )}
        {questionCorrect === 0 && (
          <Results state={questionCorrect}>Você Errou</Results>
        )}
      </Widget.Content>
    </Widget>
  )
}

export default QuestionWidget
