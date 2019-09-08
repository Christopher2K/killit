import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'

import { Flex } from 'components'
import { mobile } from 'styles/responsive'
import { titleFont, Colors } from 'styles/variable'
import { boolState } from 'sharedHooks/boolState'
import { Project } from 'models'

import { LoadableImage } from './LoadableImage'

type Side = 'left' | 'right'

type RootProps = {
  side: Side
  showRoot: boolean
}
const Root = styled(Link)<RootProps>`
  position: fixed;
  top: 0;
  ${props => props.side}: 0;
  width: 200px;
  height: 100%;
  min-height: 600px;

  display: ${props => props.showRoot ? 'flex' : 'none'};
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

const ProjectTitle = styled.h3<ProjectTitleProps>`
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  align-self: center;
  font-family: ${titleFont}, sans-serif;
  white-space: nowrap;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${Colors.paleSky};
`

const ImagesContainer = styled(withProps({
  direction: 'column',
  justify: 'center',
  align: 'center'
})(Flex))`
  width: 80%;
  align-self: center;
  height: 100%;
`

type Props = {
  side: Side
  showRoot: boolean
  project: Project
}

export const SideProjectView: React.FunctionComponent<Props> = ({
  side,
  showRoot,
  project
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
      showRoot={showRoot}
      to={`/projet/${project.uid}`}
      onMouseEnter={showPictures}
      onMouseLeave={hidePictures}
    >
      {showPics ? (
        <ImagesContainer>
          {project.miniatures.map(uri =>
            <LoadableImage imageUri={uri} key={uri} />
          )}
        </ImagesContainer>
      ) : (
        <ProjectTitle side={side}>{project.title}</ProjectTitle>
      )}
    </Root>
  )
}
