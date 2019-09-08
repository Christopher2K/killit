import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const getSpinningAnimation = (size: number) => keyframes`
  0% { stroke-dasharray: 0 ${3.14 * size}; }
  100% { stroke-dasharray: ${3.14 * size} ${3.14 * size}; }
`

const Root = styled.svg`
  transform: rotate(-90deg);
  border-radius: 50%;
  display: block;
`

type CircleProps = {
  spinningTime: number
  infinite: boolean
  animationSize: number
}
const Circle = styled.circle<CircleProps>`
  fill: transparent;
  stroke-dasharray: 0 ${props => 3.14 * props.animationSize};
  animation: ${props => getSpinningAnimation(props.animationSize)} ${props => props.spinningTime}s ${props => props.infinite ? 'infinite' : ''} forwards linear;
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
            animationSize={size / 2}
            spinningTime={spinningTime}
            strokeWidth={size / 2}
            stroke={color}
            infinite={infinite}
            r={size / 4}
            cx={size / 2}
            cy={size / 2}
            onAnimationEnd={onSpinningEnd}
          />
        </Root>
      )}
    </>
  )
}
