import * as React from 'react'
import styled from '@emotion/styled'

import { mobile } from 'styles/responsive'
import burgerDark from 'assets/icons/burger--dark.svg'
import burgerLight from 'assets/icons/burger--light.svg'

const Root = styled.button`
  display: none;

  padding: 0;
  margin: 0;
  border: none;
  background: transparent;

  img {
    width: 26px;
    height: 16px;
  }

  ${mobile} {
    display: block;
    margin-top: 10px;
  }
`

type Props = {
  mode: 'light' | 'dark'
  onClick (): void
}

export const Burger: React.FunctionComponent<Props> = ({
  mode,
  onClick
}) => {
  return (
    <Root
      type='button'
      onClick={onClick}
    >
      <img
        src={mode === 'dark' ? burgerDark : burgerLight}
        alt='menu'
      />
    </Root>
  )
}
