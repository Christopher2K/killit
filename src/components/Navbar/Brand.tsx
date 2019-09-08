import * as React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import * as Variables from 'styles/variable'
import { titleFontStyle } from 'styles/mixins'
import { mobile } from 'styles/responsive'

type RootProps = {
  currentPath: string
}

const Root = styled(Link)<RootProps>`
  width: 235px;
  color: ${props => getBackgroundColor(props.currentPath)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-decoration: none;

  ${mobile} {
    width: 140px;
  }
`

type TitleProps = {
  withLeftOffset?: boolean
}

const Title = styled.h1<TitleProps>`
  ${titleFontStyle}
  font-size: 4rem;
  color: inherit;
  margin-left: ${props => props.withLeftOffset ? Variables.Spaces.small : 0};

  ${mobile} {
    font-size: 2.2rem;
    margin-left: ${props => props.withLeftOffset ? Variables.Spaces.tiny : 0};
  }
`

export type Props = {
  firstRow: string
  lastRow: string
  currentPath: string
}

export const Brand: React.FunctionComponent<Props> = ({
  firstRow,
  lastRow,
  currentPath
}) => (
  <Root
    to='/'
    currentPath={currentPath}
  >
    <Title>{firstRow}</Title>
    <Title withLeftOffset>{lastRow}</Title>
  </Root>
)

function getBackgroundColor (path: string): string {
  switch (path) {
    case '/': return Variables.Colors.linkWater
    default: return Variables.Colors.dodgerBlue
  }
}
