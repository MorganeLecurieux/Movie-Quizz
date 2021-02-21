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
    height: 60px;
    border: none;
    outline:none;
    padding: ${spacers[2]}px ${spacers[3]}px;
    color: white;
    /* background-color: red; */

    :active{
        /* background-color:blue; */
    }

    :hover {
        /* opacity: 0.5; */
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
      margin: 0;
  }
`
