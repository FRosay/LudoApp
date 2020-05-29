import React from 'react';
import axios from 'axios';
import Game from './Game';


class GamesList extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      games: []
    }

    this.getAllGames = this.getAllGames.bind(this)
    this.deleteAllGames = this.deleteAllGames.bind(this)

    this.getAllGames()
  }

  
  getAllGames() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:5000/games')
        .then((response) => {
          console.log(response.data)
          this.setState({
            games: response.data
          })
      })
    })
  }

  deleteAllGames() {
    axios.delete('http://localhost:5000/game/delete/')
  }

  render () {
    return (
      <div>
        <h1>Tous les jeux :</h1>
        <br/>
        {this.state.games.map((game, index) => {
          return <Game key={index} name={game.name} availability={game.availability}></Game>
        })}
        <br/>
        <button onClick= { () => this.getAllGames() }>Rafraîchir</button>
        <button onClick= { () => this.deleteAllGames() }>Supprimer tous les jeux</button>
      </div>
    )
  }
 
}

export default GamesList;
