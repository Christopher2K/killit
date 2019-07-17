import React from 'react'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'

import separator from 'assets/icons/separator.svg'
import { titleFont, Spaces, Colors } from 'styles/variable'
import { mobile } from 'styles/responsive'
import { Flex } from 'components'
import { Project } from 'models'

const Root = styled(withProps({
  direction: 'row',
  justify: 'flex-start',
  align: 'flex-start'
})(Flex))`
  ${mobile} {
    margin-top: 5px;
  }
`

const Order = styled.h1`
  font-family: ${titleFont}, sans-serif;
  line-height: 0.5;
  font-size: 5.1rem;
  font-style: italic;
  color: ${Colors.linkWater};

  ${mobile} {
    display: none;
  }
`

const Separator = styled.img`
  margin: 0 ${Spaces.tiny};

  ${mobile} {
    display: none;
  }
`

const InformationContainer = styled(withProps({
  direction: 'column',
  justify: 'flex-start',
  align: 'flex-start'
})(Flex))``

const Information = styled.p`
  font-family: ${titleFont};
  font-size: 1rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${Colors.linkWater};

  ${mobile} {
    color: ${Colors.regentGray};
    letter-spacing: 2px;
    font-size: 0.8rem;
  }
`

type Props = {
  className?: string
  project: Project
}

export const ProjectInfo: React.FC<Props> = props => {
  const {
    className,
    project
  } = props

  return (
    <Root className={className}>
      <Order>01</Order>
      <Separator src={separator} />
      <InformationContainer>
        <Information>{project.type}</Information>
        <Information>{project.year}</Information>
      </InformationContainer>
    </Root>
  )
}
