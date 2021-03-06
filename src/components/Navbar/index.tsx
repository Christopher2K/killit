import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

import { Root } from './Root'
import { Brand } from './Brand'
import { Items } from './Items'
import { boolState } from 'sharedHooks/boolState'
import { Burger } from './Burger'

export type Props = RouteComponentProps & {}

const NavbarComponent: React.FunctionComponent<Props> = ({ location }) => {
  const { pathname } = location
  const {
    bool: open,
    setBool: setMenuState
  } = boolState(false)

  function closeMenu () {
    setMenuState(false)
  }

  function openMenu () {
    setMenuState(true)
  }

  return (
    <Root currentPath={pathname}>
      <Brand
        currentPath={pathname}
      />
      <Items
        currentPath={pathname}
        open={open}
        onCloseClick={closeMenu}
        onLinkClick={closeMenu}
      />
      <Burger
        onClick={openMenu}
        mode={pathname === '/' ? 'light' : 'dark'}
      />
    </Root>
  )
}

export const Navbar = withRouter(NavbarComponent)
