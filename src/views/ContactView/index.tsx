import React from 'react'
import styled from '@emotion/styled'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'
import { Option, some, none } from 'fp-ts/lib/Option'

import { PageContent, Container, Flex, Loader } from 'components'
import { Spaces, Colors, bodyFont } from 'styles/variable'
import { titleFontStyle } from 'styles/mixins'
import { withPrismicApi } from 'utils/prismic'
import behance from 'assets/icons/behance.svg'
import linkedin from 'assets/icons/linkedin.svg'
import instagram from 'assets/icons/instagram.svg'

const Title = styled.h1`
  ${titleFontStyle};
  font-size: 3.6rem;
  line-height: 1.3;
  color: ${Colors.shuttleGray};
  width: 100%;

  margin-bottom: ${Spaces.medium};
`

const Informations = styled(Flex)`
  margin-bottom: ${Spaces.medium};
`

const LinkInformation = styled.a`
  display: block;
  text-decoration: none;
  font-family: ${bodyFont};
  color: ${Colors.shuttleGray};
  font-size: 1.5rem;
  line-height: 1.5;
`

const SocialsContainer = styled(Flex)`
  width: 100%;
`

const IconLink = styled.a`
  display: block;
  text-decoration: none;
  width: 70px;
  height: auto;
  margin-right: ${Spaces.tiny};

  &:last-of-type {
    margin-right: 0;
    margin-bottom: 0;
  }
`

const Icon = styled.img`
  width: 100%;
`

const LoaderContainer = styled(Flex)`
  width: 100%;
`

type ContactData = {
  behance: string
  instagram: string
  linkedin: string
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
              behance: data.behance.url,
              instagram: data.instagram.url,
              linkedin: data.linkedin.url,
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
              <Title>Pour me contacter</Title>
              <Informations
                direction='column'
                justify='flex-start'
                align='flex-start'
              >
                <LinkInformation href={`tel:${contactData.telephone.split(' ').join()}`}>
                  {contactData.telephone}
                </LinkInformation>
                <LinkInformation href={`mailto:${contactData.email}`}>
                  {contactData.email}
                </LinkInformation>
              </Informations>
              <SocialsContainer
                direction='row'
                justify='flex-start'
                align='center'
              >
                <IconLink target='blank' href={contactData.behance}>
                  <Icon src={behance} alt='Behance' />
                </IconLink>
                <IconLink target='blank' href={contactData.instagram}>
                  <Icon src={instagram} alt='Instagram' />
                </IconLink>
                <IconLink target='blank' href={contactData.linkedin}>
                  <Icon src={linkedin} alt='LinkedIn' />
                </IconLink>
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
