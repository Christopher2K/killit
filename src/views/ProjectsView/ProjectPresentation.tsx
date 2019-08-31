import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import withProps from 'recompose/withProps'
import { Link } from 'react-router-dom'
import { none, some, Option } from 'fp-ts/lib/Option'

import { Flex } from 'components'
import { titleFont, Colors, Spaces } from 'styles/variable'
import { mobile } from 'styles/responsive'
import { Project } from 'models'

import { ProjectInfo } from './ProjectInfo'

enum ImageKind {
  horizontal = 'horizontal',
  vertical = 'vertical'
}

const Root = styled(withProps({
  direction: 'column',
  justify: 'center',
  align: 'flex-end'
})(Flex))`
  position: relative;
  width: 65vw;
  height: 100%;
  flex-shrink: 0;
  margin-right: 10vw;

  ${mobile} {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: ${Spaces.small};
  }
`

const ProjectImage = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  max-width: 100%;
  max-height: 70%;
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

type ProjectTitleProps = {
  imageKind: ImageKind
}

const ProjectTitle = styled.h1<ProjectTitleProps>`
  position: absolute;
  max-width: 600px;
  font-family: ${titleFont}, sans-serif;
  font-size: 8rem;
  font-weight: bold;
  color: ${Colors.black};
  z-index: 5;

  ${props => props.imageKind === ImageKind.horizontal ? css`
    top: 0%;
    left: -20%;
  ` : css`
    top: 5%;
    left: 20%;
  `}

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
  const [mbImageKind, setImageKind] = React.useState<Option<ImageKind>>(none)

  function findOutImageKind (evt: React.SyntheticEvent<HTMLImageElement, Event>) {
    const element: HTMLImageElement = evt.target as HTMLImageElement
    const { width, height } = element.getBoundingClientRect()
    const imageKind = width >= height ? some(ImageKind.horizontal) : some(ImageKind.vertical)
    setImageKind(imageKind)
  }

  return (
    <Root>
      <ImageContainer to={`/projet/${project.uid}`}>
        <ProjectImage
          src={project.mainImage}
          onLoad={findOutImageKind}
        />
        {mbImageKind.map(
          imageKind => <ProjectTitle imageKind={imageKind}>{project.title}</ProjectTitle>
        ).toNullable()}
        <StyledProjectInfo project={project} />
      </ImageContainer>
    </Root>
  )
}
