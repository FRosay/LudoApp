import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TableView from '../../views/table-view';


export default function LoansList() {

  const [loans, setLoans] = useState([]);

  const deleteOneLoan = React.useCallback((loanId, gameId) => {
    axios.delete('http://localhost:5000/loan/delete/', { data: { loanId: loanId } })
      .then((response) => {
        if (response.status === 200) {
          axios.post('http://localhost:5000/game/availability', { gameId: gameId, newAvailability: 'Available' })
          getAllLoans()
        }
      })
  }, []);

  const processData = React.useCallback(() => {
    if (Array.isArray(loans) === true) {
      return loans.map(d => {
        return ({
          _id: d._id,
          loanNumber: d.loanNumber,
          gameName: d.game.name,
          memberName: d.member.firstName + ' ' + d.member.lastName,
          loanStartDate: d.startDate,
          loanEndDate: d.endDate,
          loanDeleteButton: <button onClick={() => deleteOneLoan(d._id, d.game._id)}>Supprimer</button>
        })
      })
    } else {
      return []
    }
  }, [loans, deleteOneLoan])

  const data = React.useMemo(() => processData(), [processData])

  const columns = React.useMemo(
    () => [
      {
        Header: '_id',
        accessor: '_id',
      },
      {
        Header: 'N°',
        accessor: 'loanNumber',
      },
      {
        Header: 'Jeu prêté',
        accessor: 'gameName',
      },
      {
        Header: 'Prêté à',
        accessor: 'memberName',
      },
      {
        Header: 'Du',
        accessor: 'loanStartDate',
      },
      {
        Header: 'Au',
        accessor: 'loanEndDate',
      },
      {
        Header: '',
        accessor: 'loanDeleteButton',
      },
    ],
    []
  )

  useEffect(() => {
    setLoans(getAllLoans())
  }, []);

  function getAllLoans() {
    return new Promise(() => {
      axios.get('http://localhost:5000/loans')
        .then((response) => {
          setLoans(response.data)
        })
    })
  };

  function deleteAllLoans() {
    loans.forEach(loan => deleteOneLoan(loan._id, loan.game._id))
  };

  return (
    <div>
      <h2>Tous les prêts :</h2>
      <br />
      <TableView columns={columns} data={data} />
      <br />
      <button onClick={() => deleteAllLoans()}>Supprimer tous les prêts</button>
    </div>
  )
};