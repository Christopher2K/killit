import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'

import { PageContent, Container, ScrollStatus, Flex } from 'components'
import { mobile } from 'styles/responsive'
import { Spaces } from 'styles/variable'

import { Header } from './Header'
import { Description } from './Description'
import { LoadableImage } from './LoadableImage'
import { SideProjectView } from './SideProjectView'
import { BottomProject } from './BottomProject'
import { MobileSeparator } from './Separator'

const BottomProjectsContainer = styled(withProps({
  direction: 'row',
  justify: 'flex-start',
  align: 'flex-start'
})(Flex))`
  display: none;
  width: 100%;
  padding: ${Spaces.large} 0;

  ${mobile} {
    display: flex;
  }
`

export type RouterParams = {
  name: string
}

export type Props = {} & RouteComponentProps<RouterParams>

export const SingleProjectView: React.FC<Props> = ({
  match
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    console.warn(match.params)
  }, [match.params.name])

  console.warn(containerRef)

  return (
    <PageContent>
      <Container
        wrapperRef={containerRef}
      >
        <Header />
        <Description />
        <LoadableImage imageUri='https://www.tourisme.fr/images/otf_offices/792/pont-vieux-d-viet.jpg' />
        <LoadableImage imageUri='https://www.tourisme.fr/images/otf_offices/792/pont-vieux-d-viet.jpg' />
        <MobileSeparator />
        <BottomProjectsContainer>
          <BottomProject side='left' />
          <BottomProject side='right' />
        </BottomProjectsContainer>
      </Container>
      <SideProjectView side='left' />
      <SideProjectView side='right' />
      <ScrollStatus scrollableElement={containerRef.current} />
    </PageContent>
  )
}
