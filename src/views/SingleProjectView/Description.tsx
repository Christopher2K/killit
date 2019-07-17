import * as React from 'react'
import { withProps } from 'recompose'
import styled from '@emotion/styled'

import { Flex } from 'components'
import * as Variables from 'styles/variable'
import { mobile } from 'styles/responsive'

type RootProps = {
  open: boolean
}
const Root = styled(
  withProps({
    direction: 'row',
    justify: 'flex-start',
    align: 'flex-start'
  })(Flex)
)`
  width: 100%;
  margin-bottom: ${Variables.Spaces.medium};

  ${mobile} {
    display: ${(props: RootProps) => props.open ? 'flex' : 'none'};
    flex-direction: column;
  }
`

const Paragraph = styled.p`
  font-family: ${Variables.bodyFont};
  font-size: 1.5rem;
  flex: 1;
  color: ${Variables.Colors.shuttleGray};
  line-height: 150%;


  ${mobile} {
    font-size: 1.45rem;
  }

  &:first-of-type {
    margin-right: ${Variables.Spaces.medium};
    ${mobile} {
      margin-right: 0;
      margin-bottom: ${Variables.Spaces.medium};
    }
  }

  &:last-of-type {
    margin-left: ${Variables.Spaces.medium};
    ${mobile} {
      margin-left: 0;
    }
  }
`

type Props = {
  open: boolean
  fr: string
  en: string
}

export const Description: React.FunctionComponent<Props> = props => {
  const { open, fr, en } = props
  return (
    <Root open={open}>
      <Paragraph dangerouslySetInnerHTML={{ __html: fr }}/>
      <Paragraph dangerouslySetInnerHTML={{ __html: en }}/>
    </Root>
  )
}
