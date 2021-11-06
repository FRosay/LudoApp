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
          gameStatus: getAvailability(d),
          gameEditor: d.editor,
          gameAuthor: getAuthors(d),
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

  function getAvailability(game) {
    let result = ''
    switch (game.availability) {
      case 'Available':
        result = 'Disponible'
        break;

      case 'InRepair':
        result = 'En réparations'
        break;

      case 'Loaned':
        result = 'Prêté'
        break;

      default:
        result = '?'
        break;
    }
    return result;
  };

  function getAuthors(game) {
    let result = ''
    game.authors.forEach(author => {
      result === '' ? result = result + author : result = result + ' & ' + author
    });
    return result
  };
  
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