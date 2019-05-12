import React from 'react'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'

import { Flex } from 'components'
import { titleFont, Colors } from 'styles/variable'

const Root = styled(withProps({
  direction: 'column',
  justify: 'center',
  align: 'flex-end'
})(Flex))`
  position: relative;
  width: 70vw;
  height: 100%;
  flex-shrink: 0;
`

const ProjectImage = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;
  z-index: 10;

  transform: translateY(-50%);
  filter: blur(0);
  transition: 300ms filter ease, 300ms opacity ease;
`

const ProjectTitle = styled.h1`
  position: absolute;
  top: 60%;
  left: -20%;
  max-width: 100%;
  font-family: ${titleFont}, sans-serif;
  font-size: 8rem;
  font-weight: bold;
  color: ${Colors.tuna};
  opacity: 0.8;
  text-shadow: -1px 0 ${Colors.regentGray}, 0 1px ${Colors.regentGray}, 1px 0 ${Colors.regentGray}, 0 -1px ${Colors.regentGray};
  z-index: 5;
`

const ImageContainer = styled.div`
  position: relative;
  width: 75%;
  height: 95%;
  cursor: pointer;

  &:hover {
    ${ProjectTitle} {
      z-index: 15;
    }

    ${ProjectImage} {
      opacity: 0.2;
      filter: blur(4px);
    }
  }
`

type Props = {
  imgSrc: string
}

export const ProjectPresentation: React.FC<Props> = ({
  imgSrc
}) => {
  return (
    <Root>
      <ImageContainer>
        <ProjectImage src={imgSrc} />
        <ProjectTitle>
          Giga titre du projet
        </ProjectTitle>
      </ImageContainer>
    </Root>
  )
}
