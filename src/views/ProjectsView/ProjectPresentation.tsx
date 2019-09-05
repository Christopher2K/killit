import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import withProps from 'recompose/withProps'
import { Link } from 'react-router-dom'
import { none, some, Option } from 'fp-ts/lib/Option'

import { Flex } from 'components'
import { titleFont, Colors, Spaces } from 'styles/variable'
import { mobile } from 'styles/responsive'
import { Project, MainImageAlignment } from 'models'

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
  width: auto;
  height: 100%;
  flex-shrink: 0;
  margin-right: 20vw;

  ${mobile} {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: ${Spaces.small};
  }
`

type ProjectImageProps = {
  mbImageKind: Option<ImageKind>
}

const ProjectImage = styled.img<ProjectImageProps>`
  position: relative;
  height: 100%;
  width: auto;
  right: 0;
  z-index: 10;

  visibility: ${props => props.mbImageKind.isSome() ? 'visible' : 'hidden'};
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
  top: 50%;
  left: 50%;
  width: 95%;
  transform: translate(-50%, -50%);
  font-family: ${titleFont}, sans-serif;
  text-align: center;
  font-size: 6rem;
  font-weight: bold;
  color: ${Colors.linkWater};
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
  display: flex;
  flex-direction: row;
  position: relative;
  height: 80%;
  cursor: pointer;
  text-decoration: none;

  ${ProjectTitle} {
    visibility: hidden;
  }

  &:hover {
    ${StyledProjectInfo} {
      opacity: 1;
      visibility: visible;
      transition: 300ms opacity ease;
    }

    ${ProjectTitle} {
      visibility: visible;
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

    ${ProjectTitle} {
      visibility: visible;
    }

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

type OverlayProps = {
  alignment: MainImageAlignment
  mbImageKind: Option<ImageKind>
}
const Overlay = styled.div<OverlayProps>`
  position: relative;
  background-color: transparent;
  height: 100%;
  ${props => props.mbImageKind.map(
    imageKind => imageKind === 'horizontal' ? css`
      max-height: 80%;
    ` : css`
      max-height: 100%;
    `
  ).getOrElse(css``)}
  ${props => {
    switch (props.alignment) {
      case 'top':
        return css`
          align-self: flex-start;
        `
      case 'bottom':
        return css`
          align-self: flex-end;
        `
      default:
        return css`
          align-self: center;
        `
    }
  }}
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
        <Overlay alignment={project.mainImage.alignment} mbImageKind={mbImageKind}>
          <ProjectImage
            src={project.mainImage.url}
            onLoad={findOutImageKind}
            mbImageKind={mbImageKind}
          />
          {mbImageKind.map(imageKind =>
            <ProjectTitle imageKind={imageKind}>{project.title}</ProjectTitle>
          ).toNullable()}
        </Overlay>
        <StyledProjectInfo project={project} />
      </ImageContainer>
    </Root>
  )
}
