import * as React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import * as Variables from 'styles/variable'
import { mobile } from 'styles/responsive'
import { Monogram } from 'components/Monogram'

type RootProps = {
  currentPath: string
}

const Root = styled(Link)<RootProps>`
  height: 80px;
  display: flex;

  ${mobile} {
    height: 35px;
  }

  svg {
    height: 100%;
    width: auto;
  }
`

export type Props = {
  currentPath: string
}

export const Brand: React.FunctionComponent<Props> = ({
  currentPath
}) => (
  <Root
    to='/'
    currentPath={currentPath}
  >
    <Monogram color={getBackgroundColor(currentPath)} />
  </Root>
)

function getBackgroundColor (path: string): string {
  switch (path) {
    case '/': return Variables.Colors.linkWater
    default: return Variables.Colors.dodgerBlue
  }
}
