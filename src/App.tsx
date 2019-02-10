import * as React from 'react'
import { Global } from '@emotion/core'
import { BrowserRouter, Switch } from 'react-router-dom'

import { global } from 'styles/global'
import { Navbar } from 'components'

export type Props = {}

export type State = {}

export class App extends React.Component<Props, State> {
  public state: State = {}

  public render (): React.ReactNode {
    return (
      <>
        <Global styles={global} />
        <BrowserRouter>
          <Switch>
            <Navbar />

          </Switch>
        </BrowserRouter>
      </>
    )
  }
}
