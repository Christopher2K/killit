import * as React from 'react'
import styled from '@emotion/styled'

import { navbarTopGapMobile, Spaces } from 'styles/variable'
import { mobile } from 'styles/responsive'

const Root = styled.div`
  max-width: 1440px;
  padding: 0 315px;
  width: 100%;
  height: 100%;

  ${mobile} {
    padding: 0 ${Spaces.large};
  }
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding-bottom: ${Spaces.large};
`

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  margin-top: 120px;

  ${mobile} {
    margin-top: ${navbarTopGapMobile};
  }
`

type Props = {
  wrapperRef?: React.LegacyRef<HTMLDivElement>
}

export const Container: React.FunctionComponent<Props> = ({ children, wrapperRef }) => (
  <Root>
    <Wrapper ref={wrapperRef}>
      <Content>
        {children}
      </Content>
    </Wrapper>
  </Root>
)
