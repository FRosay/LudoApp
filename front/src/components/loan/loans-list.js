import React, { useState } from 'react';
import axios from 'axios';
import Loan from './Loan';


function LoansList() {

  const [loans, setLoans] = useState([]);
  const [init, setInit] = useState(true);

  function getAllLoans() {
    return new Promise(() => {
      axios.get('http://localhost:5000/loans')
        .then((response) => {
          setLoans(response.data)
          console.log(response.data)
      })
    })
  };

  function deleteAllLoans() {
    axios.delete('http://localhost:5000/loans/delete/')
  };

  function deleteOneLoan(loanId, gameId) {
    axios.post('http://localhost:5000/game/availability', { gameId: gameId, newAvailability: 'Available' })
          .then(() => { axios.delete('http://localhost:5000/loan/delete/', { data: { loanId: loanId } }) })
  };

  if (init === true) {
    getAllLoans()
    setInit(false)
  }

  return (
    <div>
      <h2>Tous les prêts :</h2>
      <br/>
      {loans.map((loan, index) => {
        
        return  <div key= { loan._id }> 
                  <Loan  key= { index } loanId= { loan._id } loanNumber= { loan.loanNumber } startDate= { loan.startDate } endDate= { loan.endDate } 
                      memberFirstName= { loan.member.firstName } memberLastName= { loan.member.lastName } game= { loan.game }></Loan>
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