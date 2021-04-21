import React, { useState } from 'react';


function Loan(props) {

    const [loan] = useState({ loanId: props.loanId, loanNumber: props.loanNumber, startDate: props.startDate, endDate: props.endDate, 
                            memberFirstName: props.memberFirstName, memberLastName: props.memberLastName, game: props.game });

    let startDate = new Date(loan.startDate).toLocaleDateString()
    let endDate = new Date(loan.endDate).toLocaleDateString()

    return (
        <div>
            <p>Numéro de la réservation : { loan.loanNumber }</p>

            <p>Jeu prêté : { loan.game !== undefined ? loan.game.name : '?' }</p>
            
            <p>Prêté à : { loan.memberFirstName } { loan.memberLastName }</p>

            <p>Prêté du { startDate } au { endDate }</p>
        </div>
    )
}

export default Loan;