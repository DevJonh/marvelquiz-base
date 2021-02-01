// src/components/QuizBackground/index.js
import styled from 'styled-components'

const QuizBackground = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-color: ${({ theme }) => theme.colors.mainBg};

  display: flex;
`

export default QuizBackground
