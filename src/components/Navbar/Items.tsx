import * as React from 'react'
import { Flex } from 'components'
import styled from '@emotion/styled'
import { ClassNames } from '@emotion/core'
import { NavLink } from 'react-router-dom'

import * as Variables from 'styles/variable'
import closeIcon from 'assets/icons/close.svg'
import { titleFontStyle } from 'styles/mixins'
import { mobile } from 'styles/responsive'

type RootProps = {
  open: boolean
  currentPath: string
}

const Root = styled(Flex)<RootProps>`
  width: 235px;

  a {
    color: ${props => getLinkColor(props.currentPath)};
  }

  ${mobile} {
    display: ${props => props.open ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: ${Variables.Colors.dodgerBlue};

    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const Item = styled(NavLink)`
  ${titleFontStyle}
  font-size: 2rem;
  text-decoration: none;

  ${mobile} {
    color: ${Variables.Colors.linkWater} !important;
    font-size: 3rem;
    margin-bottom: 45px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 25px;
  right: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: none;

  img {
    width: 18px;
    height: 18px;
  }

  ${mobile} {
    display: block;
  }
`

export type Props = {
  currentPath: string
  open: boolean
  onCloseClick (): void
  onLinkClick (): void
}

export const Items: React.FunctionComponent<Props> = ({
  currentPath,
  onLinkClick,
  onCloseClick,
  open
}) => (
  <Root
    direction='row'
    justify='space-between'
    align='flex-start'
    currentPath={currentPath}
    open={open}
  >
    <ClassNames>
      {({ css }) => {
        const active = css`
          color: ${Variables.Colors.dodgerBlue} !important;
        `
        return (
          <>
            <CloseButton
              onClick={onCloseClick}
            >
              <img src={closeIcon}/>
            </CloseButton>
            <Item
              activeClassName={active}
              onClick={onLinkClick}
              to='/'>
              Projet
            </Item>
            <Item
              activeClassName={active}
              onClick={onLinkClick}
              to='/a-propos'>
              À propos
            </Item>
            <Item
              activeClassName={active}
              onClick={onLinkClick}
              to='/contact'>
              Contact
            </Item>
          </>
        )
      }}
    </ClassNames>
  </Root>
)

function getLinkColor (path: string): string {
  switch (path) {
    case '/': return Variables.Colors.linkWater
    default: return Variables.Colors.shuttleGray
  }
}
