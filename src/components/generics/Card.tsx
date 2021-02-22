import React, { ComponentProps } from 'react'
import styled from 'styled-components'

import { spacers } from '@/style/variables'

interface CardProps extends ComponentProps<'div'> {
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return <Container className={className}>{children}</Container>
}

const Container = styled.div`
  overflow: scroll;
  background-color: white;
  padding: ${spacers[3]}px ${spacers[5]}px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  max-width: 500px;
  width: calc(100% - ${spacers[4]}px);
  max-height: calc(100vh - ${spacers[6]}px - 50px);
  box-sizing: border-box;
`
