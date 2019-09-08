import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const spinning = keyframes`
  0% { stroke-dasharray: 0 158; }
  100% { stroke-dasharray: 158 158; }
`

const Root = styled.svg`
  transform: rotate(-90deg);
  border-radius: 50%;
  display: block;
`

type CircleProps = {
  spinningTime: number
  infinite: boolean
}
const Circle = styled.circle<CircleProps>`
  fill: transparent;
  stroke-dasharray: 0 158;
  animation: ${spinning} ${props => props.spinningTime}s ${props => props.infinite ? 'infinite' : ''} forwards linear;
`

type Props = {
  size?: number
  color: string
  spinningTime?: number
  infinite?: boolean
  run: boolean
  className?: string
  onSpinningEnd?: () => void
}

export const Loader: React.FC<Props> = props => {
  const {
    size = 100,
    spinningTime = 10,
    infinite = false,
    color,
    run,
    onSpinningEnd,
    className
  } = props

  return (
    <>
      {run && (
        <Root width={size} height={size} className={className}>
          <Circle
            spinningTime={spinningTime}
            strokeWidth={size / 2}
            stroke={color}
            infinite={infinite}
            r={size / 4}
            cx={size / 2}
            cy={size / 2}
            onAnimationEndCapture={onSpinningEnd}
          />
        </Root>
      )}
    </>
  )
}
