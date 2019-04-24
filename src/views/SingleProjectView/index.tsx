import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { PageContent, Container, ScrollStatus } from 'components'

import { Header } from './Header'
import { Description } from './Description'
import { LoadableImage } from './LoadableImage'

export type RouterParams = {
  name: string
}

export type Props = {} & RouteComponentProps<RouterParams>

export const SingleProjectView: React.FunctionComponent<Props> = ({
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
      </Container>
      <ScrollStatus
        scrollableElement={containerRef.current}
      />
    </PageContent>
  )
}
