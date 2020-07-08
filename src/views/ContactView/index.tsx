import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import PrismicDom from 'prismic-dom'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'
import { Option, some, none } from 'fp-ts/lib/Option'

import { PageContent, Container, Flex, Loader } from 'components'
import { Spaces, Colors } from 'styles/variable'
import { mobile } from 'styles/responsive'
import { withPrismicApi } from 'utils/prismic'

const textStyle = css`
  font-weight: 300;
  font-size 4rem;
  width: 100%;
  line-height: 1.2;

  ${mobile} {
    font-size: 1.8rem;
  }
`

const Informations = styled.p`
  ${textStyle};
  color: ${Colors.shuttleGray};
  margin-bottom: ${Spaces.medium};
`

const SocialsContainer = styled(Flex)`
  width: 100%;
`

const Social = styled.div`
  ${textStyle}
  color: ${Colors.dodgerBlue};
  word-break: break-all;
`

const LoaderContainer = styled(Flex)`
  width: 100%;
`

type ContactData = {
  behance: string
  instagram: string
  text: string
  telephone: string
  email: string
}

type Props = {
  maybePrismic: Option<ResolvedApi>
}

export const ContactViewComponent: React.FC<Props> = props => {
  const { maybePrismic } = props
  const [maybeContactData, setContactData] = React.useState<Option<ContactData>>(none)

  React.useEffect(() => {
    maybePrismic.map(prismic => {
      if (maybeContactData.isNone()) {
        prismic.getSingle('contact')
          .then(document => {
            const { data } = document
            const contactData: ContactData = {
              behance: data.behance,
              instagram: data.instagram,
              text: PrismicDom.RichText.asHtml(data.text),
              telephone: data.telephone,
              email: data.email
            }
            setContactData(some(contactData))
          })
          .catch(console.error)
      }
    })
  })

  return (
    <PageContent>
      <Container>
        {maybeContactData
          .map(contactData =>
            <>
              <Informations
                dangerouslySetInnerHTML={{ __html: contactData.text }}
              >
              </Informations>
              <SocialsContainer
                direction='column'
                justify='flex-start'
                align='flex-start'
              >
                <Social>{contactData.email}</Social>
                <Social>{contactData.telephone}</Social>
                <Social>{contactData.behance}</Social>
                <Social>{contactData.instagram}</Social>
              </SocialsContainer>
            </>
          )
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

export const ContactView = withPrismicApi(ContactViewComponent)
