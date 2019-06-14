import App from 'app'
import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader' // eslint-disable-line import/no-extraneous-dependencies

import Auth from './auth'
import Store from './store'
import Controller from './controller'
import {EventEmitter} from 'events'

import './index.scss'

const events = new EventEmitter()
const auth = new Auth(events, window.location)
const store = new Store('notes', events)
const controller = new Controller({auth, store}, events)

const renderComponent = Component => {
  render(
    <AppContainer>
      <Component controller={controller} />
    </AppContainer>,
    document.getElementById('app')
  )
}

renderComponent(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  // only ever in dev
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    renderComponent(require('./app').default)
  })
}
