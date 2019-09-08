import * as React from 'react'
import { Predicates } from 'prismic-javascript'
import { RouteComponentProps } from 'react-router'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'
import { Option, some, none, fromNullable } from 'fp-ts/lib/Option'

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
  const rootDescriptionElRef = React.useRef<HTMLDivElement>(null)
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null)
  const [maybeProject, setProject] = React.useState<Option<Project>>(none)
  const [maybePrevProject, setPrevProject] = React.useState<Option<Project>>(none)
  const [maybeNextProject, setNextProject] = React.useState<Option<Project>>(none)
  const { bool: descriptionOpen, setBool } = boolState(false)
  const { bool: displaySideProjects, setBool: setDisplaySideProjects } = boolState(false)

  function toggleDescription () {
    setBool(!descriptionOpen)
  }

  function onContentScroll () {
    fromNullable(rootDescriptionElRef.current)
      .map(rootDescriptionEl => {
        const { top, height } = rootDescriptionEl.getBoundingClientRect()
        const offset = top + height
        if (offset <= 0 && !displaySideProjects) {
          setDisplaySideProjects(true)
        } else if (offset >= 0 && displaySideProjects) {
          setDisplaySideProjects(false)
        }
      })
  }

  function getProjectFromQueryResponse (rawData: any): Option<Project> {
    const { results_size, results: [data] } = rawData
    if (results_size !== 1) {
      return none
    } else {
      return some(fromDocumentToProject(data))
    }
  }

  function initView () {
    fromNullable(container)
      .map(el => {
        el.scrollTo({
          top: 0
        })
      })
    setProject(none)
    setPrevProject(none)
    setNextProject(none)
    setDisplaySideProjects(false)

    maybePrismic.map(prismic => {
      prismic.getByUID('project', match.params.name)
        .then(response => {
          const thisProject = fromDocumentToProject(response)
          const prevProjectQuery = prismic.query(Predicates.at('my.project.classement', response.data.classement - 1), {})
          const nextProjectQuery = prismic.query(Predicates.at('my.project.classement', response.data.classement + 1), {})
          Promise.all([prevProjectQuery, nextProjectQuery])
            .then(([prevResp, nextResp]) => {
              const mbNextProject = getProjectFromQueryResponse(prevResp)
              const mbPrevProject = getProjectFromQueryResponse(nextResp)
              setPrevProject(mbPrevProject)
              setNextProject(mbNextProject)
              setProject(some(thisProject))
            })
            .catch(console.error)
        })
        .catch(console.error)
    })
  }

  React.useEffect(initView, [match.params])

  return (
    <PageContent onScroll={onContentScroll}>
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
                    rootRef={rootDescriptionElRef}
                    open={descriptionOpen}
                    fr={project.description.fr}
                    en={project.description.en}
                  />
                  {project.images.map((uri, index) => <LoadableImage key={index} imageUri={uri} />)}
                  {project.embededVideos.map((uri, index) => <LoadableVideo key={index} videoUri={uri} />)}
                  <MobileSeparator />
                  <BottomProjectsContainer>
                    {maybePrevProject.map(prevProject => <BottomProject project={prevProject} side='left' />).toNullable()}
                    {maybeNextProject.map(nextProject => <BottomProject project={nextProject} side='right' />).toNullable()}
                  </BottomProjectsContainer>
                </Container>
                {maybePrevProject.map(prevProject => <SideProjectView project={prevProject} showRoot={displaySideProjects} side='left' />).toNullable()}
                {maybeNextProject.map(nextProject => <SideProjectView project={nextProject} showRoot={displaySideProjects} side='right' />).toNullable()}
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
