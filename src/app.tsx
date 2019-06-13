import React from 'react'
import {HashRouter as Router, Route, Link, Redirect} from 'react-router-dom'

import LoginPage from 'screens/login/login'
import HomePage from 'screens/home/home'

interface IProps {
  controller: any
}

interface IState {
  busy: boolean
  error: string
  items: any[]
  server: string
}

export const KintoContext = React.createContext({controller: null, store: null})

export default class App extends React.Component<IProps, IState> {
  state = {
    busy: false,
    error: '',
    items: [],
    server: '',
  }

  componentDidMount() {
    this.props.controller.on('store:busy', state => {
      this.setState({busy: state, error: ''})
    })
    this.props.controller.on('store:change', state => {
      this.setState({items: state.items})
    })
    this.props.controller.on('store:error', error => {
      this.setState({error: error.message})
    })
    this.props.controller.on('config:change', config => {
      this.setState({server: config.server})
    })

    // Start the application!
    this.props.controller.dispatch('action:start')
  }

  onSyncClick = () => {
    this.props.controller.dispatch('action:sync')
  }

  render() {
    const disabled = this.state.busy ? 'disabled' : ''
    return (
      <KintoContext.Provider
        value={{
          controller: this.props.controller,
          store: this.props.controller.store,
        }}
      >
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/login/">Login</Link>
                </li>
                <li>
                  <Link to="/home/">Home</Link>
                </li>
              </ul>
            </nav>

            <Route path="/login/" component={LoginPage} />
            <Route path="/home/" component={HomePage} />
            <Redirect to="/login/" />
          </div>
        </Router>
        <div
          className={disabled}
          style={{border: '1px solid black', padding: '10px', margin: '0 10px'}}
        >
          <div className="error">{this.state.error}</div>
          <button onClick={this.onSyncClick.bind(this)} disabled={!!disabled}>
            Sync!
          </button>
          <Preferences server={this.state.server} />
        </div>
      </KintoContext.Provider>
    )
  }
}

export class Preferences extends React.Component<{server: string}> {
  static contextType = KintoContext

  onChange = event => {
    const config = {server: event.target.value}
    this.context.controller.dispatch('action:configure', config)
  }

  render() {
    return (
      <div className="preferences">
        <input id="toggle" type="checkbox"></input>
        <label htmlFor="toggle">Preferences</label>
        <form>
          <label>
            Server
            <input value={this.props.server} onChange={this.onChange} />
          </label>
        </form>
      </div>
    )
  }
}
