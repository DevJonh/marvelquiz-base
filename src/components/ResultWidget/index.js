import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import db from '../../database/db.json'

import Widget from '../Widget'
import Image from '../Image'

const ResultWidget = ({ results, questionsTotal, name }) => {
  const hits = results.filter((x) => x).length
  const percentual = ((hits / questionsTotal) * 100).toFixed(1)
  const router = useRouter()
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
        {percentual >= 70 && <Image backgroundImage={db.resultImage.top} />}
        {percentual < 70 && percentual >= 40 && (
          <Image backgroundImage={db.resultImage.middle} />
        )}
        {percentual < 40 && <Image backgroundImage={db.resultImage.low} />}

        <Widget.Content>
          {percentual < 70 && percentual >= 40 && (
            <>
              <h3>Muito bom! Seu nível de Asgardiano é {percentual}%!</h3>
              <p>
                Parabéns {name}! Você está acima da Média, mas pode melhorar.
              </p>
            </>
          )}
          {percentual >= 70 && (
            <>
              <h3>Uauuu! Seu nível de Asgardiano é {percentual}%!</h3>
              <p>
                Fantástico! Arrasou hein {name}? Estou começando a achar que
                você é um Asgardiano entre nós.
              </p>
            </>
          )}
          {percentual < 40 && (
            <>
              <h3>Seu nível de Asgardiano é {percentual}%!</h3>
              <p>
                Acho que você pode melhorar {name}, assista aos filmes de Thor e
                tente novamente.
              </p>
            </>
          )}

          <Link href="/">
            <a>Retornar ao início</a>
          </Link>
          <Link
            href={{
              pathname: '/home',
              query: { id: router.query.id }
            }}
          >
            <a>Retornar ao início</a>
          </Link>
        </Widget.Content>
      </Widget>
    </>
  )
}

export default ResultWidget
