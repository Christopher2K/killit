import styled from '@emotion/styled'

type Props = {
  width?: number
  height?: number
}

export const Spacer = styled.div<Props>`
  display: block;
  width: ${p => p.width || 0}px;
  height: ${p => p.height || 0}px;
`
