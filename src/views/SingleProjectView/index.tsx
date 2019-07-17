import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'
import { Option, some, none } from 'fp-ts/lib/Option'

import { PageContent, Container, ScrollStatus, Flex } from 'components'
import { mobile } from 'styles/responsive'
import { Spaces } from 'styles/variable'
import { boolState } from 'sharedHooks/boolState'
import { Project, fromDocumentToProject } from 'models'
import { withPrismicApi } from 'utils/prismic'

import { Header } from './Header'
import { Description } from './Description'
import { LoadableImage } from './LoadableImage'
import { LoadableVideo } from './LoadableVideo'
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

export type Props = {
  maybePrismic: Option<ResolvedApi>
} & RouteComponentProps<RouterParams>

const Component: React.FC<Props> = props => {
  const {
    match,
    maybePrismic
  } = props
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null)
  const [maybeProject, setProject] = React.useState<Option<Project>>(none)
  const { bool: descriptionOpen, setBool } = boolState(false)

  function toggleDescription () {
    setBool(!descriptionOpen)
  }

  React.useEffect(() => {
    maybePrismic.map(prismic => {
      if (maybeProject.isNone()) {
        prismic.getByUID('project', match.params.name)
          .then(response => setProject(some(fromDocumentToProject(response))))
          .catch(console.error)
      }
    })
  })

  return (
    <PageContent>
      {
        maybeProject
          .map(project => {
            return (
              <React.Fragment>
                <Container
                  wrapperRef={el => setContainer(el)}
                >
                  <Header
                    toggleContent={toggleDescription}
                    contentOpen={descriptionOpen}
                    project={project}
                  />
                  <Description
                    open={descriptionOpen}
                    fr={project.description.fr}
                    en={project.description.en}
                  />
                  {project.images.map((uri, index) => <LoadableImage key={index} imageUri={uri} />)}
                  {project.embededVideos.map((uri, index) => <LoadableVideo key={index} videoUri={uri} />)}
                  <MobileSeparator />
                  <BottomProjectsContainer>
                    <BottomProject side='left' />
                    <BottomProject side='right' />
                  </BottomProjectsContainer>
                </Container>
                <SideProjectView side='left' />
                <SideProjectView side='right' />
                <ScrollStatus scrollableElement={container} direction='top' />
              </React.Fragment>
            )
          })
          .getOrElse(<></>)
      }
    </PageContent>
  )
}

export const SingleProjectView = withPrismicApi(Component)
