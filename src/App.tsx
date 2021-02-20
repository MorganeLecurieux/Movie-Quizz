import React from 'react'
import { Starter } from '@/components/Starter'
import { Game } from '@/components/Game'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/core/apolloClient'

import { GlobalStyle } from '@/style/globalStyle'

const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Starter />
        <Game />
      </ApolloProvider>
    </div>
  )
}

export default App
