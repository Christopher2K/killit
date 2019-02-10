import { css } from '@emotion/core'

import bluuNextBoldWoff2 from 'assets/fonts/bluunext-bold-webfont.woff2'
import bluuNextBoldWoff from 'assets/fonts/bluunext-bold-webfont.woff'
import bluuNextBoldTtf from 'assets/fonts/bluunext-bold.ttf'
import bluuNextBoldItalicWoff2 from 'assets/fonts/bluunext-bolditalic-webfont.woff2'
import bluuNextBoldItalicWoff from 'assets/fonts/bluunext-bolditalic-webfont.woff'
import bluuNextBoldItalicTtf from 'assets/fonts/bluunext-bolditalic.ttf'
import sourceSansProRegularTtf from 'assets/fonts/SourceSansPro-Regular.ttf'

export const font = css`
  @font-face {
    font-family: 'Bluu Next';
    src: url('${bluuNextBoldWoff2}') format('woff2'),
         url('${bluuNextBoldWoff}') format('woff'),
         url('${bluuNextBoldTtf}') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bluu Next';
    src: url('${bluuNextBoldItalicWoff2}') format('woff2'),
         url('${bluuNextBoldItalicWoff}') format('woff'),
         url('${bluuNextBoldItalicTtf}') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Source Sans Pro';
    src: url('${sourceSansProRegularTtf}') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`
