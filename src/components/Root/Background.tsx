import styled from '@emotion/styled'

type Props = {
  backgroundColor: string
}

export const Background = styled.div<Props>`
  background-color: ${props => props.backgroundColor};

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
