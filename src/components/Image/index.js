import styled from 'styled-components'

const Image = styled.div`
  background-size: cover;
  background-position: center;
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-color: ${({ theme }) => theme.colors.mainBg};
  height: 210px;
  width: 100%;

  z-index: 1;
`

export default Image
