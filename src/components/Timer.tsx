import React, { Component } from 'react'
import styled from 'styled-components'

import { spacers } from '@/style/variables'
import { timerVar } from '@/core/apolloClient'

import { humanizeTime } from '@/core/timeUtils'

interface TimerProps {
  className?: string
}

interface TimerState {
  time: number
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
    return <div className={this.props.className}>{humanizeTime(this.state.time)}</div>
  }
}
