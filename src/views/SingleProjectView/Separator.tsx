import styled from '@emotion/styled'

import { Colors } from 'styles/variable'
import { hd, desktop } from 'styles/responsive'

export const Separator = styled.hr`
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${Colors.paleSky};
  border-top: 0;
  margin: 0;
`

export const MobileSeparator = styled(Separator)`
  ${desktop} {
    display: none;
  }
  ${hd} {
    display: none;
  }
`
