import React from 'react'
import { motion } from 'framer-motion'
import db from '../../../db.json'

import { RingLoader, PulseLoader } from 'react-spinners'

import Widget from '../Widget'

const Loading = () => {
  return (
    <Widget
      as={motion.section}
      transition={{ duration: 0.5, delay: 0.5 }}
      variants={{
        show: { opacity: 1 },
        hidden: { opacity: 0 }
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <h3>Carregando</h3>
        <PulseLoader size={6} color={db.theme.colors.contrastText} />
      </Widget.Header>

      <Widget.Content>
        <RingLoader size={120} color={db.theme.colors.contrastText} />
      </Widget.Content>
    </Widget>
  )
}

export default Loading
