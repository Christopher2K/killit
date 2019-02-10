import styled from '@emotion/styled'

import * as Variables from 'styles/variable'
import { titleFontStyle } from 'styles/mixins'

export const Description = styled.div`
  p {
    ${titleFontStyle};
    font-size: 3.6rem;
    line-height: 1.3;
    color: ${Variables.Colors.shuttleGray};

    width: 100%;

    margin-bottom: 7.5rem;

    a {
      color: ${Variables.Colors.dodgerBlue};
      text-decoration: none;
    }
  }
`
