import * as React from 'react'
import styled from '@emotion/styled'

import { Flex, Loader } from 'components'
import { boolState } from 'sharedHooks/boolState'
import { Spaces, Colors } from 'styles/variable'

type Props = {
  imageUri: string
}

type ImageProps = {
  loaded: boolean
}

type RootProps = {
  fixedHeight: boolean
}
const Root = styled(Flex)<RootProps>`
  position: relative;
  margin-bottom: ${Spaces.large};
  width: 100%;
  height: ${props => props.fixedHeight ? '50px' : 'auto'};
  flex-shrink: 0;
  flex-grow: 0;
`

const LoaderRoot = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const ImageComponent = styled.img<ImageProps>`
  visibility: ${props => props.loaded ? 'visible' : 'hidden'};
  width: 100%;
  height: auto;
  transition: visibility 100ms;
`

export const LoadableImage: React.FunctionComponent<Props> = ({
  imageUri
}) => {
  const imageElement = React.useRef<HTMLImageElement>(null)
  const {
    bool: imageLoaded,
    setBool: setImageLoaded
  } = boolState(false)
  const {
    bool: error,
    setBool: setError
  } = boolState(false)

  React.useEffect(() => {
    setTimeout(() => {
      if (imageElement.current !== null) {
        imageElement.current.src = imageUri
      }
    }, 1000)
  }, [imageElement, imageUri])

  function onImageLoaded () {
    setImageLoaded(true)
  }

  function onImageError () {
    setError(true)
    setImageLoaded(true)
  }

  return (
    <Root
      direction='row'
      justify='center'
      align='center'
      fixedHeight={!imageLoaded && !error}
    >
      <ImageComponent
        ref={imageElement}
        loaded={imageLoaded && !error}
        onLoad={onImageLoaded}
        onError={onImageError}
      />
      {(!imageLoaded && !error) && (
        <LoaderRoot
          direction='row'
          justify='center'
          align='center'
        >
          <Loader run size={20} color={Colors.dodgerBlue} />
        </LoaderRoot>
      )}
    </Root>
  )
}
