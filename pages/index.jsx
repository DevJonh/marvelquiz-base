import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizContainer from '../src/components/QuizContainer'
import ErrorMessage from '../src/components/ErrorMessage'
import Question from '../src/components/Question'

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
          <Widget
            as={motion.section}
            transition={{ duration: 1, delay: 0 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' }
            }}
            initial="hidden"
            animate="show"
          >
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
              <Button
                as={motion.button}
                whileTap={{ scale: 0.9 }}
                disabled={disable}
                type="button"
                onClick={play}
              >
                VAMOS JOGAR
              </Button>
            </Widget.Content>
          </Widget>

          {db.external.length > 0 && (
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
              <Widget.Content className="galera">
                <h1>Quizes da Galera</h1>
                <ul>
                  {db.external.map((ext, index) => {
                    const [name, user] = ext
                      .replace(/\//g, '')
                      .replace('https:', '')
                      .replace('.vercel.app', '')
                      .split('.')

                    return (
                      <li key={index}>
                        <Question
                          as={motion.button}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => router.push(`/quiz/${name}___${user}`)}
                        >{`${user}/${name}`}</Question>
                      </li>
                    )
                  })}
                </ul>
              </Widget.Content>
            </Widget>
          )}
          <Footer
            as={motion.footer}
            transition={{
              duration: 1,
              delay: db.external.length > 0 ? 1 : 0.5
            }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' }
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/DevJonh" />
      </QuizBackground>
    </>
  )
}

export default Home
