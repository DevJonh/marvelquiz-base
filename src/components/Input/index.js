import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InputBase = styled.input`
  width: 100%;
  background: transparent;
  border-radius: 4px;
  padding: 12px 15px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  outline: none;
  margin-top: 20px;
  letter-spacing: 0.8px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.contrastText};
    opacity: 0.8;
    letter-spacing: 1px;
  }
`

const Input = ({ onChange, name, placeholder }) => {
  return (
    <>
      <InputBase
        type="text"
        placeholder={placeholder}
        value={name}
        onChange={onChange}
      />
    </>
  )
}

Input.defaultProps = {
  value: ''
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
}

export default Input
