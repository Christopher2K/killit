import * as React from 'react'
import { Global } from '@emotion/core'
import { BrowserRouter, Switch } from 'react-router-dom'
import Prismic from 'prismic-javascript'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'

import { PRISMIC_ENDPOINT } from 'settings'
import { APIContext } from 'utils/prismic'
import { global } from 'styles/global'
import { Navbar } from 'components'

export type Props = {}

export type State = {
  prismicApi: ResolvedApi | null
}

export class App extends React.Component<Props, State> {
  public state: State = {
    prismicApi: null
  }

  public componentDidMount () {
    Prismic.api(PRISMIC_ENDPOINT)
      .then(prismicApi => this.setState({ prismicApi }))
      .catch(console.error) // TODO: Chris handle error here
  }

  public render (): React.ReactNode {
    return (
      <>
        <Global styles={global} />
        <BrowserRouter>
          <Switch>
            <APIContext.Provider value={this.state.prismicApi}>
              <Navbar />
            </APIContext.Provider>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}
