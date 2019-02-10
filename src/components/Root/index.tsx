import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

import { Background } from './Background'
import * as Variables from 'styles/variable'

type Props = RouteComponentProps & {}

const RootComponent: React.FunctionComponent<Props> = ({ children, location }) => (
  <Background backgroundColor={getColor(location.pathname)}>
    {children}
  </Background>
)

function getColor (routePath: string): string {
  switch (routePath) {
    case '/': return Variables.Colors.tuna
    default: return Variables.Colors.catskillWhite
  }
}

export const Root = withRouter(RootComponent)
