import React from 'react'
import { Starter } from '@/components/Starter'
import { Game } from '@/components/Game'
import { Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Starter />
        </Route>
        <Route path="/play">
          <Game />
        </Route>
      </Switch>
    </div>
  )
}

export default App
