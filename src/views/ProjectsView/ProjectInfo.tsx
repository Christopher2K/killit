import React from 'react'
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'
import { withRouter, RouteComponentProps } from 'react-router'

import separator from 'assets/icons/separator.svg'
import { titleFont, Spaces, Colors } from 'styles/variable'
import { mobile } from 'styles/responsive'
import { Flex, Loader } from 'components'
import { Project } from 'models'

const Root = styled(Flex)`
  ${mobile} {
    margin-top: 5px;
  }
`

const Order = styled.h1`
  font-family: ${titleFont}, sans-serif;
  line-height: 0.5;
  font-size: 5.1rem;
  font-style: italic;
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
`

const Information = styled.p`
  font-family: ${titleFont};
  font-size: 1.4rem;
  letter-spacing: 4px;
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
      <Loader
        spinningTime={10}
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
