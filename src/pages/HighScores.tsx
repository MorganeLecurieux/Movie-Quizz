import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Card } from '@/components/generics'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { humanizeTime } from '@/core/timeUtils'

import { ROUTE_PLAY } from '@/core/routerConfig'
import { highScoresVar, IHighScore } from '@/core/apolloClient'
import { useI18nContext } from '@/core/I18nContext'
import { colors, spacers } from '@/style/variables'

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

const HighScores = () => {
  const { data } = useQuery(GET_LAST_GAME_INFOS)
  const [userName, setUserName] = useState('')
  const [canAddHightScore, setCanAddHightScore] = useState(true)
  const { translate } = useI18nContext()

  const getSortedHighScores = () => {
    return [...data?.highScores].sort((a: IHighScore, b: IHighScore) => {
      return b?.score - a?.score
    })
  }

  return (
    <StyledCard>
      <h1>{translate('page:high-scores:title')}</h1>
      <Line>
        <span>{translate('page:high-scores:current:time')}</span> <b>{humanizeTime(data?.timer)}</b>
      </Line>
      <Line>
        <span>{translate('page:high-scores:current:score', {}, data?.score)}</span>{' '}
        <b>{data?.score}</b>
      </Line>
      <StyledLink to={ROUTE_PLAY}>
        <Styledbutton>{translate('page:high-scores:button:retry')}</Styledbutton>
      </StyledLink>

      <h2>{translate('page:high-scores:title:high-scores')}</h2>

      {data?.highScores?.length ? (
        getSortedHighScores().map((highScore: IHighScore, i: number) => {
          return (
            <HighScoreLine key={i}>
              <span>{highScore.userName}</span>
              <span>{humanizeTime(highScore.time)} </span>
              <span>
                {translate(
                  'page:high-scores:title:high-scores:score',
                  { score: highScore.score },
                  highScore.score
                )}
              </span>
            </HighScoreLine>
          )
        })
      ) : (
        <div>{translate('page:high-scores:title:high-scores:none')}</div>
      )}

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
            placeholder={translate('page:high-scores:title:high-scores:add:placeholder')}
          />
          <Styledbutton type="submit">
            {translate('page:high-scores:title:high-scores:add:button')}
          </Styledbutton>
        </Form>
      )}
    </StyledCard>
  )
}

export default HighScores

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

  > *:last-child {
    flex: 2;
    text-align: right;
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
