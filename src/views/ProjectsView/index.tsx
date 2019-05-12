import React from 'react'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'

import { Spaces, navbarTopGap, navbarTopGapMobile } from 'styles/variable'
import { mobile, getPixelNumberFromPixelValue, mobileBreakpoint } from 'styles/responsive'
import { ScrollStatus, Flex } from 'components'
import { ProjectPresentation } from './ProjectPresentation'

type ScrollDirection = 'top' | 'left'

export type Props = {}

const Root = styled.div`
  width: 100%;
  height: calc(100% - ${navbarTopGap});
  margin-top: ${navbarTopGap};

  ${mobile} {
    margin-top: ${navbarTopGapMobile};
    height: calc(100% - ${navbarTopGapMobile});
  }
`

const ScrollableArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  ${mobile} {
    overflow-x: hidden;
    overflow-y: scroll;
  }
`

const Content = styled(withProps({
  direction: 'row',
  justify: 'flex-start',
  align: 'center'
})(Flex))`
  position: absolute;
  top: 0;
  left: 0;
  width: auto;
  flex-wrap: no-wrap;
  height: 100%;
  padding: 0 10vw;

  ${mobile} {
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 0 ${Spaces.large};
  }
`

export const ProjectsView: React.FC<Props> = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [scrollDirection, setScrollDirection] = React.useState<ScrollDirection>(() => {
    if (window.innerWidth > getPixelNumberFromPixelValue(mobileBreakpoint)) {
      return 'left'
    }
    return 'top'
  })

  function scrollWithWheel (event: React.WheelEvent<HTMLDivElement>) {
    if (window.innerWidth > getPixelNumberFromPixelValue(mobileBreakpoint)) {
      event.preventDefault()
      const target: HTMLDivElement = event.currentTarget as HTMLDivElement
      target.scrollLeft = target.scrollLeft + event.deltaY
    }
  }

  function handleResizing () {
    if (window.innerWidth > getPixelNumberFromPixelValue(mobileBreakpoint) && scrollDirection === 'top') {
      setScrollDirection('left')
    } else if (window.innerWidth <= getPixelNumberFromPixelValue(mobileBreakpoint) && scrollDirection === 'left') {
      setScrollDirection('top')
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResizing)

    return function cleanup () {
      window.removeEventListener('resize', handleResizing)
    }
  })

  console.warn(containerRef)
  return (
    <Root>
      <ScrollableArea
        ref={containerRef}
        onWheel={scrollWithWheel}
      >
        <Content>
          <ProjectPresentation imgSrc='https://www.tourisme.fr/images/otf_offices/792/pont-vieux-d-viet.jpg' />
          <ProjectPresentation imgSrc='https://www.tuxboard.com/photos/2016/10/image-arriere-plan-smartphone-golden-gate.jpg' />
        </Content>
      </ScrollableArea>
      <ScrollStatus scrollableElement={containerRef.current} direction={scrollDirection} />
    </Root>
  )
}
