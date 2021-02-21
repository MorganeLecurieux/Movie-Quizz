import React from 'react'
import styled from 'styled-components'
import { Card } from '@/components/generics'
import { Link } from 'react-router-dom'

import { colors, spacers } from '@/style/variables'

export const Starter = () => {
  return (
    <StyledCard>
      <h1>Ready to play ?</h1>
      <p>
        Be the best in finding the perfect pairing between actors and movies. Press play and let’s
        have some fun!
      </p>
      <StyledLink to="/play">
        <button>Press play and let's go</button>
      </StyledLink>
    </StyledCard>
  )
}

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
