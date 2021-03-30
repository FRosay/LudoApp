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
      })
    })
  };

  function deleteAllLoans() {
    axios.delete('http://localhost:5000/loan/delete/')
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
        return <Loan  key= { index } loanId= { loan._id } loanNumber= { loan.loanNumber } 
                      startDate= { loan.startDate } endDate= { loan.endDate } 
                      memberFirstName= { loan.member.firstName } memberLastName= { loan.member.lastName } gameName= { loan.game.name }></Loan>
      })}
      <br/>
      <button onClick= { () => getAllLoans() }>Rafraîchir</button>
      <button onClick= { () => deleteAllLoans() }>Supprimer tous les prêts</button>
    </div>
  )
}

export default LoansList;