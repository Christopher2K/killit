import React from 'react'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'
import { Option, none, some } from 'fp-ts/lib/Option'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'
import { Predicates } from 'prismic-javascript'

import { Spaces, navbarTopGap, navbarTopGapMobile } from 'styles/variable'
import { mobile, getPixelNumberFromPixelValue, mobileBreakpoint } from 'styles/responsive'
import { ScrollStatus, Flex } from 'components'
import { withPrismicApi } from 'utils/prismic'
import { fromDocumentToProject, byClassment, Project } from 'models/project'
import { ProjectPresentation } from './ProjectPresentation'

type ScrollDirection = 'top' | 'left'

type Props = {
  maybePrismic: Option<ResolvedApi>
}

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

export const Component: React.FC<Props> = props => {
  const { maybePrismic } = props
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null)
  const [maybeProjects, setProjects] = React.useState<Option<Project[]>>(none)
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

  React.useEffect(() => {
    maybePrismic.map(prismic => {
      if (maybeProjects.isNone()) {
        prismic.query(
          Predicates.at('document.type', 'project'),
          {}
        ).then(response => {
          setProjects(some(response.results.map(fromDocumentToProject).sort(byClassment)))
        })
        .catch(console.error)
      }
    })
  }, [maybePrismic])

  return (
    <Root>
      <ScrollableArea
        ref={el => setContainer(el)}
        onWheel={scrollWithWheel}
      >
        <Content>
          {
            maybeProjects
              .map(projects => projects.map(
                project => <ProjectPresentation key={project.uid} project={project} />
              ))
              .getOrElse([<div key='LOADING'>Chargement</div>])
          }
        </Content>
      </ScrollableArea>
      <ScrollStatus scrollableElement={container} direction={scrollDirection} />
    </Root>
  )
}

export const ProjectsView = withPrismicApi(Component)
