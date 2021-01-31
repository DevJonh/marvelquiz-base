import React from 'react'
import { css } from 'styled-components'
import db from '../../../db.json'

import { RingLoader, PulseLoader } from 'react-spinners'

import Widget from '../Widget'

const Loading = () => {
  const override = css`
    display: flex;
  `
  return (
    <Widget>
      <Widget.Header>
        <h3>Carregando</h3>
        <PulseLoader
          size={6}
          css={override}
          color={db.theme.colors.contrastText}
        />
      </Widget.Header>

      <Widget.Content>
        <RingLoader size={120} color={db.theme.colors.contrastText} />
      </Widget.Content>
    </Widget>
  )
}

export default Loading
