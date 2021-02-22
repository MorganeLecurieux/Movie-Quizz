import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { routes } from '@/core/routerConfig'

const App = () => {
  return (
    <Container>
      <Switch>
        {routes.map((route, i) => (
          <Route
            key={i}
            {...route}
            render={() => {
              !!route.onEnter && route.onEnter()
              return <route.components />
            }}
          />
        ))}
      </Switch>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default App
