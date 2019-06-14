import React from 'react'
import {KintoContext} from 'app'

const HomePage = () => {
  return (
    <KintoContext.Consumer>
      {({items}) => (
        <div>
          <h1>My notes</h1>
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </KintoContext.Consumer>
  )
}

export default HomePage
