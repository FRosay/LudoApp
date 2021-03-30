import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'

import Login from './components/login/Login';
import Home from './components/home/Home';
import MembersList from './components/member/members-list';
import MemberCreation from './components/member/member-creation';
import GamesList from './components/game/games-list';
import GameCreation from './components/game/game-creation';
import LoanCreation from './components/loan/loan-creation';
import LoansList from './components/loan/loans-list';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {

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
                <Route path= '/addLoan' component= { LoanCreation } />
                <Route path= '/loansList' component= { LoansList } />
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

export default App;
