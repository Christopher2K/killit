import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { PageContent, Container } from 'components'

import { Header } from './Header'
import { Description } from './Description'
import { LoadableImage } from './LoadableImage'

export type RouterParams = {
  name: string
}

export type Props = {} & RouteComponentProps<RouterParams>

export type State = {}

export class SingleProjectView extends React.Component<Props, State> {
  public state: State = {}

  public componentDidMount () {
    console.warn(this.props.match.params)
  }

  public render (): React.ReactNode {
    return (
      <PageContent>
        <Container>
          <Header />
          <Description />
          <LoadableImage imageUri='https://www.tourisme.fr/images/otf_offices/792/pont-vieux-d-viet.jpg' />
          <LoadableImage imageUri='https://www.tourisme.fr/images/otf_offices/792/pont-vieux-d-viet.jpg' />
        </Container>
      </PageContent>
    )
  }
}
