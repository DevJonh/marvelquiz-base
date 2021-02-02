import styled from 'styled-components'

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};

  border-radius: 4px;
  overflow: hidden;
  h1,
  h2,
  h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.8px;
  }
  span {
    display: block;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0.8px;
    margin-top: 4px;
  }
  a {
    display: block;
    width: 100%;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.contrastText};
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 8px 16px;
    border-radius: 4px;
    text-align: center;
    font-weight: bold;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    transition: 0.4s ease-in-out;
    margin-top: 30px;
    transition: 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary_op};
    }
  }
`

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  * {
    margin: 0;
  }

  span.css-0 {
    display: flex;

    span {
      margin: 0;
      margin-left: 6px;
    }
  }
  a {
    cursor: pointer;
    margin: 0px;
    width: auto;
    background: none;
    box-shadow: none;
    color: ${({ theme }) => theme.colors.contrastText};
    padding: 0;
    margin-right: 20px;
  }
`

Widget.Content = styled.div`
  position: relative;
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  span {
    margin: 0 auto;
  }
  &.galera {
    height: 270px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 4px;
    }
    ::-webkit-scrollbar-track {
      color: ${({ theme }) => theme.colors.mainBg};
    }
  }
`

export default Widget
