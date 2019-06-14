import React from 'react'
import {Link} from 'react-router-dom'
import {getLoginStatus} from 'utils'

const Navbar = props => {
  const isLoggedIn = getLoginStatus()

  return (
    <nav className="bp3-navbar bp3-dark">
      <div style={{margin: '0 auto;', width: '480px;'}}>
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">ATAK</div>
        </div>
        <div className="bp3-navbar-group bp3-align-right">
          <Link to="/home/" className="bp3-button bp3-minimal bp3-icon-home">
            Home
          </Link>
          <Link to="/create/" className="bp3-button bp3-minimal bp3-icon-document">
            Create
          </Link>
          {!isLoggedIn && (
            <Link to="/login/" className="bp3-button bp3-minimal bp3-icon-document">
              Login
            </Link>
          )}
          {isLoggedIn && <Link className="bp3-button bp3-minimal bp3-icon-document">Logout</Link>}

          <span className="bp3-navbar-divider"></span>
          <button className="bp3-button bp3-minimal bp3-icon-user"></button>
          <button className="bp3-button bp3-minimal bp3-icon-notifications"></button>
          <button className="bp3-button bp3-minimal bp3-icon-cog"></button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
