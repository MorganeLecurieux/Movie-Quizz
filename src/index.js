import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import { client } from '@/core/apolloClient'
import { GlobalStyle } from '@/style/globalStyle'

import App from './App'

ReactDOM.render(
  <BrowserRouter basename="/">
    <ApolloProvider client={client}>
      <GlobalStyle />
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

module.hot.accept()
