import * as React from 'react'
import { Flex } from 'components'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

import * as Variables from 'styles/variable'
import { titleFontStyle } from 'styles/mixins'

type RootProps = {
  currentPath: string
}

const Root = styled(Flex)`
  width: 235px;
  a {
    color: ${(props: RootProps) => getLinkColor(props.currentPath)};
  }
`

const Item = styled(NavLink)`
  ${titleFontStyle}
  font-size: 2rem;
  color: ${Variables.Colors.regentGray};
  text-decoration: none;
`

export type Props = {
  currentPath: string
}

export const Items: React.FunctionComponent<Props> = ({
  currentPath
}) => (
  <Root
    direction='row'
    justify='space-between'
    align='flex-start'
    currentPath={currentPath}
  >
    <Item to='/'>Projet</Item>
    <Item to='/a-propos'>À propos</Item>
    <Item to='/'>Contact</Item>
  </Root>
)

function getLinkColor (path: string): string {
  switch (path) {
    case '/': return Variables.Colors.linkWater
    default: return Variables.Colors.shuttleGray
  }
}
