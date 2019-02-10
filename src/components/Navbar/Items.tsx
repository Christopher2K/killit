import * as React from 'react'
import { Flex } from 'components'
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'

import * as Variables from 'styles/variable'

const Item = styled(NavLink)`
  font-family: ${Variables.titleFont};
  font-size: 2rem;
  color: ${Variables.Colors.regentGray};
  text-decoration: none;
  margin-right: ${Variables.Spaces.small};

  &:last-of-type {
    margin-right: 0;
  }
`

export type Props = {}

export const Items: React.FunctionComponent<Props> = () => (
  <Flex
    direction='row'
    justify='flex-start'
    align='flex-start'
  >
    <Item to='/'>Projet</Item>
    <Item to='/'>À propos</Item>
    <Item to='/'>Contact</Item>
  </Flex>
)
