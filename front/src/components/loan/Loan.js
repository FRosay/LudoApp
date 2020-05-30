import React from 'react';


class Loan extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      loanId: this.props.loanId,
      loanNumber: this.props.loanNumber,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      member: this.props.member,
      game: this.props.game
    }

  }
//<p>Jeu concerné : { this.state.game.name }</p>
//<p>Prêté à : { this.state.member.fullName }</p>
  render () {
    let startDate = new Date(this.state.startDate).toLocaleDateString()
    //startDate = startDate.toLocaleDateString()
    let endDate = new Date(this.state.endDate)
    endDate = endDate.toLocaleDateString()
    return (
        <div>
            <p>Numéro de la réservation : { this.state.loanNumber }</p>
            
            <p>Prêté du : { startDate }</p>
            <p>Jusqu'au : { endDate }</p>

        </div>
    )
  }
}

export default Loan;