import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loan from './Loan';


function LoansList() {

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    getAllLoans();
  }, []);

  function getAllLoans() {
    return new Promise(() => {
      axios.get('http://localhost:5000/loans')
        .then((response) => {
          setLoans(response.data)
        })
    })
  };

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
      <br/>
      {loans.map((loan, index) => {
        return  <div key= { index }> 
                  <Loan key= { loan._id } loanId= { loan._id } loanNumber= { loan.loanNumber } startDate= { loan.startDate } endDate= { loan.endDate } 
                      memberFirstName= { loan.member.firstName } memberLastName= { loan.member.lastName } game= { loan.game } />
                  <button key= { loan._id+1 } onClick={ () => deleteOneLoan(loan._id, loan.game._id) }>Supprimer ce prêt</button>
                </div>
      })}
      <br/>
      <button onClick= { () => getAllLoans() }>Rafraîchir</button>
      <button onClick= { () => deleteAllLoans() }>Supprimer tous les prêts</button>
    </div>
  )
}

export default LoansList;