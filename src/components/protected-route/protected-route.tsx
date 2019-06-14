import React, {useEffect} from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'
import {getLoginStatus} from 'utils'

const PrivateRoute = ({component: Component, history, otherProps}) => {
  const isLoggedIn = getLoginStatus()

  useEffect(() => {
    if (!getLoginStatus()) {
      history.push('/login')
    }

    return () => {}
  })

  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }
  if (isLoggedIn) {
    return <Route {...otherProps} render={props => <Component {...props} />} />
  }
}

export default withRouter(PrivateRoute)
