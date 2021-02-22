import { ApolloClient, NormalizedCacheObject, InMemoryCache, makeVar } from '@apollo/client'

// Reactive variables stored in the cache
export const timerVar = makeVar(0)
export const scoreVar = makeVar(0)

export interface IHighScore {
  userName: string
  score: number
  time: number
}
export const highScoresVar = makeVar<IHighScore[]>([])

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://tmdb.apps.quintero.io/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          timer: {
            read() {
              return timerVar()
            },
          },
          score: {
            read() {
              return scoreVar()
            },
          },
          highScores: {
            read() {
              return highScoresVar()
            },
          },
        },
      },
    },
  }),
})
