import React from 'react'
import styled from '@emotion/styled'

import { Colors, scrollStatusHeight } from 'styles/variable'
import { mobile } from 'styles/responsive'

type ScrollDirection = 'top' | 'left'

type Props = {
  scrollableElement: HTMLElement | null
  direction: ScrollDirection
}

const Root = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${scrollStatusHeight};
  z-index: 1000;
  background-color: #C4C4C4;
`

type BarProps = {
  percentage: number
}

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: ${(props: BarProps) => props.percentage}%;
  height: 100%;

  transition: 400ms width ease-out;
  background-color: ${Colors.dodgerBlue};

  ${mobile} {
    transition: none;
  }
`

export const ScrollStatus: React.FunctionComponent<Props> = ({
  scrollableElement,
  direction
}) => {
  const [scrollPercentage, setScrollPercentage] = React.useState(0)

  function updateScrollPercentage (evt: Event) {
    let maxScroll: number = 0
    let remainingScroll: number = 1

    if (direction === 'top') {
      const {
        scrollHeight,
        scrollTop,
        offsetHeight
      }: HTMLElement = evt.target as HTMLElement
      remainingScroll = scrollHeight - (scrollTop + offsetHeight)
      maxScroll = scrollHeight - offsetHeight
    } else {
      const {
        scrollWidth,
        scrollLeft,
        offsetWidth
      }: HTMLElement = evt.target as HTMLElement
      remainingScroll = scrollWidth - (scrollLeft + offsetWidth)
      maxScroll = scrollWidth - offsetWidth
    }

    const percentageScrolled = Math.round(((maxScroll - remainingScroll) / maxScroll) * 100)
    setScrollPercentage(percentageScrolled)
  }

  React.useEffect(() => {
    if (scrollableElement !== null) {
      scrollableElement.addEventListener('scroll', updateScrollPercentage)
    }
    return function cleanup () {
      if (scrollableElement !== null) {
        scrollableElement.removeEventListener('scroll', updateScrollPercentage)
      }
    }
  })

  return (
    <>
     {scrollableElement !== null && (
        <Root>
          <Bar percentage={scrollPercentage}/>
        </Root>
     )}
    </>
  )
}
