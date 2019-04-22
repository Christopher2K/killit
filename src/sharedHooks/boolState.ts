import { useState } from 'react'

export type BoolState = boolean

export function boolState (initialState: BoolState = false) {
  const [bool, setBool] = useState(initialState)
  return { bool, setBool }
}
