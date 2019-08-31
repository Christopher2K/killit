import styled from '@emotion/styled'

type FlexProperty = 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between'

type Props = {
  direction: 'row' | 'column'
  justify: FlexProperty
  align: FlexProperty
}

export const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
`
