import * as React from 'react'
import styled from '@emotion/styled'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'
import { Document } from 'prismic-javascript/d.ts/documents'
import PrismicDom from 'prismic-dom'
import { Option, none, some } from 'fp-ts/lib/Option'

import { Description } from './Description'
import { PageContent, Container, Flex, Loader } from 'components'
import { withPrismicApi } from 'utils/prismic'
import { Colors, specialFont } from 'styles/variable'

const LoaderContainer = styled(Flex)`
  width: 100%;
`

const Introduction = styled(Description)`
  p {
    font-family: ${specialFont};
    font-weight: 300;
  }
`

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
          .catch(console.error)
      }
    })
  })

  return (
    <PageContent>
      <Container>
        {maybeDocument
          .map(document => (
            <>
              <Introduction
                color={Colors.dodgerBlue}
                dangerouslySetInnerHTML={{ __html: PrismicDom.RichText.asHtml(document.data.introduction) }}
              />
              <Description
                dangerouslySetInnerHTML={{ __html: PrismicDom.RichText.asHtml(document.data.description_fr) }}
              />
              <Description
                dangerouslySetInnerHTML={{ __html: PrismicDom.RichText.asHtml(document.data.description_en) }}
              />
            </>
          ))
          .getOrElse(
            <LoaderContainer
              direction='column'
              justify='center'
              align='center'
            >
              <Loader
                color={Colors.dodgerBlue}
                size={50}
                run
                infinite
              />
            </LoaderContainer>
          )
        }
      </Container>
    </PageContent>
  )
}

export const InfoView = withPrismicApi(Component)
