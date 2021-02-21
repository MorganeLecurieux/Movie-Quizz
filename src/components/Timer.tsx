import React, { Component } from 'react'
import styled from 'styled-components'

import { spacers } from '@/style/variables'
import { timerVar } from '@/core/apolloClient'

interface TimerProps {
  className?: string
}

interface TimerState {
  time: number
}

/**
 * Simple function to humanize time on format 'x hours y min z s'
 * We could use a built in library but regarding the needs in the project,
 * a super light weight function is better in my opinion
 */
const humanizeTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / (60 * 60))
  const minutes = Math.floor((timeInSeconds - hours * 60 * 60) / 60)
  const seconds = timeInSeconds % 60

  return (
    <>
      {hours > 0 && <span>{hours} hours</span>}
      {minutes > 0 && <span>{minutes} min</span>}
      {seconds > 0 && <span>{seconds} s</span>}
    </>
  )
}

/**
 * A class component is used here as we need to access the state in the 'componentWillUnmount'
 * The only way to do that in a functionnal component with useEffect is to use a ref and update it
 * on each state change.
 * IE each seconds we update the state + the ref, which is kinda lame and I didn't wanter to update
 * the cache each second either.
 * So class component is the best option for this use case.
 */
export class Timer extends Component<TimerProps, TimerState> {
  private intervalId: number

  constructor(props: TimerProps) {
    super(props)
    this.state = { time: 0 }
  }

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.setState({ time: this.state.time + 1 })
    }, 1000)
  }

  componentWillUnmount() {
    timerVar(this.state.time)
    clearInterval(this.intervalId)
  }

  render() {
    return <Container className={this.props.className}>{humanizeTime(this.state.time)}</Container>
  }
}

const Container = styled.div`
  > *:not(:first-child) {
    margin-left: ${spacers[1]}px;
  }
`
