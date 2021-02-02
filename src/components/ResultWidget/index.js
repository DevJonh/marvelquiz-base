import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import Widget from '../Widget'
import Image from '../Image'

const ResultWidget = ({ results, questionsTotal }) => {
  const hits = results.filter((x) => x).length
  const percentual = ((hits / questionsTotal) * 100).toFixed(1)
  const router = useRouter()
  const db =
    router.query.id && require(`../../database/${router.query.id}.json`)

  return (
    <>
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
          <h2>
            Você acertou {hits} de {questionsTotal} pergutas!
          </h2>
        </Widget.Header>
        {percentual >= 70 && <Image backgroundImage={db.resultImage.top.url} />}
        {percentual < 70 && percentual >= 40 && (
          <Image backgroundImage={db.resultImage.middle.url} />
        )}
        {percentual < 40 && <Image backgroundImage={db.resultImage.low.url} />}

        <Widget.Content>
          {percentual < 70 && percentual >= 40 && (
            <>
              <h3>
                {db.resultImage.middle.title} {percentual}%!
              </h3>
              <p>{db.resultImage.middle.msg}</p>
            </>
          )}
          {percentual >= 70 && (
            <>
              <h3>
                {db.resultImage.top.title} {percentual}%!
              </h3>
              <p>{db.resultImage.top.msg}</p>
            </>
          )}
          {percentual < 40 && (
            <>
              <h3>
                {db.resultImage.low.title} {percentual}%!
              </h3>
              <p>{db.resultImage.low.msg}</p>
            </>
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Link href="/">
              <a style={{ marginRight: '20px' }}>Retornar ao início</a>
            </Link>
            <Link
              href={{
                pathname: '/home',
                query: { id: router.query.id }
              }}
            >
              <a>Jogar Novamente</a>
            </Link>
          </div>
        </Widget.Content>
      </Widget>
    </>
  )
}

export default ResultWidget
