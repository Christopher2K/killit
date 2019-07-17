import React from 'react'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'
import { Link } from 'react-router-dom'

import { Flex } from 'components'
import { titleFont, Colors, Spaces } from 'styles/variable'
import { mobile } from 'styles/responsive'
import { Project } from 'models'

import { ProjectInfo } from './ProjectInfo'

const Root = styled(withProps({
  direction: 'column',
  justify: 'center',
  align: 'flex-end'
})(Flex))`
  position: relative;
  width: 70vw;
  height: 100%;
  flex-shrink: 0;

  ${mobile} {
    width: 100%;
    height: auto;
    margin-bottom: ${Spaces.small};
  }
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

  ${mobile} {
    position: relative;
    top: initial;
    right: initial;
    transform: none;
  }
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

  ${mobile} {
    position: relative;
    top: 0;
    left: 0;
    font-size: 1.4rem;
    text-shadow: none;
    color: ${Colors.linkWater};
    margin-top: 5px;
  }
`

const StyledProjectInfo = styled(ProjectInfo)`
  position: absolute;
  bottom: 0;
  left: -20%;
  visibility: hidden;
  opacity: 0;
  transition: 0ms visibility 300ms ease;

  ${mobile} {
    position: relative;
    bottom: initial;
    left: initial;
    visibility: visible;
    opacity: 1;
  }
`

const ImageContainer = styled(Link)`
  display: block;
  position: relative;
  width: 75%;
  height: 95%;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    ${StyledProjectInfo} {
      opacity: 1;
      visibility: visible;
      transition: 300ms opacity ease;
    }

    ${ProjectTitle} {
      z-index: 15;
    }

    ${ProjectImage} {
      opacity: 0.2;
      filter: blur(4px);
    }
  }

  ${mobile} {
    position: relative;
    height: auto;
    width: 100%;
    height: auto;

    &:hover {
      ${StyledProjectInfo} {
        opacity: initial;
        transition: initial;
      }

      ${ProjectTitle} {
        z-index: initial;
      }

      ${ProjectImage} {
        opacity: initial;
        filter: initial;
      }
    }
  }
`

type Props = {
  project: Project
}

export const ProjectPresentation: React.FC<Props> = ({
  project
}) => {
  return (
    <Root>
      <ImageContainer to={`/projet/${project.uid}`}>
        <ProjectImage src={project.mainImage} />
        <ProjectTitle>
          {project.title}
        </ProjectTitle>
        <StyledProjectInfo project={project} />
      </ImageContainer>
    </Root>
  )
}
