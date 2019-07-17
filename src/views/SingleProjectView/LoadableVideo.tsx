import * as React from 'react'
import styled from '@emotion/styled'

import { Spaces } from 'styles/variable'

type Props = {
  videoUri: string
}

const Root = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  margin-bottom: ${Spaces.large};
`

const IframeComponent = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`

export const LoadableVideo: React.FunctionComponent<Props> = ({
  videoUri
}) => {
  return (
    <Root>
      <IframeComponent
        src={videoUri}
        frameBorder='0'
        allow='fullscreen'
        allowFullScreen
      >
      </IframeComponent>
    </Root>
  )
}
