import React from 'react';
import axios from 'axios';
import Loan from './Loan';


class LoansList extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      loans: []
    }

    this.getAllLoans = this.getAllLoans.bind(this)
    this.deleteAllLoans = this.deleteAllLoans.bind(this)

    this.getAllLoans()
  }

  
  getAllLoans() {
    return new Promise(() => {
      axios.get('http://localhost:5000/loans')
        .then((response) => {
          console.log(response.data)
          this.setState({
            loans: response.data
          })
      })
    })
  }

  deleteAllLoans() {
    axios.delete('http://localhost:5000/loan/delete/')
  }

  render () {
    return (
      <div>
        <h1>Tous les prêts :</h1>
        <br/>
        {this.state.loans.map((loan, index) => {
          return <Loan  key= { index } loanId= { loan._id } loanNumber= { loan.loanNumber } 
                        startDate= { loan.startDate } endDate= { loan.endDate } 
                        memberId= { loan.memberId } gameId= { loan.gameId }></Loan>
        })}
        <br/>
        <button onClick= { () => this.getAllLoans() }>Rafraîchir</button>
        <button onClick= { () => this.deleteAllLoans() }>Supprimer tous les prêts</button>
      </div>
    )
  }
 
}

export default LoansList;
