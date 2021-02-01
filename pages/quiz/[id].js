import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'

const QuizDaGaleraPage = ({ dbExterno }) => {
  return (
    <>
      <ThemeProvider theme={dbExterno.theme}>
        <QuizScreen bg={dbExterno.bg} questions={dbExterno.questions} />
      </ThemeProvider>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const [name, user] = context.query.id.split('___')

  const dbExterno = await fetch(`https://${name}.${user}.vercel.app/api/db`)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      throw new Error('Falha na coleta de dados')
    })
    .then((res) => res)
    .catch((err) => console.error(err))

  return {
    props: { dbExterno }
  }
}

export default QuizDaGaleraPage
