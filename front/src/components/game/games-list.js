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
    return new Promise(() => {
      axios.get('http://localhost:5000/games')
        .then((response) => {
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
        <h2>Tous les jeux :</h2>
        <br/>
        {this.state.games.map((game, index) => {
          return <Game key= { index } gameId= { game._id } name= { game.name } availability= { game.availability }
                       gameType= { game.gameType } editor= { game.editor } author= { game.author } description= { game.description }>
                 </Game>
        })}
        <br/>
        <button onClick= { () => this.getAllGames() }>Rafraîchir</button>
        <button onClick= { () => this.deleteAllGames() }>Supprimer tous les jeux</button>
      </div>
    )
  }
 
}

export default GamesList;
