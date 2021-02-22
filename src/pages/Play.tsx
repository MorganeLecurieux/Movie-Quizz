import React, { useEffect, useState, useRef } from 'react'
import { gql, useQuery } from '@apollo/client'

import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ROUTE_HIGH_SCORES } from '@/core/routerConfig'
import { scoreVar } from '@/core/apolloClient'

import { Card } from '@/components/generics'
import { Timer } from '@/components/Timer'
import { Question } from '@/components/Question'
import { colors, spacers } from '@/style/variables'

const GET_ACTORS = gql`
  query people {
    people {
      popular(first: 50) {
        edges {
          node {
            name
            profilePicture(size: W185)
            knownFor {
              ... on MovieResult {
                id
                title
                poster(size: W185)
              }
            }
          }
        }
      }
    }
  }
`

const GET_MOVIE = gql`
  query movies {
    movies {
      popular(first: 50) {
        edges {
          cursor
          node {
            id
            title
            poster(size: W185)
          }
        }
      }
    }
  }
`

function shuffleArray(array: boolean[]) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

// Used to make sure a good repartition is made between true and false answers
const REPARTITION_ARRAY = [true, true, true, true, true, false, false, false, false, false]

// history.push
export const Play = () => {
  let history = useHistory()
  const { data, loading } = useQuery(GET_ACTORS)
  const { data: movieData } = useQuery(GET_MOVIE)
  const answerTemplate = useRef(shuffleArray(REPARTITION_ARRAY))
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // When arriving at the end of the repartition array, shuffle a new one
    if (index === REPARTITION_ARRAY.length - 1) {
      answerTemplate.current = shuffleArray(REPARTITION_ARRAY)
    }
  }, [index])

  const getQuestion = () => {
    const { edges } = data?.people?.popular || {}
    if (!edges || !answerTemplate.current) return
    const randomActorIndex = Math.floor(Math.random() * edges.length)
    const actor = edges[randomActorIndex]?.node

    if (answerTemplate.current[index]) {
      let movie
      let tryCount = 0
      while (!movie && tryCount < 20) {
        const randomActorMovieIndex = Math.floor(Math.random() * actor?.knownFor?.length)
        const randomMovie = actor?.knownFor[randomActorMovieIndex]

        if (!!randomMovie.title) {
          movie = randomMovie
        } else {
          tryCount++
        }
      }

      return (
        <Question
          actor={actor}
          movie={movie}
          onAnswerYes={() => {
            scoreVar(scoreVar() + 1)
            setIndex((prevIndex) => (prevIndex < answerTemplate.current.length ? prevIndex + 1 : 1))
          }}
          onAnswerNo={() => {
            history.push(ROUTE_HIGH_SCORES)
          }}
        />
      )
    } else {
      const { edges: movieEdges } = movieData?.movies?.popular || {}

      if (!movieEdges) return

      let movie
      let tryCount = 0

      while (!movie && tryCount < 20) {
        const randomMovieIndex = Math.floor(Math.random() * movieEdges.length)
        const randomMovie = movieEdges[randomMovieIndex]?.node
        const index = actor?.knownFor?.findIndex(
          (actorsMovie: Record<string, any>) => actorsMovie.id === randomMovie.id
        )

        if (index === -1) {
          movie = randomMovie
        } else {
          tryCount++
        }
      }

      return (
        <Question
          actor={actor}
          movie={movie}
          onAnswerYes={() => {
            history.push(ROUTE_HIGH_SCORES)
          }}
          onAnswerNo={() => {
            scoreVar(scoreVar() + 1)
            setIndex((prevIndex) => (prevIndex < answerTemplate.current.length ? prevIndex + 1 : 1))
          }}
        />
      )
    }
  }

  return (
    <StyledCard>
      <SameLine>
        <Timer />
        <div>
          <span role="img" aria-label="score">
            ✅{' '}
          </span>
          {scoreVar()}
        </div>
      </SameLine>
      {loading ? <Loader /> : getQuestion()}
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
`

const SameLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Loader = styled.div`
  margin: ${spacers[4]}px auto;
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${colors.main};
    border-color: ${colors.main} transparent ${colors.main} transparent;
    animation: dualRing 1.2s linear infinite;
  }
  @keyframes dualRing {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
