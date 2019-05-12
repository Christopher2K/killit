import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'

import { Flex } from 'components'
import { mobile } from 'styles/responsive'
import { titleFont, Colors } from 'styles/variable'
import { boolState } from 'sharedHooks/boolState'

import { LoadableImage } from './LoadableImage'

type Side = 'left' | 'right'

type RootProps = {
  side: Side
}
const Root = styled(Link)`
  position: fixed;
  top: 0;
  ${(props: RootProps) => props.side}: 0;
  width: 200px;
  height: 100%;
  min-height: 600px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  text-decoration: none;
  color: ${Colors.paleSky};

  @media screen and (min-width: 1440px) {
    ${(props: RootProps) => props.side}: calc((100% - 1440px) / 2);
  }

  ${mobile} {
    display: none;
  }
`

type ProjectTitleProps = {
  side: Side
}
const ProjectTitle = styled.h3`
  transform: rotate(${(props: ProjectTitleProps) => props.side === 'left' ? '-90deg' : '270deg'});
  align-self: ${(props: RootProps) => props.side === 'left' ? 'flex-start' : 'flex-end'};
  font-family: ${titleFont}, sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${Colors.paleSky};
`

const ImagesContainer = styled(withProps({
  direction: 'column',
  justify: 'flex-start',
  align: 'flex-start'
})(Flex))`
  width: 80%;
  align-self: center;
`

type Props = {
  side: Side
}

export const SideProjectView: React.FunctionComponent<Props> = ({
  side
}) => {
  const {
    bool: showPics,
    setBool: setShowPics
  } = boolState(false)

  function showPictures () {
    setShowPics(true)
  }

  function hidePictures () {
    setShowPics(false)
  }

  return (
    <Root
      side={side}
      to='/projet/test'
      onMouseEnter={showPictures}
      onMouseLeave={hidePictures}
    >
      {showPics ? (
        <ImagesContainer>
          <LoadableImage imageUri='https://www.tourisme.fr/images/otf_offices/792/pont-vieux-d-viet.jpg' />
          <LoadableImage imageUri='https://www.tourisme.fr/images/otf_offices/792/pont-vieux-d-viet.jpg' />
          <LoadableImage imageUri='https://www.tourisme.fr/images/otf_offices/792/pont-vieux-d-viet.jpg' />
        </ImagesContainer>
      ) : (
        <ProjectTitle side={side}>Titre du projet</ProjectTitle>
      )}
    </Root>
  )
}
