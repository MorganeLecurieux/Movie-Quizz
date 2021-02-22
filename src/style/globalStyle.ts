import { createGlobalStyle } from 'styled-components'
import { colors, spacers } from '@/style/variables'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.background};
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: sans-serif;
    font-size: 16px;
    line-height: 28px;
    color: ${colors.text};
        
    #root {
        height: 100vh;
        width: 100%;
        
        > * {
            width: 100%;
            height: 100%;
        }
    }
  }

  button {
    border-radius: 12px;
    height: 50px;
    border: none;
    outline:none;
    padding: ${spacers[2]}px ${spacers[3]}px;
    color: white;
    box-sizing: border-box;
  }

  input {
      height: 50px;
      border-radius: 12px;
      border: 1px solid ${colors.text};
      padding: ${spacers[1]}px ${spacers[2]}px;
      box-sizing: border-box;
      font-size: 16px;

      ::placeholder {
        opacity: 0.5;
      }
      :focus {
          outline: none;
          border: 1px solid ${colors.main};
      }
  }

  // Typography
  h1, h2 {
      color: ${colors.title};
      text-align: center;
  }

  h1 {
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
  }
`
