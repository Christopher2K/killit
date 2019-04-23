import * as React from 'react'
import styled from '@emotion/styled'

import { Flex } from 'components'
import { boolState } from 'sharedHooks/boolState'

type Props = {
  imageUri: string
}

type ImageProps = {
  loaded: boolean
}

const ImageComponent = styled.img`
  visibility: ${(props: ImageProps) => props.loaded ? 'visible' : 'hidden'};
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
    <Flex
      direction='row'
      justify='center'
      align='center'
    >
      <ImageComponent
        ref={imageElement}
        loaded={imageLoaded && !error}
        onLoad={onImageLoaded}
        onError={onImageError}
      />
      {(imageLoaded && error) && <div>Error</div>}
      {(!imageLoaded && !error) && <div>Loading....</div>}
    </Flex>
  )
}
