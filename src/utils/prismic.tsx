import * as React from 'react'
import { Option, none } from 'fp-ts/lib/Option'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'

export const APIContext = React.createContext<Option<ResolvedApi>>(none)

type ExpectedComponentProps = { maybePrismic: Option<ResolvedApi> }

export function withPrismicApi<T extends ExpectedComponentProps> (WrappedComponent: React.ComponentType<T>): React.ComponentType<T> {
  return function (props: T) {
    return (
      <APIContext.Consumer>
        {api => (
          <WrappedComponent {...props} maybePrismic={api} />
        )}
      </APIContext.Consumer>
    )
  }
}
