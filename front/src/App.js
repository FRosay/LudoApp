import React from 'react';
import GamesList from './components/game/games-list'
import GameCreation from './components/game/game-creation'
import MembersList from './components/member/members-list'
import MemberCreation from './components/member/member-creation';


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }  

  render () {
    return  (
      <div className="App">
        <GameCreation /><MemberCreation />
        <br/><br/>
        <GamesList /><MembersList />
      </div>
    )
  }
 
}

export default App;
