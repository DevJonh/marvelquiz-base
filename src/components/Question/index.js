import styled from 'styled-components'

const Question = styled.button`
  width: 100%;
  background-color: ${({ theme }) =>
    theme.colors.primary_op || theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  padding: 12px 16px;
  border-radius: 4px;
  border: none;
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  font-size: 14px;
  line-height: 24px;
  cursor: pointer;
  transition: 0.3s;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  &.success {
    background-color: ${({ theme }) => theme.colors.success};
  }
  &.error {
    background-color: ${({ theme }) => theme.colors.wrong};
  }
`

export default Question
