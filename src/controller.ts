// const DEFAULT_SERVER = 'https://kinto.dev.mozaws.net/v1'
const DEFAULT_SERVER = 'http://3.104.64.219:8888/v1/'

export default class Controller {
  private store
  private auth
  private config
  private events

  constructor(components, events) {
    this.store = components.store
    this.auth = components.auth
    this.events = events

    this.events.on('auth:login', this.onLogin.bind(this))
    this.events.on('action:start', this.onStart.bind(this))
    this.events.on('action:configure', this.onConfigure.bind(this))
  }

  on(events, callback) {
    const names = events.split(/\s*,\s*/)
    names.forEach(event => this.events.on(event, callback))
  }

  dispatch(name, data) {
    this.events.emit(name, data)
  }

  onStart() {
    // Start application with default config.
    const previous = window.localStorage.getItem('config')
    const config = previous ? JSON.parse(previous) : {server: DEFAULT_SERVER}
    this.dispatch('action:configure', config)

    const username = localStorage.getItem('username')
    const userpass64 = localStorage.getItem('userpass64')

    if (username && userpass64) {
      this.onLogin({
        user: username,
        password: userpass64,
        headers: {Authorization: 'Basic ' + userpass64},
      })
    }
  }

  onConfigure(config) {
    // Save config for next sessions.
    window.localStorage.setItem('config', JSON.stringify(config))
    this.events.emit('config:change', config)
    this.config = config

    // this.auth.configure(config)
    // this.auth.authenticate()
  }

  onLogin(info: {user: string; password: string; headers: {Authorization: string}}) {
    if (!this.config) {
      throw new Error('Config has not been loaded yet!')
    }

    this.store.configure({
      ...info,
      server: this.config.server,
    })

    this.store.load()
  }
}
