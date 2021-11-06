import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableView from '../views/table-view';


export default function GamesList() {

  const [games, setGames] = useState([]);

  const deleteOneGame = React.useCallback((gameId) => {
    axios.delete('http://localhost:5000/game/delete/', { data: { gameId: gameId } })
      .then((response) => {
        if (response.status === 200) {
          getAllGames()
        }
      })
  }, []);

  const processData = React.useCallback(() => {
    if (Array.isArray(games) === true) {
      return games.map(d => {
        return ({
          _id: d._id,
          gameName: d.name,
          gameStatus: d.availability,
          gameEditor: d.editor,
          gameAuthor: d.authors[0],
          gameDescription: d.description,
          gameDeleteButton: <button onClick={() => deleteOneGame(d._id)}>Supprimer</button>
        })
      })
    } else {
      return []
    }
  }, [games, deleteOneGame])

  const data = React.useMemo(() => processData(), [processData])

  const columns = React.useMemo(
    () => [
      {
        Header: '_id',
        accessor: '_id',
      },
      {
        Header: 'Nom',
        accessor: 'gameName',
      },
      {
        Header: 'Statut',
        accessor: 'gameStatus',
      },
      {
        Header: 'Edité par',
        accessor: 'gameEditor',
      },
      {
        Header: 'Créé par',
        accessor: 'gameAuthor',
      },
      {
        Header: 'Description',
        accessor: 'gameDescription',
      },
      {
        Header: '',
        accessor: 'gameDeleteButton',
      },
    ],
    []
  )

  useEffect(() => {
    getAllGames();
  }, []);

  function getAllGames() {
    return new Promise(() => {
      axios.get('http://localhost:5000/games')
        .then((response) => {
          setGames(response.data);
        })
    })
  }

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
      <br />
      <TableView columns={columns} data={data} />
      <br />
      <button onClick={() => getAllGames()}>Rafraîchir</button>
      <button onClick={() => deleteAllGames()}>Supprimer tous les jeux</button>
    </div>
  )
};

/*
{games.map((game, index) => {
  return <div key={index}>
          <Game key={game._id} gameId={game._id} name={game.name} availability={game.availability}
            gameType={game.gameType} editor={game.editor} author={game.author} description={game.description}>
          </Game>
          <button key={game._id + 1} onClick={() => deleteOneGame(game._id)}>Supprimer ce jeu</button>
        </div>
})}
*/