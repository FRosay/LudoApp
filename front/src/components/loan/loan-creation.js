import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';


class LoanCreation extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            loanToCreate: { loanNumber: 1, startDate: null, 
                            endDate: null, memberId: null, gameId: null }
        }

        this.createLoan = this.createLoan.bind(this)
        this.formChangeHandler = this.formChangeHandler.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
        this.formDatesChangeHandler = this.formDatesChangeHandler.bind(this)
        this.setLoanNumber = this.setLoanNumber.bind(this)

        this.setLoanNumber()
    }


    setLoanNumber() {
        axios.get('http://localhost:5000/loan/getlast').then((response) => {
            if (response.data !== null && response.data.loanNumber !== undefined) {
                let newLoan = this.state.loanToCreate
                newLoan.loanNumber = response.data.loanNumber + 1

                this.setState({ loanToCreate: newLoan })
            }
        })
    }
    
    createLoan() {
        axios.post('http://localhost:5000/loan', {
            loan: this.state.loanToCreate
        }).then(() => { this.setLoanNumber() })
    };

    formDatesChangeHandler(date, whichDate) {
        let newLoan = this.state.loanToCreate
        let newDate = date
        
        if (whichDate === 'start') {
            newLoan.startDate = newDate
        } else {
            newLoan.endDate = newDate
        }

        this.setState({ loanToCreate: newLoan });
    }

    formChangeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        let newLoan = this.state.loanToCreate;

        switch (name) {
            case 'firstName':
                newLoan.firstName = value
                break;
            case 'lastName':
                newLoan.lastName = value
                break;
            default:
                
                break;
        }

        this.setState({ loanToCreate: newLoan });
    };

    formSubmitHandler(e) {
        e.preventDefault();
        if (this.state.loanToCreate.startDate > this.state.loanToCreate.endDate) {
            alert('La date de début ne peut être après la date de fin.')
            return
        } else if (this.state.loanToCreate.memberId === undefined || this.state.loanToCreate.gameId === undefined) {
            alert('Il faut spécifier un jeu et une personne à qui le prêter.')
            return
        }
        this.createLoan()
    };

  render () {
    return (
        <form onSubmit= { this.formSubmitHandler }>
            <p>Prêt numéro { this.state.loanToCreate.loanNumber !== null ? this.state.loanToCreate.loanNumber : '?' }</p>
                    
            <p>Dates du prêt :</p>
            <DatePicker
                name= 'startDate'
                showPopperArrow= {false}
                selected= { this.state.loanToCreate.startDate }
                placeholderText= 'date de début'
                onChange= { (date) => this.formDatesChangeHandler(date, 'start') }
                dateFormat="dd/MM/yyyy"
            />
            <DatePicker
                name= 'endDate'
                showPopperArrow= { false }
                selected= { this.state.loanToCreate.endDate }
                placeholderText= 'date de fin'
                onChange= { (date) => this.formDatesChangeHandler(date, 'end') }
                dateFormat="dd/MM/yyyy"
            />

            <br/> <br/>
            
            <input type= 'submit' />
        </form>
    )
  };
 
};

export default LoanCreation;
