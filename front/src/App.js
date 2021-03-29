import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'

import Login from './components/login/Login';
import Home from './components/home/Home';
import MembersList from './components/member/members-list';
import MemberCreation from './components/member/member-creation';
import GamesList from './components/game/games-list';
import GameCreation from './components/game/game-creation';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'


class App extends React.Component {

  render () {
    return (
      <Router>
        <div className= 'App'>
          <div className= 'main-display'>
            <div className='tab-inner'>
              <AnimatePresence>
                <Switch>
                  <Route exact path= '/' component= { Login } />
                  <Route path= '/login' component= { Login } />
                  <Route path= '/home' component= { Home } />
                  <Route path= '/addMember' component= { MemberCreation } />
                  <Route path= '/membersList' component= { MembersList } />
                  <Route path= '/addGame' component= { GameCreation } />
                  <Route path= '/gamesList' component= { GamesList } />
                </Switch>
              </AnimatePresence>
            </div>
            <div className='tab-inner'>
              <Link className='nav-link' to={'/home'}>Retour à l'accueil</Link>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
