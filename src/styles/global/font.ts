import { css } from '@emotion/core'

import favoritBoldWoff from 'assets/fonts/Favorit-Bold.woff'
import favoritBoldWoff2 from 'assets/fonts/Favorit-Bold.woff2'
import favoritRegularWoff from 'assets/fonts/Favorit-Regular.woff'
import favoritRegularWoff2 from 'assets/fonts/Favorit-Regular.woff2'
import favoritLightWoff from 'assets/fonts/Favorit-Light.woff'
import favoritLightWoff2 from 'assets/fonts/Favorit-Light.woff2'
import favoritExtendedLightWoff from 'assets/fonts/Favorit-ExtendedLight.woff'
import favoritExtendedLightWoff2 from 'assets/fonts/Favorit-ExtendedLight.woff2'
import favoritExtendedRegularWoff from 'assets/fonts/Favorit-ExtendedRegular.woff'
import favoritExtendedRegularWoff2 from 'assets/fonts/Favorit-ExtendedRegular.woff2'

export const font = css`
  @font-face {
    font-family: 'Favorit';
    src: url('${favoritBoldWoff}') format('woff2'),
         url('${favoritBoldWoff2}') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Favorit';
    src: url('${favoritRegularWoff}') format('woff2'),
         url('${favoritRegularWoff2}') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Favorit';
    src: url('${favoritLightWoff}') format('woff2'),
         url('${favoritLightWoff2}') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Favorit Extended';
    src: url('${favoritExtendedLightWoff}') format('woff2'),
         url('${favoritExtendedLightWoff2}') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Favorit Extended';
    src: url('${favoritExtendedRegularWoff}') format('woff2'),
         url('${favoritExtendedRegularWoff2}') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`
