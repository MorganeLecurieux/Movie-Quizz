import React from 'react'
import styled from 'styled-components'
import { Card } from '@/components/generics'
import { Link } from 'react-router-dom'

import { ROUTE_PLAY } from '@/core/routerConfig'
import { useI18nContext } from '@/core/I18nContext'
import { colors, spacers } from '@/style/variables'

const Starter = () => {
  const { translate } = useI18nContext()

  return (
    <StyledCard>
      <h1>{translate('page:starter:title')}</h1>
      <p>{translate('page:starter:subtitle')}</p>
      <StyledLink to={ROUTE_PLAY}>
        <button>{translate('page:starter:button')}</button>
      </StyledLink>
    </StyledCard>
  )
}

export default Starter

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    text-align: center;
  }
`

const StyledLink = styled(Link)`
  margin-top: ${spacers[1]}px;
  > * {
    background-color: ${colors.main};
  }
`
