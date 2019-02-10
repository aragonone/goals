import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './comp/App'

const FOUNDERS = process.env.FOUNDERS

ReactDOM.render(
  <App founders={FOUNDERS && FOUNDERS.split(',')} />,
  document.getElementById('app')
)
