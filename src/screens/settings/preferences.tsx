import React from 'react'
import {KintoContext} from 'app'

export class Preferences extends React.Component<{server: string}> {
  static contextType = KintoContext

  onChange(event, controller) {
    const config = {server: event.target.value}
    controller.dispatch('action:configure', config)
  }

  render() {
    return (
      <KintoContext.Consumer>
        {({controller}) => {
          const server = controller && controller.config ? controller.config.server : ''
          return (
            <div className="preferences">
              <input id="toggle" type="checkbox"></input>
              <label htmlFor="toggle">Preferences</label>
              <form>
                <label>
                  Server
                  <input value={server} onChange={e => this.onChange(e, controller)} />
                </label>
              </form>
            </div>
          )
        }}
      </KintoContext.Consumer>
    )
  }
}

export default Preferences
