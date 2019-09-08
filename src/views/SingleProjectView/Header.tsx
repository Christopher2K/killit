import * as React from 'react'
import { withProps } from 'recompose'
import styled from '@emotion/styled'

import expand from 'assets/icons/expand.svg'
import collapse from 'assets/icons/collapse.svg'
import { Flex } from 'components'
import { Project } from 'models'
import * as Variables from 'styles/variable'
import { mobile } from 'styles/responsive'
import { firstLetterCapitalized } from 'utils/string'

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
  margin-bottom: 1.5rem;

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

const TitleContainer = styled(
  withProps({
    direction: 'row',
    justify: 'flex-start',
    align: 'center'
  })(Flex)
)`
  display: inline-flex;

  ${mobile} {
    width: 100%;
    margin-bottom: ${Variables.Spaces.tiny};
  }
`

const Title = styled.h1`
  font-family: ${Variables.titleFont};
  font-weight: bold;
  font-size: 3.2rem;
  color: ${Variables.Colors.shuttleGray};
  margin-right: ${Variables.Spaces.tiny};

  ${mobile} {
    font-size: 2rem;
    margin-right: 0;
    text-align: left;
  }
`

const Information = styled.h2`
  display: none;
  font-family: ${Variables.titleFont};
  font-size: 1.3rem;
  color: ${Variables.Colors.shuttleGray};

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

const ContentToggle = styled.button`
  display: none;

  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;

  flex-shrink: 0;
  width: 18px;
  margin-left: ${Variables.Spaces.tiny};
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }

  ${mobile} {
    display: flex;
  }
`

const DekstopInformation = styled.p`
  margin-top: ${Variables.Spaces.large};
  font-size: 1.5rem;
  color: ${Variables.Colors.shuttleGray};

  ${mobile} {
    display: none;
  }
`

interface Props {
  project: Project
  contentOpen: boolean
  toggleContent (): void
}

export const Header: React.FunctionComponent<Props> = props => {
  const { contentOpen, project, toggleContent } = props
  return (
    <Root>
      <MobileSeparator />
      <InformationsContainer>
        <TitleContainer>
          <Title>{project.title}</Title>
          <ContentToggle onClick={toggleContent}>
            <img src={contentOpen ? collapse : expand} />
          </ContentToggle>
        </TitleContainer>
        <SubInformationContainer>
          <Information>{project.type}, {project.year}</Information>
        </SubInformationContainer>
      </InformationsContainer>
      <Separator />
      <DekstopInformation>{firstLetterCapitalized(project.type)}, {project.year}</DekstopInformation>
    </Root>
  )

}
