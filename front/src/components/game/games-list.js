import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Game from './Game';


function GamesList(props) {

  const [games, setGames] = useState([]);
  
  useEffect(() => {
    getAllGames();
  }, []);

  function getAllGames() {
    return new Promise(() => {
      axios.get('http://localhost:5000/games')
        .then((response) => {
          setGames(response.data)
        })
    })
  }

  async function deleteOneGame(gameId) {
      axios.delete('http://localhost:5000/game/delete/', { data: { gameId: gameId } })
        .then((response) => {
          if (response.status === 200) { 
            getAllGames() 
          }
        })        
  };
  
  function deleteAllGames() {
    axios.delete('http://localhost:5000/games/delete/')
      .then((response) => { 
        if (response.status === 200) {
          getAllGames() 
        }
      })
  }

  return (
    <div>
      <h2>Tous les jeux :</h2>
      <br/>
      {games.map((game, index) => {
        return  <div key= { index }>
                  <Game key= { game._id } gameId= { game._id } name= { game.name } availability= { game.availability }
                        gameType= { game.gameType } editor= { game.editor } author= { game.author } description= { game.description }>
                  </Game>
                  <button key= { game._id+1 } onClick={ () => deleteOneGame(game._id) }>Supprimer ce jeu</button>
                </div>
      })}
      <br/>
      <button onClick= { () => getAllGames() }>Rafraîchir</button>
      <button onClick= { () => deleteAllGames() }>Supprimer tous les jeux</button>
    </div>
  ) 
}

export default GamesList;