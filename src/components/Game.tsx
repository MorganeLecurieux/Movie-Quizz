import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_ACTORS = gql`
  query people {
    people {
      popular(first: 50) {
        totalCount
        edges {
          cursor
          node {
            name
            knownFor {
              ... on MovieResult {
                title
              }
            }
          }
        }
      }
    }
  }
`

export const Game = () => {
  const { loading, data } = useQuery(GET_ACTORS)
  console.log(data)
  return <div>{loading}</div>
}
