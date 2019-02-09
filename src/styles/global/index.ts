import { css } from '@emotion/core'

import { reset } from './reset'
import { base } from './base'
import { font } from './font'

export const global = css`
  ${reset}
  ${font}
  ${base}
`
