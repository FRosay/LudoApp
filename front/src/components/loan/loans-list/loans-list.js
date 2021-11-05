import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TableView from '../../views/table-view';


export default function LoansList() {

  const [loans, setLoans] = useState([]);

  function getAllLoans() {
    return new Promise(() => {
      axios.get('http://localhost:5000/loans')
        .then((response) => {
          setLoans(response.data)
        })
    })
  };

  const processData = React.useCallback(() => {
    if (Array.isArray(loans) === true) {
      return loans.map(d => {
        return ({
          loanNumber: d.loanNumber,
          gameName: d.game.name,
          memberName: d.member.firstName + ' ' + d.member.lastName,
          loanStartDate: d.startDate,
          loanEndDate: d.endDate
        })
      })
    } else {
      return []
    }
  }, [loans])

  useEffect(() => {
    setLoans(getAllLoans())
  }, []);

  const data = React.useMemo(() => processData(), [processData])

  const columns = React.useMemo(
    () => [
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
    ],
    []
  )

  async function deleteOneLoan(loanId, gameId) {
    axios.delete('http://localhost:5000/loan/delete/', { data: { loanId: loanId } })
      .then((response) => {
        if (response.status === 200) {
          axios.post('http://localhost:5000/game/availability', { gameId: gameId, newAvailability: 'Available' })
          getAllLoans()
        }
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

      <button onClick={() => deleteAllLoans()}>Supprimer tous les prêts</button>
    </div>
  )

  /*
      <Table striped bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
  */

};