import * as React from 'react'
import styled from '@emotion/styled'

import { Flex } from 'components'
import * as Variables from 'styles/variable'

type TitleProps = {
  withLeftOffset?: boolean
}

const Title = styled.h1`
  font-family: ${Variables.titleFont};
  font-size: 4rem;
  color: ${Variables.Colors.regentGray};
  margin-left: ${(props: TitleProps) => props.withLeftOffset ? Variables.Spaces.small : 0};
`

export type Props = {
  firstRow: string
  lastRow: string
}

export const Brand: React.FunctionComponent<Props> = ({
  firstRow,
  lastRow
}) => (
  <Flex
    direction='column'
    justify='flex-start'
    align='flex-start'
  >
    <Title>{firstRow}</Title>
    <Title withLeftOffset>{lastRow}</Title>
  </Flex>
)
