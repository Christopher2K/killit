import styled from '@emotion/styled'
import { mobile } from 'styles/responsive'
// import * as Variables from 'styles/variable'

export type Props = {
  currentPath: string
}

export const Root = styled.nav`
  position: fixed;
  left: 0;
  right: 0;

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

  ${mobile} {
    padding: 15px 25px;
    z-index: 1000;
  }
`
