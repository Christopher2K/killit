import * as React from 'react'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'

export const APIContext = React.createContext<ResolvedApi | null>(null)

export function withPrismicApi<T extends { prismicApi: ResolvedApi | null }> (WrappedComponent: React.ComponentType<any>): React.ComponentType<T> {
  return function (props: T) {
    return (
      <APIContext.Consumer>
        {api => (
          <WrappedComponent {...props} prismicApi={api} />
        )}
      </APIContext.Consumer>
    )
  }
}
