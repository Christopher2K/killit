import * as React from 'react'
import { withProps } from 'recompose'
import styled from '@emotion/styled'

import { Flex } from 'components'
import * as Variables from 'styles/variable'

const Root = styled(
  withProps({
    direction: 'column',
    justify: 'flex-start',
    align: 'flex-start'
  })(Flex)
)`
  width: 100%;
  margin-bottom: ${Variables.Spaces.tiny};
`

const InformationsContainer = styled(
  withProps({
    direction: 'row',
    justify: 'flex-start',
    align: 'center'
  })(Flex)
)`
  width: 100%;
  margin-bottom: ${Variables.Spaces.small};
`

const Title = styled.h1`
  font-family: ${Variables.titleFont};
  font-weight: bold;
  font-size: 5rem;
  color: ${Variables.Colors.paleSky};
  margin-right: ${Variables.Spaces.tiny};
`

const Information = styled.h2`
  font-family: ${Variables.titleFont};
  font-weight: bold;
  font-size: 1.3rem;
  color: ${Variables.Colors.paleSky};
`

const Separator = styled.hr`
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${Variables.Colors.paleSky};
  border-top: 0;
  margin: 0;
`

interface Props {}

export const Header: React.FunctionComponent<Props> = () => (
  <Root>
    <InformationsContainer>
      <Title>Nom du projet</Title>
      <Flex
        direction='column'
        justify='flex-start'
        align='flex-start'
      >
        <Information>Catégorie design</Information>
        <Information>2019</Information>
      </Flex>
    </InformationsContainer>
    <Separator />
  </Root>
)
