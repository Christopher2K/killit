import * as React from 'react'
import styled from '@emotion/styled'

const Root = styled.div`
  max-width: 1440px;
  padding: 0 315px;
  width: 100%;
  height: 100%;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  margin-top: 120px;
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
