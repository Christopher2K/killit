import styled from '@emotion/styled'

type Props = {
  background?: string
}

export const PageContent = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  background-color: ${(props: Props) => props.background || 'transparent'};
`
