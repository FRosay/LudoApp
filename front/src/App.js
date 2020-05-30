import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GamesList from './components/game/games-list';
import GameCreation from './components/game/game-creation';
import MembersList from './components/member/members-list';
import MemberCreation from './components/member/member-creation';
import LoansList from './components/loan/loans-list';
import LoanCreation from './components/loan/loan-creation';

import Login from './components/login/Login';

import { Tabs, Tab } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css'


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
    }
  }  

  render () {
    if (false === true) {
      return  (
        <div className="App">
          <Tabs defaultActiveKey="members" id="main-tab">
            <Tab eventKey="members" title="Adhérent.e.s">
              <div className='defaultDiv'>
                <MemberCreation /><MembersList />
              </div>
            </Tab>
            <Tab eventKey="games" title="Jeux">
              <div className='defaultDiv'>
                <GameCreation /><GamesList />
              </div>
            </Tab>
            <Tab eventKey="loans" title="Prêts">
              <div className='defaultDiv'>
                <LoanCreation /><LoansList />
              </div>
            </Tab>
          </Tabs>
        </div>
      )
    } else {
      return (
        <Router>
          <div className="App">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route path="/sign-in" component={Login} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      )
    }
  }
}

export default App;
