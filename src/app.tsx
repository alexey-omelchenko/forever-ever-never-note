// @tslint-disabled
import React from 'react'

// if you are integrating redux this is a good place to wrap your app in <Provider store={store}>
// if you are using react-router this is a good place to set up your router
// this setup needs to be done in a separate file from index.jsx to enable hot reloads

interface IProps {
  controller: any
}

interface IState {
  busy: boolean
  error: string
  items: any[]
  server: string
}

export const KintoContext = React.createContext({controller: null})

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
      <KintoContext.Provider value={{controller: this.props.controller}}>
        <div className={disabled}>
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
