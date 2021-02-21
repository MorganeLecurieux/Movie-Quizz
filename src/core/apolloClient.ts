import { ApolloClient, NormalizedCacheObject, InMemoryCache, makeVar } from '@apollo/client'

// Reactive variables stored in the cache
export const timerVar = makeVar(0)
export const scoreVar = makeVar(0)

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
        },
      },
    },
  }),
})
