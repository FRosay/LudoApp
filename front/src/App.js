import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from './components/login/Login';
import Home from './Home';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }  

  render () {
    return (
      <Router>
        <div className= 'App'>
          <Switch>
            <Route exact path= '/' component= { Login } />
            <Route path= '/login' component= { Login } />
            <Route path= '/home' component= { Home } />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
