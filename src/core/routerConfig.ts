import { ComponentType } from 'react'
import { HighScores } from '@/pages/HighScores'
import { Play } from '@/pages/Play'
import { Starter } from '@/pages/Starter'

export const ROUTE_HOME = '/'
export const ROUTE_PLAY = '/play'
export const ROUTE_HIGH_SCORES = '/high-scores'

interface IRoute {
  path: string
  components: ComponentType
  exact?: boolean
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
  },
  {
    path: ROUTE_HIGH_SCORES,
    components: HighScores,
  },
]
