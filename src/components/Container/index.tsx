import * as React from 'react'
import styled from '@emotion/styled'

import { mobile } from 'styles/responsive'

const Root = styled.div`
  max-width: 1440px;
  padding: 0 315px;
  width: 100%;
  height: 100%;

  ${mobile} {
    padding: 0 40px;
  }
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 40px;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  margin-top: 120px;

  ${mobile} {
    margin-top: 85px;
  }
`

type Props = {}

export const Container: React.FunctionComponent<Props> = ({ children }) => (
  <Root>
    <Wrapper>
      <Content>
        {children}
      </Content>
    </Wrapper>
  </Root>
)
