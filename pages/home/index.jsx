import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import db from '../../src/database/db.json'
import Widget from '../../src/components/Widget'
import QuizLogo from '../../src/components/QuizLogo'
import QuizBackground from '../../src/components/QuizBackground'
import Footer from '../../src/components/Footer'
import GitHubCorner from '../../src/components/GitHubCorner'
import QuizContainer from '../../src/components/QuizContainer'
import ErrorMessage from '../../src/components/ErrorMessage'
import Question from '../../src/components/Question'

import Input from '../../src/components/Input'
import Button from '../../src/components/Button'

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

  const [db, setDb] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (name !== '') {
      setDisable(false)
      setMsg('')
    }

    if (router.query.id) {
      const bd = require(`../../src/database/${router.query.id}.json`)

      setDb(bd)
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
      query: { id: router.query.id, name }
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

          <Footer
            as={motion.footer}
            transition={{
              duration: 1,
              delay: 0.5
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
