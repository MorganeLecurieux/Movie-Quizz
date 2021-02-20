import { createGlobalStyle } from 'styled-components'
import { colors, spacers } from '@/style/variables'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.background};
  }

  button {
    border-radius: 12px;
    height: 60px;
    border: none;
    outline:none;
    padding: ${spacers[2]} ${spacers[3]};
    color: white;
    /* background-color: red; */

    :active{
        /* background-color:blue; */
    }

    :hover {
        /* opacity: 0.5; */
    }
  }
`
