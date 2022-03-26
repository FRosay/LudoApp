import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TableView from '../../views/TableView';
import ModalView from '../../views/modal-view';
import { Sorter } from "../../../utils/TableDataSorter";


export default function LoansList() {

  const [loans, setLoans] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [loanToEdit, setLoanToEdit] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const editLoan = React.useCallback((loan) => {
    setLoanToEdit(loan)
    setRedirect('/addLoan')
  }, []);

  const deleteOneLoan = React.useCallback((loanId, gameId = '') => {
    axios.delete('http://localhost:5000/loan/delete/', { data: { loanId: loanId } })
      .then((response) => {
        if (response.status === 200 && gameId !== '') {
          axios.post('http://localhost:5000/game/availability', { gameId: gameId, newAvailability: 'Available' })
        }
      })
  }, []);

  const getAllLoans = React.useCallback(() => {
    return new Promise(() => {
      axios.get('http://localhost:5000/loans')
        .then((response) => {
          setLoans(response.data)
        })
    })
  }, []);

  const deleteAllLoans = React.useCallback(() => {
    loans.forEach((loan) => {
      if (loan.game !== null) {
        deleteOneLoan(loan._id, loan.game._id);
      } else {
        deleteOneLoan(loan._id);
      }
    })
    getAllLoans();
  }, [deleteOneLoan, getAllLoans, loans]);

  const processData = React.useCallback(() => {
    if (Array.isArray(loans) === true) {
      return loans.map(d => {
        return ({
          loanDetail: <button onClick={() => setModalShow(true)}>Details</button>,
          loanNumber: d.loanNumber,
          gameName: d.game.name,
          memberName: d.member.firstName + ' ' + d.member.lastName,
          loanStartDate: d.startDate,
          loanEndDate: d.endDate,
          loanEditButton: <button onClick={() => editLoan(d)}>Modifier</button>,
          loanDeleteButton: <button onClick={() => deleteOneLoan(d._id, d.game._id)}>Supprimer</button>
        })
      })
    } else {
      return []
    }
  }, [deleteOneLoan, editLoan, loans])

  const data = React.useMemo(() => processData(), [processData])

  const columns = React.useMemo(
    () => [
      {
        title: '',
        dataIndex: 'loanDetail',
      },
      {
        title: 'N°',
        dataIndex: 'loanNumber',
      },
      {
        title: 'Jeu prêté',
        dataIndex: 'gameName',
        sorter: { compare: Sorter.DEFAULT, }
      },
      {
        title: 'Prêté à',
        dataIndex: 'memberName',
        sorter: { compare: Sorter.DEFAULT, }
      },
      {
        title: 'Du',
        dataIndex: 'loanStartDate',
        sorter: { compare: Sorter.DEFAULT, }
      },
      {
        title: 'Au',
        dataIndex: 'loanEndDate',
        sorter: { compare: Sorter.DEFAULT, }
      },
      {
        title: '',
        dataIndex: 'loanEditButton',
      },
      {
        title: '',
        dataIndex: 'loanDeleteButton',
      },
    ],
    []
  )

  useEffect(() => {
    getAllLoans()
  }, [getAllLoans]);

  if (redirect) {
    return <Redirect to={{ pathname: redirect, state: { referrer: loanToEdit } }} />
  } else {
    return (
      <div>
        <ModalView
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <h2>Tous les prêts :</h2>
        <br />
        <TableView columns={columns} data={data} />
        <br />
        <button onClick={() => deleteAllLoans()}>Supprimer tous les prêts</button>
        <button onClick={() => console.log(loans)}>Console tous les prêts</button>
      </div>
    )
  }
};