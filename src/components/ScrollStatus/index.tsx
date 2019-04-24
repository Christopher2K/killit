import React from 'react'
import styled from '@emotion/styled'

import { Colors } from 'styles/variable'

type Props = {
  scrollableElement: HTMLElement | null
}

const Root = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
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

  background-color: ${Colors.dodgerBlue};
`

export const ScrollStatus: React.FunctionComponent<Props> = ({
  scrollableElement
}) => {
  const [scrollPercentage, setScrollPercentage] = React.useState(0)

  function updateScrollPercentage (evt: Event) {
    const {
      scrollHeight,
      scrollTop,
      offsetHeight
    }: HTMLElement = evt.target as HTMLElement
    const remainingScroll = scrollHeight - (scrollTop + offsetHeight)
    const maxScroll = scrollHeight - offsetHeight

    const percentageScrolled = Math.round(((maxScroll - remainingScroll) / maxScroll) * 100)

    setScrollPercentage(percentageScrolled)
  }

  React.useEffect(() => {
    if (scrollableElement != null) {
      scrollableElement.addEventListener('scroll', updateScrollPercentage)
    }
    return function cleanup () {
      if (scrollableElement != null) {
        scrollableElement.removeEventListener('scroll', updateScrollPercentage)
      }
    }
  })

  console.warn(scrollableElement)

  return (
    <>
     {scrollableElement != null && (
        <Root>
          <Bar percentage={scrollPercentage}/>
        </Root>
     )}
    </>
  )
}
