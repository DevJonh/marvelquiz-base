import React from 'react'
import styled from 'styled-components'

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
    <Widget>
      <Widget.Header>
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

        <Button type="button" disabled={selected === 5} onClick={confirm}>
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
