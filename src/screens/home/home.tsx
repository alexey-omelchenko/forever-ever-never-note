import React from 'react'
import {KintoContext} from 'app'
import {Route, Link} from 'react-router-dom'
import EditNodePage from 'screens/note/edit'
import './home.scss'

const HomePage = () => {
  return (
    <KintoContext.Consumer>
      {({items}) => (
        <div className="home-page">
          <div className="left-side">
            <h1>My notes</h1>
            <ul>
              {items.map((item, idx) => (
                <li key={idx}>
                  <Link to={`/note/edit/${item.id}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="right-side">
            <Route
              path="/note/edit/:id"
              component={({match}) => {
                const note = items.find(item => item.id === match.params.id)
                return <EditNodePage defaultMode="write" note={note} />
              }}
            />
          </div>
        </div>
      )}
    </KintoContext.Consumer>
  )
}

export default HomePage
