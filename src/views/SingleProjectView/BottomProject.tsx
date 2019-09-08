import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import chevronLeft from 'assets/icons/chevron-left.svg'
import chevronRight from 'assets/icons/chevron-right.svg'
import { Spaces } from 'styles/variable'
import { Project } from 'models'

type Side = 'left' | 'right'

const Root = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
`

const DirectionIcon = styled.img`
  width: 10px;
  height: auto;
  flex-shrink: 0;
`

const ProjectImage = styled.img`
  padding: 0 ${Spaces.medium};
  width: calc(100% - 10px);
  height: auto;
`

type Props = {
  side: Side
  project: Project
}

export const BottomProject: React.FC<Props> = ({
  side,
  project
}) => {
  return (
    <Root to={`/projet/${project.uid}`}>
      {side === 'left' && <DirectionIcon src={chevronLeft} />}
      <ProjectImage
        src={project.miniatures[0]}
      />
      {side === 'right' && <DirectionIcon src={chevronRight} />}
    </Root>
  )
}
