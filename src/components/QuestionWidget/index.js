import React from 'react'
import styled from 'styled-components'

import Button from '../Button'
import Question from '../Question'
import Widget from '../Widget'

const Image = styled.div`
  background-size: cover;
  background-position: center;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-color: ${({ theme }) => theme.colors.mainBg};
  height: 200px;
  width: 100%;

  z-index: 1;
`

const QuestionWidget = ({
  question,
  totalQuestion,
  questionActual,
  selectedFunc,
  selected,
  confirm
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
              className={Number(selected) === index && 'active'}
              key={alt}
              value={index}
              onClick={selectedFunc}
            >
              {alt}
            </Question>
          )
        })}

        <Button type="button" onClick={confirm}>
          CONFIRMAR
        </Button>
      </Widget.Content>
    </Widget>
  )
}

export default QuestionWidget
