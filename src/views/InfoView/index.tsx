import * as React from 'react'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'
import { Document } from 'prismic-javascript/d.ts/documents'
import PrismicDom from 'prismic-dom'
import { Option, none, some, option } from 'fp-ts/lib/Option'
import { sequenceT } from 'fp-ts/lib/Apply'

import { Description } from './Description'
import { PageContent, Container } from 'components'
import { withPrismicApi } from 'utils/prismic'

type Props = {
  maybePrismic: Option<ResolvedApi>
}

const Component: React.FC<Props> = props => {
  const { maybePrismic } = props
  const [maybeDocument, setDocument] = React.useState<Option<Document>>(none)

  React.useEffect(() => {
    maybePrismic.map(prismic => {
      if (maybeDocument.isNone()) {
        prismic.getSingle('info_page')
          .then(document => setDocument(some(document)))
          .catch(console.error) // TODO: Error handling!
      }
    })
  })

  return (
    <PageContent>
      <Container>
        {
          sequenceT(option)(maybeDocument, maybePrismic)
            .map(([document]) => (
              <Description
                dangerouslySetInnerHTML={{ __html: PrismicDom.RichText.asHtml(document.data.description) }}
              />
            ))
            .getOrElse(
              <div>Chargement...</div>
            )
        }
      </Container>
    </PageContent>
  )
}

export const InfoView = withPrismicApi(Component)
