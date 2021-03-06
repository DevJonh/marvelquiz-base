import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import db from '../src/database/db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Image from '../src/components/Image'
import GitHubCorner from '../src/components/GitHubCorner'

import Button from '../src/components/Button'
import QuizContainer from '../src/components/QuizContainer'

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

const Home = () => {
  const router = useRouter()

  const play = (id) => {
    router.push({
      pathname: '/home',
      query: { id }
    })
  }

  return (
    <>
      <Head>
        <title>Marvel Studios</title>
        <meta property="og:image" content={db.bg} key="bg-img" />
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        {db.topics.map((topic) => (
          <QuizContainer key={topic.id}>
            <Widget
              theme={topic.theme}
              as={motion.section}
              transition={{ duration: 1, delay: 0 }}
              variants={{
                show: { opacity: 1, y: '0' },
                hidden: { opacity: 0, y: '100%' }
              }}
              initial="hidden"
              animate="show"
            >
              <Widget.Header>{topic.title}</Widget.Header>
              <Image backgroundImage={topic.bg} />
              <Widget.Content>
                <p>{topic.description}</p>

                <Button
                  as={motion.button}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => play(topic.id)}
                >
                  VAMOS JOGAR
                </Button>
              </Widget.Content>
            </Widget>
          </QuizContainer>
        ))}
        <GitHubCorner projectUrl="https://github.com/DevJonh" />
      </QuizBackground>
    </>
  )
}

export default Home
