import React, { useState } from 'react';
import axios from 'axios';
import Game from './Game';


function GamesList(props) {

  const [games, setGames] = useState([]);
  const [init, setInit] = useState(true);
  

  function getAllGames() {
    return new Promise(() => {
      axios.get('http://localhost:5000/games')
        .then((response) => {
          setGames(response.data)
        })
    })
  }

  function deleteAllGames() {
    axios.delete('http://localhost:5000/game/delete/')
  }

  if (init === true) {
    getAllGames()
    setInit(false)
  }

  return (
    <div>
      <h2>Tous les jeux :</h2>
      <br/>
      {games.map((game, index) => {
        return <Game key= { index } gameId= { game._id } name= { game.name } availability= { game.availability }
                      gameType= { game.gameType } editor= { game.editor } author= { game.author } description= { game.description }>
                </Game>
      })}
      <br/>
      <button onClick= { () => getAllGames() }>Rafraîchir</button>
      <button onClick= { () => deleteAllGames() }>Supprimer tous les jeux</button>
    </div>
  ) 
}

export default GamesList;