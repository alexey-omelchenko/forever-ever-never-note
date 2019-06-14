import React, {useEffect} from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'

const PrivateRoute = ({component: Component, history, otherProps}) => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('userpass64')

  const isLoggedIn = !!username && !!password

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/login')
    }
  })
  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }
  if (isLoggedIn) {
    return <Route {...otherProps} render={props => <Component {...props} />} />
  }
}

export default withRouter(PrivateRoute)
