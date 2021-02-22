import React from 'react'
import styled from 'styled-components'
import { colors, spacers } from '@/style/variables'
import { ImageLoader } from '@/components/generics'

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
  return (
    <Container className={className}>
      <h1>
        Did {actor?.name} played in {movie?.title} ?
      </h1>
      <Line>
        <ImageLoader src={actor?.profilePicture} alt={actor?.name} />
        <ImageLoader src={movie?.poster} alt={movie?.title} />
      </Line>
      <Line>
        <YesButton onClick={onAnswerYes}>Yes</YesButton>
        <NoButton onClick={onAnswerNo}>No</NoButton>
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
  margin-top: ${spacers[4]}px;
  width: 100%;

  > *:first-child {
    margin-right: ${spacers[1] / 2}px;
  }

  > *:last-child {
    margin-left: ${spacers[1] / 2}px;
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
