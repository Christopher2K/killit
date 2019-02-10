import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

import { Root } from './Root'
import { Brand } from './Brand'
import { Items } from './Items'

export type Props = RouteComponentProps & {}

const NavbarComponent: React.FunctionComponent<Props> = ({ location }) => {
  const { pathname } = location
  return (
    <Root currentPath={pathname}>
      <Brand
        currentPath={pathname}
        firstRow='Eunice'
        lastRow='Tchitchiama'
      />
      <Items currentPath={pathname} />
    </Root >
  )
}

export const Navbar = withRouter(NavbarComponent)
