import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {getLoginStatus} from 'utils'

const Navbar = props => {
  const isLoggedIn = getLoginStatus()

  const onLogout = e => {
    e.preventDefault()

    localStorage.removeItem('username')
    localStorage.removeItem('userpass64')

    props.history.push('/login')
  }

  const onSync = () => {
    console.log('syncing....')
  }

  return (
    <nav className="bp3-navbar bp3-dark">
      <div>
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">ATAK</div>
          {isLoggedIn && (
            <>
              <span className="bp3-navbar-divider"></span>
              <button className="bp3-button bp3-minimal bp3-icon-refresh" onClick={onSync}>
                Sync
              </button>
            </>
          )}
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          {isLoggedIn && (
            <>
              <Link to="/" className="bp3-button bp3-minimal bp3-icon-home">
                Home
              </Link>
              <Link to="/create/" className="bp3-button bp3-minimal bp3-icon-document">
                Create
              </Link>
              <Link to="/settings/" className="bp3-button bp3-minimal bp3-icon-cog">
                Settings
              </Link>
              <span className="bp3-navbar-divider"></span>

              <button className="bp3-button bp3-minimal bp3-icon-log-out" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
