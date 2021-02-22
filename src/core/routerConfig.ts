import { ComponentType, lazy } from 'react'
import { Starter } from '@/pages/Starter'
import { Play } from '@/pages/Play'
import { HighScores } from '@/pages/HighScores'

export const ROUTE_HOME = '/'
export const ROUTE_PLAY = '/play'
export const ROUTE_HIGH_SCORES = '/high-scores'

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
