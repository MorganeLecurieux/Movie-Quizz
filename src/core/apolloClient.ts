import { ApolloClient, NormalizedCacheObject, InMemoryCache } from '@apollo/client'

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://tmdb.apps.quintero.io/',
  cache: new InMemoryCache(),
})
