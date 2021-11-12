import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TableView from '../views/table-view';
import ModalPopup from '../views/modal-view';


export default function GamesList() {

  const [games, setGames] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [gameToEdit, setGameToEdit] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const editGame = React.useCallback((game) => {
    setGameToEdit(game)
    setRedirect('/addGame')
  }, []);

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
          gameDetail: <button onClick={() => setModalShow(true)}>Details</button>,
          gameName: d.name,
          gameStatus: getAvailability(d),
          gameEditor: d.editor,
          gameAuthor: getAuthors(d),
          gameDescription: d.description,
          gameEditButton: <button onClick={() => editGame(d)}>Modifier</button>,
          gameDeleteButton: <button onClick={() => deleteOneGame(d._id)}>Supprimer</button>
        })
      })
    } else {
      return []
    }
  }, [games, editGame, deleteOneGame])

  const data = React.useMemo(() => processData(), [processData])

  const columns = React.useMemo(
    () => [
      {
        Header: '_id',
        accessor: '_id',
      },
      {
        Header: '',
        accessor: 'gameDetail',
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
        accessor: 'gameEditButton',
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
    if (game.authors !== null) {
      game.authors.forEach(author => {
        result === '' ? result = result + author : result = result + ' & ' + author
      });
    }
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

  if (redirect) {
    return <Redirect to={{ pathname: redirect, state: { referrer: gameToEdit } }} />
  } else {
    return (
      <div>
        <ModalPopup
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <h2>Tous les jeux :</h2>
        <br />
        <TableView columns={columns} data={data} />
        <br />
        <button onClick={() => getAllGames()}>Rafraîchir</button>
        <button onClick={() => deleteAllGames()}>Supprimer tous les jeux</button>
        <button onClick={() => console.log(games)}>Console tous les jeux</button>
      </div>
    )
  }
};