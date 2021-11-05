import React, { useState } from 'react';


function Loan(props) {

    const [loan] = useState({ loanId: props.loanId, loanNumber: props.loanNumber, startDate: props.startDate, endDate: props.endDate, 
                            memberFirstName: props.memberFirstName, memberLastName: props.memberLastName, game: props.game });

    let startDate = new Date(loan.startDate).toLocaleDateString()
    let endDate = new Date(loan.endDate).toLocaleDateString()

    return (
        <div>
            <td>{ loan.loanNumber }</td>

            <td>{ loan.game !== undefined ? loan.game.name : '?' }</td>
            
            <td>{ loan.memberFirstName } { loan.memberLastName }</td>

            <td>{ startDate }  { endDate }</td>
        </div>
    )
}

export default Loan;