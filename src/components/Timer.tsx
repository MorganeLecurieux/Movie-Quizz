import React, { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'

import { timerVar } from '@/core/apolloClient'

import { humanizeTime } from '@/core/timeUtils'

interface TimerProps {
  className?: string
}

export const Timer = ({ className }: TimerProps) => {
  const time = useReactiveVar(timerVar)

  useEffect(() => {
    const timeInterval = setInterval(() => {
      timerVar(timerVar() + 1)
    }, 1000)

    return () => {
      clearInterval(timeInterval)
    }
  }, [])

  return <div className={className}>{humanizeTime(time)}</div>
}
