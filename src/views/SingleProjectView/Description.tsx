import * as React from 'react'
import { withProps } from 'recompose'
import styled from '@emotion/styled'

import { Flex } from 'components'
import * as Variables from 'styles/variable'
import { mobile } from 'styles/responsive'

type RootProps = {
  open: boolean
}
const Root = styled(
  withProps({
    direction: 'row',
    justify: 'flex-start',
    align: 'flex-start'
  })(Flex)
)`
  width: 100%;
  margin-bottom: ${Variables.Spaces.medium};

  ${mobile} {
    display: ${(props: RootProps) => props.open ? 'flex' : 'none'};
    flex-direction: column;
  }
`

const Paragraph = styled.p`
  font-family: ${Variables.bodyFont};
  font-size: 1.5rem;
  flex: 1;
  color: ${Variables.Colors.shuttleGray};
  line-height: 150%;


  ${mobile} {
    font-size: 1.45rem;
  }

  &:first-of-type {
    margin-right: ${Variables.Spaces.medium};
    ${mobile} {
      margin-right: 0;
      margin-bottom: ${Variables.Spaces.medium};
    }
  }

  &:last-of-type {
    margin-left: ${Variables.Spaces.medium};
    ${mobile} {
      margin-left: 0;
    }
  }
`

type Props = {
  open: boolean
}

export const Description: React.FunctionComponent<Props> = ({
  open
}) => (
  <Root open={open}>
    <Paragraph>
      Réalisation de l’identité visuelle des rencontres internationales de Cerfs-volants de Berck-sur-mer.
      Elle s’appuie sur des expérimentations graphiques autour de la notion du souffle et du vent avec le
      logiciel processing. Le sketch récupère des données météorologiques en temps réel, concernant
      le vent et la température d’une ville. Une fois les données récupérées, l’animation se déclenche
      les serpentins se mettent en mouvement à la manière des manches à air.
    </Paragraph>
    <Paragraph>
      Realization of the visual identity of international meetings of Kites of Berck-sur-mer.
      It is based on graphic experiments around the notion of breath and the treatment with the software.
      The skit recovers the data on real time, on the time. Once the data was recovered, the animation was
      triggered, the streamers turned into sleeve movements.
    </Paragraph>
  </Root>
)
