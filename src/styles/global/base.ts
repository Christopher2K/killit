import { css } from '@emotion/core'

export const base = css`
  html {
    font-size: 62.5%;
    width: 100%;
    min-height: 100%;
    height: 100%;
  }

  body,
  main {
    font-size: 1.5rem;
    width: 100%;
    height: 100%;
  }

  html,
  body {
    overflow: hidden;
  }

  * {
    font-family: 'Source Sans Pro';
    box-sizing: border-box;
    scrollbar-width: none;
  }

  ::-webkit-scrollbar {
    display: none;
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
  }
  /* optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
    background: #FF0000;
  }
`
