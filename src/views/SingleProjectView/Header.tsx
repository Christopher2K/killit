import * as React from 'react'
import { withProps } from 'recompose'
import styled from '@emotion/styled'

import { Flex } from 'components'
import * as Variables from 'styles/variable'
import { mobile } from 'styles/responsive'

import { Separator, MobileSeparator } from './Separator'

const Root = styled(
  withProps({
    direction: 'column',
    justify: 'flex-start',
    align: 'flex-start'
  })(Flex)
)`
  width: 100%;
  margin-bottom: ${Variables.Spaces.tiny};

  ${mobile} {
    margin-top: ${Variables.Spaces.tiny};
  }
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

  ${mobile} {
    margin: ${Variables.Spaces.small} 0;
    flex-direction: column;
  }
`
const SubInformationContainer = styled(
  withProps({
    direction: 'column',
    justify: 'flex-start',
    align: 'flex-start'
  })(Flex)
)`
  ${mobile} {
    width: 100%;
  }
`

const Title = styled.h1`
  font-family: ${Variables.titleFont};
  font-weight: bold;
  font-size: 5rem;
  color: ${Variables.Colors.paleSky};
  margin-right: ${Variables.Spaces.tiny};

  ${mobile} {
    width: 100%;
    font-size: 2rem;
    margin-right: 0;
    text-align: left;

    margin-bottom: ${Variables.Spaces.tiny};
  }
`

const Information = styled.h2`
  font-family: ${Variables.titleFont};
  font-size: 1.3rem;
  color: ${Variables.Colors.paleSky};

  &:first-of-type {
    line-height: 2;
  }

  ${mobile} {
    display: block;
    width: 100%;
    line-height: 1.5;
    font-size: 1.05rem;
    text-align: left;

    &:first-of-type {
      line-height: 1.5;
    }
  }
`

interface Props {}

export const Header: React.FunctionComponent<Props> = () => (
  <Root>
    <MobileSeparator />
    <InformationsContainer>
      <Title>Nom du projet</Title>
      <SubInformationContainer>
        <Information>Catégorie design</Information>
        <Information>2019</Information>
      </SubInformationContainer>
    </InformationsContainer>
    <Separator />
  </Root>
)
