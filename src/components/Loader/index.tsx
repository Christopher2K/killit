import React from 'react'

type Props = {
  spinningTime: number
  infinite?: boolean
  onSpinningEnd: () => void
}

export const Loader: React.FC<Props> = () => {
  return (<div></div>)
}
