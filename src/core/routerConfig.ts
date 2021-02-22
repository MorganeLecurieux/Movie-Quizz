import { ComponentType, lazy } from 'react'

export const ROUTE_HOME = '/'
export const ROUTE_PLAY = '/play'
export const ROUTE_HIGH_SCORES = '/high-scores'

const Starter = lazy(() => import('@/pages/Starter'))
const Play = lazy(() => import('@/pages/Play'))
const HighScores = lazy(() => import('@/pages/HighScores'))

import { scoreVar } from '@/core/apolloClient'

interface IRoute {
  path: string
  components: ComponentType
  exact?: boolean
  onEnter?: () => void
}

export const routes: IRoute[] = [
  {
    path: ROUTE_HOME,
    components: Starter,
    exact: true,
  },
  {
    path: ROUTE_PLAY,
    components: Play,
    onEnter: () => scoreVar(0),
  },
  {
    path: ROUTE_HIGH_SCORES,
    components: HighScores,
  },
]
