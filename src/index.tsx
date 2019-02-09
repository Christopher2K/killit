import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { HelloWorld } from './HelloWorld'

ReactDOM.render(
  <HelloWorld />,
  document.querySelector('#main')
)

if (module.hot) {
  module.hot.accept()
}
