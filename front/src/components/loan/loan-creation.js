import React from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, FormGroup, FormLabel, Col, Button } from 'react-bootstrap'


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

        // eslint-disable-next-line
        let loanCreationSchema = yup.object().shape({
            startDate: yup.date().default(function () {return new Date()})
                .max(yup.ref('endDate'), 'La date de début ne peut être après la date de fin')
                .required('Requis'),
            endDate: yup.date().default(function () {return new Date()})
                .min(yup.ref('startDate'), 'La date de fin ne peut être avant la date de début')
                .required('Requis'),
        });
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

    formSubmitHandler(values) {
        let newLoan = this.state.loanToCreate
        newLoan.startDate = values.startDate
        newLoan.endDate = values.endDate
        
        this.setState({
            loanToCreate: newLoan
        })

        this.createLoan()
    };

  render () {
    return (
        <div>
            <h2>Déclarer un prêt</h2>
            <p>Prêt numéro { this.state.loanToCreate.loanNumber !== null ? this.state.loanToCreate.loanNumber : '?' }</p>
            <Formik initialValues=  {{  startDate: new Date(),
                                        endDate: new Date(),
                                    }}
                    validationSchema= { this.loanCreationSchema }
                    onSubmit= { values => { this.formSubmitHandler(values) }}
                >
                {({ handleSubmit, setFieldValue,
                    values, touched, isValid, errors, 
                }) => (
                    <Form noValidate onSubmit= { handleSubmit }>
                        <Form.Row>
                            <FormGroup as= { Col } md='6' controlId= 'validationFormik01'>
                                <FormLabel>Date de début : </FormLabel>
                                <Form.Control as= { DatePicker } name= 'startDate' selected= { values.startDate } dateFormat='dd/MM/yyyy' value= { values.startDate } 
                                              onChange= { (date) => setFieldValue('startDate', date, true) } isValid= { touched.startDate && !errors.startDate } placeholderText= '01/01/2020'/>
                            </FormGroup>

                            <FormGroup as= { Col } md='6' controlId= 'validationFormik02'>
                                <FormLabel>Date de fin : </FormLabel>
                                <Form.Control as= { DatePicker } name= 'endDate' selected= { values.endDate } dateFormat='dd/MM/yyyy' value= { values.endDate } 
                                              onChange= { (date) => setFieldValue('endDate', date, true) } isValid= { touched.endDate && !errors.endDate } placeholderText= '01/01/2020'>
                                </Form.Control>
                            </FormGroup>
                        </Form.Row>

                        <Button variant="primary" type='submit'>Créer</Button>
                    </Form>
                )}        
            </Formik>
        </div>
    )
  };
 
};

export default LoanCreation;
