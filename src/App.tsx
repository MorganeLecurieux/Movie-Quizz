import React from 'react'
import { Starter } from '@/components/Starter'
import { Game } from '@/components/Game'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/core/apolloClient'

const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>
        <Starter />
        <Game />
      </ApolloProvider>
    </div>
  )
}

export default App
