import React from 'react';
import GamesList from './components/game/games-list'
import GameCreation from './components/game/game-creation'


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }  

  render () {
    return  (
      <div className="App">
        <GameCreation />
        <br/><br/>
        <GamesList />
      </div>
    )
  }
 
}

export default App;
