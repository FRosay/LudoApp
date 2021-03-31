import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, FormGroup, FormLabel, Col, Button } from 'react-bootstrap'
import './member.css'


function MemberCreation() {

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const MEMBERCREATIONSCHEMA = Yup.object().shape({
        firstName: Yup.string().max(40, 'Trop long').required('Requis'),
        lastName: Yup.string().max(40, 'Trop long').required('Requis'),
        adress: Yup.string().max(100, 'Trop long').required('Requis'),
        postalCode: Yup.number().positive().integer().required('Requis'),
        city: Yup.string().max(40, 'Trop long').required('Requis'),
        phoneHome: Yup.string().matches(phoneRegExp, 'Numéro invalide').max(10, 'Trop long'),
        phoneMobile: Yup.string().matches(phoneRegExp, 'Numéro invalide').max(10, 'Trop long'),
        email: Yup.string().email('Email invalide'),
        contribution: Yup.number().positive().integer().max(40, 'Trop long'),
        contributionRate: Yup.number().positive().integer().max(40, 'Trop long'),
    });
    const [memberToCreate, setMemberToCreate] = useState({memberNumber: 1, nameInfo: {firstName: '', lastName: ''}, adressInfo: {adress: '', postalCode: '', city: ''}, 
                                                          contactInfo: {phoneHome: '', phoneMobile: '', email: ''}, memberInfo: {memberId: '', contribution: '', contributionRate: ''}});

    useEffect(() => {
        setMemberNumber();
        // eslint-disable-next-line
      }, []);

    function createMember(newMember) {
        axios.post('http://localhost:5000/member', {
            member: newMember
        }).then(() => alert('Membre ajouté : ' + newMember.nameInfo.firstName + ' ' + newMember.nameInfo.lastName + '.'))
          .then(() => { setMemberNumber() })
    };

    function setMemberNumber() {
        axios.get('http://localhost:5000/member/getlastnumber').then((response) => {
            if (response.data !== null && response.data.memberNumber !== undefined) {
                let newMember = {...memberToCreate}
                newMember.memberNumber = response.data.memberNumber + 1

                setMemberToCreate(newMember)
            }
        })
    }

    function formSubmitHandler(values) {
        let newMember = {...memberToCreate}

        newMember.nameInfo.firstName            = values.firstName
        newMember.nameInfo.lastName             = values.lastName
        newMember.adressInfo.adress             = values.adress
        newMember.adressInfo.postalCode         = values.postalCode
        newMember.adressInfo.city               = values.city
        newMember.contactInfo.phoneHome         = values.phoneHome
        newMember.contactInfo.phoneMobile       = values.phoneMobile
        newMember.contactInfo.email             = values.email
        newMember.memberInfo.contribution       = values.contribution
        newMember.memberInfo.contributionRate   = values.contributionRate

        setMemberToCreate(newMember)
        createMember(newMember)       
    };

    return (
        <div>
            <h2>Ajouter un.e adhérent.e</h2>
            <br />
            <p>Numéro d'adhérent.e : { memberToCreate.memberNumber !== null ? memberToCreate.memberNumber : '?' }</p>
            <Formik initialValues=  {{  firstName: '', lastName: '', 
                                        adress: '', postalCode: '', city: '',
                                        phoneHome: '', phoneMobile: '', email: '',
                                        contribution: '', contributionRate: ''}}
                    validateOnBlur=     { true }
                    validateOnChange=   { true }
                    validationSchema=   { MEMBERCREATIONSCHEMA }
                    onSubmit=           { async (values) => { await formSubmitHandler(values) }}
            >
                {({ handleSubmit, handleChange, handleBlur, errors, touched, values 
                }) => (
                    <Form onSubmit= { handleSubmit }>
                        <Form.Row>
                            <FormGroup as= { Col } md='6' controlId= 'validationFormik01'>
                                <FormLabel>Nom : </FormLabel>
                                <Form.Control type= 'text' name= 'lastName' value= { values.lastName } 
                                            onChange= { handleChange } onBlur= { handleBlur } />
                            </FormGroup>

                            <FormGroup as= { Col } md='6' controlId= 'validationFormik02'>
                                <FormLabel>Prénom : </FormLabel>
                                <Form.Control type= 'text' name= 'firstName' value= { values.firstName } 
                                            onChange= { handleChange } onBlur= { handleBlur } />
                            </FormGroup>
                        </Form.Row>

                        <Form.Row>
                            <FormGroup as= { Col } md='12' controlId= 'validationFormik03'>
                                <FormLabel>Adresse : </FormLabel>
                                <Form.Control type= 'text' name= 'adress' value= { values.adress } 
                                            onChange= { handleChange } onBlur= { handleBlur } />
                            </FormGroup>
                            <FormGroup as= { Col } md='6' controlId= 'validationFormik04'>
                                <FormLabel>Ville : </FormLabel>
                                <Form.Control type= 'text' name= 'city' value= { values.city } 
                                            onChange= { handleChange } onBlur= { handleBlur } />
                            </FormGroup>
                            <FormGroup as= { Col } md='6' controlId= 'validationFormik05'>
                                <FormLabel>Code Postal : </FormLabel>
                                <Form.Control type= 'number' name= 'postalCode' value= { values.postalCode } 
                                            onChange= { handleChange } onBlur= { handleBlur } />
                            </FormGroup>
                        </Form.Row>

                        <Form.Row>
                            <FormGroup as= { Col } md='3' controlId= 'validationFormik06'>
                                <FormLabel>Téléphone fixe : </FormLabel>
                                <Form.Control type= 'text' name= 'phoneHome' value= { values.phoneHome } 
                                            onChange= { handleChange } onBlur= { handleBlur } />
                                { errors.phoneHome && touched.phoneHome ? <div>{ errors.phoneHome }</div> : null }
                            </FormGroup>
                            <FormGroup as= { Col } md='3' controlId= 'validationFormik07'>
                                <FormLabel>Téléphone mobile : </FormLabel>
                                <Form.Control type= 'text' name= 'phoneMobile' value= { values.phoneMobile } 
                                            onChange= { handleChange } onBlur= { handleBlur } />
                                { errors.phoneMobile && touched.phoneMobile ? <div>{ errors.phoneMobile }</div> : null }
                            </FormGroup>
                            <FormGroup as= { Col } md='6' controlId= 'validationFormik08'>
                                <FormLabel>Adresse mail : </FormLabel>
                                <Form.Control type= 'email' name= 'email' value= { values.email } 
                                            onChange= { handleChange } onBlur= { handleBlur } />
                                { errors.email && touched.email ? <div>{ errors.email }</div> : null }
                            </FormGroup>
                        </Form.Row>

                        <Form.Row>
                            <FormGroup as= { Col } md='5' controlId= 'validationFormik09'>
                                <FormLabel>Contribution (en €) : </FormLabel>
                                <Form.Control type= 'number' name= 'contribution' value= { values.contribution } 
                                            onChange= { handleChange } onBlur= { handleBlur } />
                            </FormGroup>
                            <FormGroup as= { Col } md='5' controlId= 'validationFormik10'>
                                <FormLabel>Taux de contribution (en %) : </FormLabel>
                                <Form.Control type= 'number' name= 'contributionRate' value= { values.contributionRate } 
                                            onChange= { handleChange } onBlur= { handleBlur } />
                            </FormGroup>
                        </Form.Row>

                        <Button variant="primary" type='submit'>Créer</Button>
                    </Form>
                )}        
            </Formik>
        </div>
    );
};

export default MemberCreation;