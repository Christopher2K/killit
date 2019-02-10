import * as React from 'react'

import { Root } from './Root'
import { Brand } from './Brand'
import { Items } from './Items'

export type Props = {}

export const Navbar: React.FunctionComponent<Props> = () => {
  return (
    <Root>
      <Brand
        firstRow='Eunice'
        lastRow='Tchitchiama'
      />
      <Items />
    </Root>
  )
}
