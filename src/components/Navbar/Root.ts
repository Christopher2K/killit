import styled from '@emotion/styled'

// import * as Variables from 'styles/variable'

export type Props = {
  currentPath: string
}

export const Root = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  /* Desktop style */
  width: 100%;
  max-width: 1440px;
  margin: auto;

  flex-shrink: 0;

  background-color: transparent;
  padding: 15px 50px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  /* TODO: Mobile style */
  ${(_: Props) => ''}
`

// function getBackgroundColor (path: string): string {
//   switch (path) {
//     case '/': return Variables.Colors.dodgerBlue
//     default: return Variables.Colors.linkWater
//   }
// }
