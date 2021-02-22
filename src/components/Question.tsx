import React from 'react'
import styled from 'styled-components'
import { colors, spacers } from '@/style/variables'
import { ImageLoader } from '@/components/generics'
import { useI18nContext } from '@/core/I18nContext'

interface QuestionProps {
  actor: {
    name: string
    profilePicture?: string
  }
  movie: {
    id: string
    title: string
    poster?: string
  }
  className?: string
  onAnswerYes: () => void
  onAnswerNo: () => void
}

export const Question = ({ actor, movie, onAnswerYes, onAnswerNo, className }: QuestionProps) => {
  const { translate } = useI18nContext()

  return (
    <Container className={className}>
      <h1>{translate('page:play:question', { actor: actor?.name, movie: movie?.title })}</h1>
      <Line>
        <ImageLoader src={actor?.profilePicture} alt={actor?.name} />
        <ImageLoader src={movie?.poster} alt={movie?.title} />
      </Line>
      <Line>
        <YesButton onClick={onAnswerYes}>{translate('page:play:button:yes')}</YesButton>
        <NoButton onClick={onAnswerNo}>{translate('page:play:button:no')}</NoButton>
      </Line>
    </Container>
  )
}

const Container = styled.div`
  max-width: 400px;
  width: calc(100% - ${spacers[4]}px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`

const Line = styled.div`
  display: flex;
  margin-top: ${spacers[2]}px;
  width: 100%;

  > *:first-child {
    margin-right: ${spacers[1]}px;
  }

  > *:last-child {
    margin-left: ${spacers[1]}px;
  }
`

const YesButton = styled.button`
  flex: 1;
  background-color: ${colors.success};
`
const NoButton = styled.button`
  flex: 1;
  background-color: ${colors.error};
`
