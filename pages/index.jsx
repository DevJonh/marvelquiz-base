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

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export const Input = styled.input`
  width: 100%;
  background: transparent;
  border-radius: 4px;
  padding: 12px 15px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  outline: none;
  margin-top: 20px;
  letter-spacing: 0.8px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.contrastText};
    opacity: 0.8;
    letter-spacing: 1px;
  }
`

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.wrong};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  border: none;
  width: 100%;
  padding: 12px 16px;
  margin-top: 25px;
  color: ${({ theme }) => theme.colors.contrastText};
  font-weight: bold;
  letter-spacing: 1.25px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: background 0.3s;

  &:hover {
    background-color: #c41c19;
  }

  &:disabled {
    background-color: #979797;
    cursor: initial;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  }
`

export const ErrorMessage = styled.p`
  background-color: #a0272555;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 5px;
  text-align: center;
  box-shadow: 2px 0px 15px -2px #a02725;
  text-transform: uppercase;
  font-size: 16px;
  border-radius: 4px;
  transition: 0.4s;
`

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
        <title>{db.title}</title>
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
                type="text"
                placeholder="Digite seu nome"
                value={name}
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
