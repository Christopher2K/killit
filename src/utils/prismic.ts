import * as React from 'react'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'

export const APIContext = React.createContext<ResolvedApi | null>(null)
