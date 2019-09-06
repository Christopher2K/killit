import React from 'react'
import styled from '@emotion/styled'
import { css, ClassNames, Interpolation } from '@emotion/core'
import withProps from 'recompose/withProps'
import { Link } from 'react-router-dom'
import { fromNullable } from 'fp-ts/lib/Option'

import { Flex } from 'components'
import { titleFont, Colors, Spaces } from 'styles/variable'
import { mobile } from 'styles/responsive'
import { Project, MainImageAlignment } from 'models'

import { ProjectInfo } from './ProjectInfo'

enum ImageKind {
  horizontal = 'horizontal',
  vertical = 'vertical'
}

type ComputedDimensions = {
  width: number
  height: number
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
  imageKind: ImageKind
}
const ProjectImage = styled.img<ProjectImageProps>`
  position: relative;
  height: 100%;
  width: 100%;
  right: 0;
  z-index: 10;
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

const getLinkClassName: (cssTool: (template: TemplateStringsArray, ...args: Array<Interpolation>) => string) => string = (cssTool) => cssTool`
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
  dimensions: ComputedDimensions
}
const Overlay = styled.div<OverlayProps>`
  position: relative;
  background-color: transparent;
  ${props => css`
    width: ${props.dimensions.width}px;
    height: ${props.dimensions.height}px;
  `}
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
  const { url, dimensions, alignment } = project.mainImage
  const imageKind = dimensions.width >= dimensions.height ? ImageKind.horizontal : ImageKind.vertical

  const [computedDimensions, setComputedDimensions] = React.useState<ComputedDimensions>({ width: 0, height: 0 })

  const _imageContainerEl = React.useRef(null)

  function updateDimensions () {
    const mbImageContainerEl = fromNullable(_imageContainerEl.current)
    mbImageContainerEl.map(imageContainerEl => {
      console.warn(imageContainerEl)
      const { height: imgContainerHeight } = (imageContainerEl as HTMLImageElement).getBoundingClientRect()
      const { width, height } = dimensions

      if (width >= height) {
        const maxContentHeight = (0.8) * imgContainerHeight
        const newWidth = (maxContentHeight / height) * width
        setComputedDimensions({ width: newWidth, height: maxContentHeight })
      } else {
        const newWidth = (imgContainerHeight / height) * width
        setComputedDimensions({ width: newWidth, height: imgContainerHeight })
      }
    })
  }

  window.addEventListener('resize', updateDimensions)

  React.useEffect(() => {
    updateDimensions()
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  return (
    <Root>
      <ClassNames>
        {({ css }) => (
          <Link
            className={getLinkClassName(css)}
            innerRef={_imageContainerEl}
            to={`/projet/${project.uid}`}
          >
            <Overlay
              alignment={alignment}
              dimensions={computedDimensions}
            >
              <ProjectImage
                src={url}
                imageKind={imageKind}
              />
              <ProjectTitle imageKind={imageKind}>{project.title}</ProjectTitle>
            </Overlay>
            <StyledProjectInfo project={project} />
          </Link>
        )}
      </ClassNames>
    </Root>
  )
}
