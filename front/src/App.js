import React from 'react';
import GamesList from './components/game/games-list';
import GameCreation from './components/game/game-creation';
import MembersList from './components/member/members-list';
import MemberCreation from './components/member/member-creation';
import LoansList from './components/loan/loans-list';
import LoanCreation from './components/loan/loan-creation';
import './App.css'


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }  

  render () {
    return  (
      <div className="App">
        <div className='defaultDiv'>
          <GameCreation /><MemberCreation /><LoanCreation />
        </div>
        <br/>
        <div className='defaultDiv'>
          <GamesList /><MembersList /><LoansList />
        </div>
      </div>
    )
  }
 
}

export default App;
