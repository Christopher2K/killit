import React from 'react'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'

import separator from 'assets/icons/separator.svg'
import { titleFont, Spaces, Colors } from 'styles/variable'
import { Flex } from 'components'

const Root = styled(withProps({
  direction: 'row',
  justify: 'flex-start',
  align: 'flex-start'
})(Flex))``

const Order = styled.h1`
  font-family: ${titleFont}, sans-serif;
  line-height: 0.5;
  font-size: 5.1rem;
  font-style: italic;
  color: ${Colors.linkWater};
`

const Separator = styled.img`
  margin: 0 ${Spaces.tiny};
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
`

type Props = {
  className?: string
}

export const ProjectInfo: React.FC<Props> = ({ className }) => {
  return (
    <Root className={className}>
      <Order>01</Order>
      <Separator src={separator} />
      <InformationContainer>
        <Information>Identité visuelle</Information>
        <Information>2018</Information>
      </InformationContainer>
    </Root>
  )
}
