import React from 'react'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'

import { ScrollStatus, Flex } from 'components'
import { navbarTopGap, scrollStatusHeight } from 'styles/variable'
import { ProjectPresentation } from './ProjectPresentation'

const Root = styled.div`
  width: 100%;
  height: calc(100% - ${navbarTopGap});
  margin-top: ${navbarTopGap};
`

const ScrollableArea = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - ${scrollStatusHeight});

  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
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
`

export type Props = {}

export const ProjectsView: React.FC<Props> = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  function scrollWithWheel (event: React.WheelEvent<HTMLDivElement>) {
    event.preventDefault()
    const target: HTMLDivElement = event.currentTarget as HTMLDivElement

    target.scrollLeft = target.scrollLeft + event.deltaY
  }

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
      <ScrollStatus scrollableElement={containerRef.current} direction='left' />
    </Root>
  )
}
