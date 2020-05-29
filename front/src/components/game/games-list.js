import React from 'react';
import axios from 'axios';
import Game from './game-object';


class GamesList extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      games: []
    }

    this.getAllGames()
  }

  
  getAllGames() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:5000/games').then(response => {
        resolve(response.data)
      }).catch(e => reject(e))
    })
  }

  render () {
    return (
      <div>
        <h1>Tous les jeux :</h1>
        <br/>
          {this.state.games.map((game, index) => {
            return <Game key={index} name={game.name} availability={game.availability}></Game>
          })}
      </div>
    )
  }
 
}

export default GamesList;
