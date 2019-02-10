import * as React from 'react'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'
import { Document } from 'prismic-javascript/d.ts/documents'
import PrismicDom from 'prismic-dom'

import { Description } from './Description'
import { PageContent, Container } from 'components'
import { withPrismicApi } from 'utils/prismic'

export type Props = {
  prismicApi: ResolvedApi | null
}

export type State = {
  document?: Document
}

class InfoViewComponent extends React.Component<Props, State> {
  public state: State = {}

  public componentDidMount (): void {
    this._getDocument()
  }

  public componentDidUpdate ({ prismicApi: oldPrismicApi }: Props): void {
    const { prismicApi } = this.props
    if (oldPrismicApi === null && prismicApi !== null) {
      this._getDocument()
    }
  }

  public render (): React.ReactNode {
    const { document } = this.state
    return (
      <PageContent>
        <Container>
          {this._loading() ? (
            <div>Chargement...</div>
          ) : (
            <Description dangerouslySetInnerHTML={{ __html: PrismicDom.RichText.asHtml(document!.data.description) }} />
          )}
        </Container>
      </PageContent>
    )
  }

  public _getDocument = () => {
    const { prismicApi } = this.props
    if (prismicApi) {
      prismicApi.getSingle('info_page')
        .then(document => this.setState({ document }))
        .catch(console.error) // TODO: Error handling!
    }
  }

  public _loading = () => {
    const { prismicApi } = this.props
    const { document } = this.state

    return prismicApi === null || document === undefined
  }
}

export const InfoView = withPrismicApi<Props>(InfoViewComponent)
