import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import LoginPage from 'screens/login/login';
import HomePage from 'screens/home/home';


const Pages = {
  home: 'home',
  login: 'login',
};

export const App = () => {

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login/">Login</Link>
            </li>
            <li>
              <Link to="/home/">Home</Link>
            </li>
          </ul>
        </nav>

        <Route path="/login/" component={LoginPage} />
        <Route path="/home/" component={HomePage} />
        <Redirect to="/login/" />
      </div>
    </Router>
  );
};
// export const App = () => {
//   const [page] = useState('login');
//
//   switch (page) {
//     case Pages.login:
//       return <LoginPage />;
//     case Pages.home:
//       return <HomePage />;
//     default:
//       return <LoginPage />;
//   }
// };


export default App;
