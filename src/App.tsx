import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { I18nProvider, LocaleEnum } from '@/core/I18nContext'
import { routes } from '@/core/routerConfig'

import { spacers } from '@/style/variables'

const App = () => {
  const [locale, setLocale] = useState(LocaleEnum.en)

  return (
    <Container>
      <I18nProvider locale={locale}>
        <LocaleButtonsContainer>
          <button onClick={() => setLocale(LocaleEnum.fr)}>
            <span role="img" aria-label="french">
              🇫🇷
            </span>
          </button>
          <button onClick={() => setLocale(LocaleEnum.en)}>
            <span role="img" aria-label="English">
              🏴󠁧󠁢󠁥󠁮󠁧󠁿
            </span>
          </button>
        </LocaleButtonsContainer>

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
      </I18nProvider>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LocaleButtonsContainer = styled.div`
  display: flex;
  margin-bottom: ${spacers[2]}px;

  > * {
    font-size: 20px;
    align-items: center;
    display: flex;
  }

  > *:first-child {
    margin-right: ${spacers[2]}px;
  }
`

export default App
