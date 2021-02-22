import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Card } from '@/components/generics'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { humanizeTime } from '@/core/timeUtils'

import { colors, spacers } from '@/style/variables'
import { ROUTE_PLAY } from '@/core/routerConfig'
import { highScoresVar, IHighScore } from '@/core/apolloClient'

const GET_LAST_GAME_INFOS = gql`
  query getLastGameInfos {
    timer @client
    score @client
    highScores @client {
      userName
      score
      time
    }
  }
`

export const HighScores = () => {
  const { data } = useQuery(GET_LAST_GAME_INFOS)
  const [userName, setUserName] = useState('')
  const [canAddHightScore, setCanAddHightScore] = useState(true)
  console.log(canAddHightScore)

  const getSortedHighScores = () => {
    return [...data?.highScores].sort((a: IHighScore, b: IHighScore) => {
      return b?.score - a?.score
    })
  }

  return (
    <StyledCard>
      <h1>Game over</h1>
      <Line>
        <span>Time spent in the game</span>{' '}
        <span>
          <b>{humanizeTime(data?.timer)}</b>
        </span>
      </Line>
      <Line>
        <span>Good answers</span>{' '}
        <span>
          <b>{data?.score}</b>
        </span>
      </Line>
      <StyledLink to={ROUTE_PLAY}>
        <Styledbutton>Try again</Styledbutton>
      </StyledLink>

      <h2>High Score</h2>

      {data?.highScores &&
        getSortedHighScores().map((highScore: IHighScore, i: number) => {
          return (
            <HighScoreLine key={i}>
              <span>{highScore.userName}</span>
              <span>{humanizeTime(highScore.time)} </span>
              <span>{highScore.score} good answers</span>
            </HighScoreLine>
          )
        })}

      {data?.score > 0 && canAddHightScore && (
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            highScoresVar([
              ...highScoresVar(),
              {
                userName,
                score: data?.score,
                time: data?.timer,
              },
            ])
            setCanAddHightScore(false)
          }}
        >
          <input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value)
            }}
            placeholder="Add your name to the high scores"
          />
          <Styledbutton type="submit">Add</Styledbutton>
        </Form>
      )}
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
`

const Line = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  margin: ${spacers[2]}px auto ${spacers[5]}px;
`

const Styledbutton = styled.button`
  background-color: ${colors.main};
`

const HighScoreLine = styled.div`
  display: flex;
  > * {
    flex: 1;
  }

  > *:first-child {
    flex: 3;
  }

  > *:first-child {
    flex: 2;
  }
`

const Form = styled.form`
  display: flex;
  margin-top: ${spacers[4]}px;

  > *:first-child {
    flex: 1;
    margin-right: ${spacers[2]}px;
  }
`
