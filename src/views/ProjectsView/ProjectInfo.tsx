import React from 'react'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'
import { withRouter, RouteComponentProps } from 'react-router'

import separator from 'assets/icons/separator.svg'
import { titleFont, specialFont, Spaces, Colors } from 'styles/variable'
import { mobile } from 'styles/responsive'
import { Flex, Loader } from 'components'
import { Project } from 'models'

const StyledLoader = styled(Loader)``

const Root = styled(Flex)`
  ${mobile} {
    margin-top: 5px;

    ${StyledLoader} {
      display: none;
    }
  }
`

const Order = styled.h1`
  font-family: ${specialFont}, sans-serif;
  font-size: 4.8rem;
  font-weight: 300;
  color: ${Colors.linkWater};

  ${mobile} {
    display: none;
  }
`

const Separator = styled.img`
  margin: 0 ${Spaces.tiny};

  ${mobile} {
    display: none;
  }
`

const InformationContainer = styled(withProps({
  direction: 'column',
  justify: 'flex-start',
  align: 'flex-start'
})(Flex))`
  margin-left: ${Spaces.tiny};

  ${mobile} {
    margin: 5px 0 0 0;
  }
`

const Information = styled.p`
  font-family: ${titleFont};
  font-size: 1.4rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${Colors.linkWater};

  &:first-of-type {
    margin-bottom: 0.4rem;
  }

  ${mobile} {
    color: ${Colors.regentGray};
    letter-spacing: 2px;
    font-size: 1rem;
  }
`

type Props = RouteComponentProps & {
  className?: string
  project: Project
  showed: boolean
}

const ProjectInfoComponent: React.FC<Props> = props => {
  const {
    className,
    project,
    showed,
    history
  } = props

  function goToProject () {
    history.push(`/projet/${project.uid}`)
  }

  return (
    <Root
      className={className}
      direction='row'
      justify='flex-start'
      align='center'
    >
      <StyledLoader
        spinningTime={7}
        size={33}
        color={Colors.dodgerBlue}
        run={showed}
        onSpinningEnd={goToProject}
      />
      <Separator src={separator} />
      <Order>{project.order < 9 ? `0${project.order}` : project.order }</Order>
      <InformationContainer>
        <Information>{project.type}</Information>
        <Information>{project.year}</Information>
      </InformationContainer>
    </Root>
  )
}

export const ProjectInfo = withRouter(ProjectInfoComponent)
