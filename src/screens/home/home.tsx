import React from 'react'
import {KintoContext} from 'app'
import {Route, Link} from 'react-router-dom'
import EditNodePage from 'screens/note/edit'

const HomePage = () => {
  return (
    <KintoContext.Consumer>
      {({items}) => (
        <div>
          <h1>My notes</h1>
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>
                <Link to={`/note/edit/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <hr />

          <Route
            path="/note/edit/:id"
            component={({match}) => {
              const note = items.find(item => item.id === match.params.id)
              return <EditNodePage defaultMode="write" note={note} />
            }}
          />
        </div>
      )}
    </KintoContext.Consumer>
  )
}

export default HomePage
