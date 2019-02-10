import * as React from 'react'
import { Global } from '@emotion/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Prismic from 'prismic-javascript'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'

import { PRISMIC_ENDPOINT } from 'settings'
import { APIContext } from 'utils/prismic'
import { global } from 'styles/global'
import { Navbar, PageContent, Root } from 'components'
import * as Views from 'views'

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
              <Root>
                <Navbar />
                <Route path='/a-propos' component={Views.InfoView} />
              </Root>
            </APIContext.Provider>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}
