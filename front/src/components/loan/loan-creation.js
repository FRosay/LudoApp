import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, FormGroup, FormLabel, Col, Button } from 'react-bootstrap'


function LoanCreation() {

    const [loanToCreate, setLoanToCreate] = useState({ loanNumber: 1, startDate: null, endDate: null, memberId: 'Empty', gameId: 'Empty' })
    const [members, setMembers] = useState([]);
    const [games, setGames] = useState([]);

    const LOANCREATIONSCHEMA = yup.object().shape({
        startDate: yup.date().default(function () {return new Date()}).max(yup.ref('endDate'), 'La date de début ne peut être postérieure à la date de fin').required('Requis'),
        endDate: yup.date().default(function () {return new Date()}).min(yup.ref('startDate'), 'La date de fin ne peut être antérieure à la date de début').required('Requis'),
    });

    useEffect(() => {
        setLoanNumber();
        getAllMembers();
        getAllAvailableGames();
        // eslint-disable-next-line
    }, []);
    
    function createLoan(newLoan) {
        if (newLoan.memberId !== 'Empty' && newLoan.gameId !== 'Empty') {
            axios.post('http://localhost:5000/loan', { loan: newLoan })
            .then((loanResponse) => { 
                if (loanResponse.status === 200) {
                    axios.post('http://localhost:5000/game/availability', { gameId: newLoan.gameId, newAvailability: 'Loaned' })
                    .then((availabilityResponse) => {
                        if (availabilityResponse.status === 200) {
                            setLoanNumber()
                            getAllAvailableGames()
                        }
                    })
                }
            })
        }
    };

    function setLoanNumber() {
        axios.get('http://localhost:5000/loan/getlast')
            .then((response) => {
                if (response.data !== null && response.data.loanNumber !== undefined) {
                    let newLoan = {...loanToCreate}
                    newLoan.loanNumber = response.data.loanNumber + 1
                    setLoanToCreate(newLoan)
                }
        })
    };

    function getAllMembers() {
        axios.get('http://localhost:5000/members')
            .then((response) => {
            setMembers(response.data)
        })
    };

    function getAllAvailableGames() {
        axios.get('http://localhost:5000/games-available')
            .then((response) => {
            setGames(response.data)
        })
    };

    function formSubmitHandler(values) {
        let newLoan = {}

        newLoan.loanNumber  = loanToCreate.loanNumber
        newLoan.startDate   = values.startDate
        newLoan.endDate     = values.endDate
        newLoan.memberId    = values.borrower
        newLoan.gameId      = values.borrowedGame

        setLoanToCreate(newLoan)
        createLoan(newLoan)
    };

    return (
        <div>
            <h2>Enregistrer un prêt</h2>
            <br />
            <p>Prêt numéro { loanToCreate.loanNumber !== null ? loanToCreate.loanNumber : '?' }</p>
            <Formik initialValues=  {{  borrower: loanToCreate.memberId,
                                        borrowedGame: loanToCreate.gameId,
                                        startDate: new Date(),
                                        endDate: new Date(),
                                    }}
                validateOnBlur=   { true }
                validateOnChange=   { true }
                validationSchema= { LOANCREATIONSCHEMA }
                onSubmit= { async (values) => { await formSubmitHandler(values) }}
            >
                {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors,
                }) => (
                    <Form onSubmit= { handleSubmit }>
                        <Form.Row>
                            <FormGroup as= { Col } md='6' controlId= 'validationFormik01'>
                                <FormLabel>Qui emprunte : </FormLabel>
                                <Form.Control as= 'select' name= 'borrower' value= { values.borrower } onChange= { handleChange } 
                                                onBlur= { handleBlur } isValid= { touched.borrower && !errors.borrower }>
                                    <option value= 'Empty'>Choisissez ici qui emprunte le jeu</option>
                                    { members.map((member, index) => {
                                        return <option key= { index } value= { member._id }>{ member._id } - { member.firstName } { member.lastName }</option>
                                    }) }
                                </Form.Control>
                            </FormGroup>
                            <FormGroup as= { Col } md='6' controlId= 'validationFormik02'>
                                <FormLabel>Jeu emprunté : </FormLabel>
                                <Form.Control as= 'select' name= 'borrowedGame' value= { values.borrowedGame } onChange= { handleChange } 
                                                onBlur= { handleBlur } isValid= { touched.borrowedGame && !errors.borrowedGame }>
                                    <option value= 'Empty'>Choisissez ici le jeu emprunté</option>
                                    { games.map((game, index) => {
                                        return <option key= { index } value= { game._id }>{ game._id } - { game.name }</option>
                                    }) }
                                </Form.Control>
                            </FormGroup>
                        </Form.Row>
                        <Form.Row>
                            <FormGroup as= { Col } md='6' controlId= 'validationFormik03'>
                                <FormLabel>Date de début : </FormLabel>
                                <Form.Control as= { DatePicker } name= 'startDate' selected= { values.startDate } dateFormat='dd/MM/yyyy' value= { values.startDate } 
                                        onChange= { (date) => setFieldValue('startDate', date, true) } isValid= { touched.startDate && !errors.startDate } placeholderText= '01/01/2020'/>
                                { errors.startDate && touched.startDate ? <div>{ errors.startDate }</div> : null }
                            </FormGroup>

                            <FormGroup as= { Col } md='6' controlId= 'validationFormik04'>
                                <FormLabel>Date de fin : </FormLabel>
                                <Form.Control as= { DatePicker } name= 'endDate' selected= { values.endDate } dateFormat='dd/MM/yyyy' value= { values.endDate } 
                                        onChange= { (date) => setFieldValue('endDate', date, true) } isValid= { touched.endDate && !errors.endDate } placeholderText= '01/01/2020'>
                                { errors.endDate && touched.endDate ? <div>{ errors.endDate }</div> : null }
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

export default LoanCreation;
