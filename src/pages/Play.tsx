import React, { useEffect, useState, useRef } from 'react'
import { gql, useQuery, useReactiveVar } from '@apollo/client'

import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ROUTE_HIGH_SCORES } from '@/core/routerConfig'
import { scoreVar } from '@/core/apolloClient'

import { Card } from '@/components/generics'
import { Timer } from '@/components/Timer'
import { Question } from '@/components/Question'
import { colors, spacers } from '@/style/variables'

const GET_ACTORS = gql`
  query people($after: String) {
    people {
      popular(first: 100, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
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
      popular(first: 100) {
        pageInfo {
          endCursor
          hasNextPage
        }
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

// Used to make sure a good repartition is made between "yes" and "no" answers
const REPARTITION_ARRAY = [true, true, true, true, true, false, false, false, false, false]

interface IMovie {
  id: string
  title: string
  poster: string
}
interface IActor {
  name: string
  profilePicture: string
  knownFor: IMovie[]
}

interface IActorEdge {
  cursor: string
  node: IActor
}

interface IMovieEdge {
  cursor: string
  node: IMovie
}

/**
 * Get random actor from list
 * If "getMovie" === true, also get a related movie
 */
const getActor = (actorEdges: IActorEdge[], getMovie?: boolean) => {
  if (!actorEdges) return {}
  const actorsCount = actorEdges.length
  let randomIndex = Math.floor(Math.random() * actorsCount)
  let tryCount = 0
  let movieTryCount = 0
  let actor = null
  let movie = null

  // We make several check over an actor before choosing it :
  // Actor must have a picture and we should be able to find a movie related to it if needed
  while (!actor && tryCount < 20) {
    const randomActor = actorEdges[randomIndex]?.node

    if (!!randomActor?.profilePicture) {
      if (!getMovie) {
        // If there's no need to get a movie, set the actor)
        if (!!randomActor?.profilePicture) {
          actor = randomActor
        }
      } else {
        // Find a movie in which the actor has played
        const moviesCount = randomActor?.knownFor?.length
        let randomMovieIndex = Math.floor(Math.random() * moviesCount)

        while (!movie && movieTryCount < 20) {
          if (randomActor?.knownFor?.length) {
            const randomMovie = randomActor?.knownFor[randomMovieIndex]

            // some actors get empty movies as they only played in TVShows, so we check that the title exists
            if (!!randomMovie.title) {
              movie = randomMovie
              actor = randomActor
            }
            randomMovieIndex = randomMovieIndex < moviesCount - 1 ? randomMovieIndex + 1 : 0
          }
          movieTryCount++
        }
      }
    }

    randomIndex = randomIndex < actorsCount - 1 ? randomIndex + 1 : 0
    tryCount++
  }

  return {
    actor,
    movie,
  }
}

// Get a movie in which the given actor hasn't played
const getUnrelatedMovie = (movieEdges: IMovieEdge[], actor: IActor) => {
  if (!movieEdges) return
  const moviesCount = movieEdges.length
  let randomIndex = Math.floor(Math.random() * moviesCount)
  let movie = null

  let tryCount = 0

  while (!movie && tryCount < 20) {
    const randomMovie = movieEdges[randomIndex]?.node
    const index = actor?.knownFor?.findIndex(
      (actorsMovie: IMovie) => actorsMovie.id === randomMovie?.id
    )

    if (index === -1) {
      movie = randomMovie
    }
    tryCount++
    randomIndex = randomIndex < moviesCount - 1 ? randomIndex + 1 : 0
  }
  return movie
}

const Play = () => {
  const history = useHistory()
  const score = useReactiveVar(scoreVar)
  const { data, loading } = useQuery(GET_ACTORS)
  const { data: movieData } = useQuery(GET_MOVIE)
  const answerTemplate = useRef(shuffleArray(REPARTITION_ARRAY)) // Ref as I don't really need the component to re-render on each change
  const [index, setIndex] = useState(0)
  const [question, setQuestion] = useState(null)

  useEffect(() => {
    // When arriving at the end of the repartition array (ie index 9), shuffle a new one to have a new repartition
    if (index === REPARTITION_ARRAY.length - 1) {
      answerTemplate.current = shuffleArray(REPARTITION_ARRAY)
    }
    setQuestion(getQuestion())
  }, [index, data, movieData])

  const getQuestion = () => {
    const { edges } = data?.people?.popular || {}
    if (!edges || !answerTemplate.current) return

    // If answer is "yes", get an actor and a movie he.she played in
    if (answerTemplate.current[index]) {
      const { actor, movie } = getActor(edges, true)

      return {
        actor,
        movie,
        onAnswerYes: () => {
          scoreVar(scoreVar() + 1)
          setIndex((prevIndex) => (prevIndex < answerTemplate.current.length ? prevIndex + 1 : 1))
        },
        onAnswerNo: () => {
          history.push(ROUTE_HIGH_SCORES)
        },
      }
    } else {
      // if answer is no, get an actor and a movie he.she hasn't played in
      const { edges: movieEdges } = movieData?.movies?.popular || {}
      const { actor } = getActor(edges)
      const movie = getUnrelatedMovie(movieEdges, actor)

      return {
        actor,
        movie,
        onAnswerYes: () => {
          history.push(ROUTE_HIGH_SCORES)
        },
        onAnswerNo: () => {
          scoreVar(scoreVar() + 1)
          setIndex((prevIndex) => (prevIndex < answerTemplate.current.length ? prevIndex + 1 : 1))
        },
      }
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
          {score}
        </div>
      </SameLine>
      {loading || !question ? (
        <Loader />
      ) : (
        <Question
          actor={question.actor}
          movie={question.movie}
          onAnswerYes={question.onAnswerYes}
          onAnswerNo={question.onAnswerNo}
        />
      )}
    </StyledCard>
  )
}

export default Play

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
