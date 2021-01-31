import PropTypes from 'prop-types'
import styled from 'styled-components'

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

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired
}

export default Button
