import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useRouter } from 'next/router'

import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizContainer from '../src/components/QuizContainer'
import ErrorMessage from '../src/components/ErrorMessage'

import Input from '../src/components/Input'
import Button from '../src/components/Button'

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

const Home = () => {
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [disable, setDisable] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (name !== '') {
      setDisable(false)
      setMsg('')
    }
  })

  const play = () => {
    if (name === '') {
      setMsg('Por favor! Digite seu nome.')
      setDisable(true)
      return
    }
    router.push({
      pathname: '/quiz',
      query: { name }
    })
  }

  return (
    <>
      <Head>
        <meta property="og:image" content={db.bg} key="bg-img" />
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <Input
                placeholder="Digite seu nome"
                name={name}
                onChange={(e) => setName(e.target.value)}
              />
              {msg !== '' && <ErrorMessage>{msg}</ErrorMessage>}
              <Button disabled={disable} type="button" onClick={play}>
                VAMOS JOGAR
              </Button>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>

              <p>lorem ipsum dolor sit amet...</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/DevJonh" />
      </QuizBackground>
    </>
  )
}

export default Home
