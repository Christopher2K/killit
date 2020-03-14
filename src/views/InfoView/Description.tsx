import styled from '@emotion/styled'

import * as Variables from 'styles/variable'
import { mobile } from 'styles/responsive'

type Props = {
  color?: string
}

export const Description = styled.div<Props>`
  margin-bottom: ${Variables.Spaces.large};

  p {
    font-size: 4rem;
    color: ${p => p.color || Variables.Colors.shuttleGray};
    margin-bottom: ${Variables.Spaces.medium};

    font-weight: 300;
    font-size 4rem;
    width: 100%;
    line-height: 1.2;

    ${mobile} {
      font-size: 1.8rem;
      margin-bottom: 3rem;
    }

    em {
      color: ${Variables.Colors.dodgerBlue};
      font-style: normal;
      font-size 2rem;
    }

    a {
      color: ${Variables.Colors.dodgerBlue};
      text-decoration: none;
    }
  }
`
