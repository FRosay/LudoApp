import React from 'react';
import axios from 'axios';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, FormGroup, FormLabel, Col, Button } from 'react-bootstrap'



const GAMECREATIONSCHEMA = Yup.object().shape({
    name: Yup.string()
        .max(40, 'Trop long')
        .required('Requis'),
    availability: Yup.string()
        .max(40, 'Trop long')
        .required('Requis'),
    gameType: Yup.string()
        .max(40, 'Trop long')
        .required('Requis'),
    editor: Yup.string()
        .max(40, 'Trop long')
        .required('Requis'),
    author: Yup.string()
        .max(40, 'Trop long')    
        .required('Requis'),
    description: Yup.string()
        .max(40, 'Trop long')    
        .required('Requis'),
});

class MemberCreation extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            memberToCreate: {memberNumber: 0, firstName: '', lastName: ''}
        }

        this.createMember = this.createMember.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)        
    }

    createMember() {
        axios.post('http://localhost:5000/member', {
            member: this.state.memberToCreate
        }).then(() => alert('Membre ajouté : ' + this.state.memberToCreate.firstName + ' ' + this.state.memberToCreate.lastName + '.'))
    };

    formSubmitHandler(values) {
        let newMember = this.state.memberToCreate
        newMember.firstName = values.firstName
        newMember.lastName = values.lastName

        this.setState({ memberToCreate: newMember })

        this.createMember()
    };

  render () {    
    return (
        <div>
            <h2>Ajouter un.e adhérent.e</h2>
            <p>Numéro d'adhérent.e : { this.state.memberToCreate.memberNumber }</p>
            <Formik initialValues=  {{  firstName: '',
                                        lastName: '',
                                        subscriberTypes: '',
                                        editor: '',
                                        author: '',
                                        description: '', }}
                    validateOnBlur= { false }
                    validateOnChange= { false }
                    validationSchema= { GAMECREATIONSCHEMA }
                    onSubmit= { values => { this.formSubmitHandler(values) }}
            >
                {({ handleSubmit, handleChange, handleBlur,
                    values, touched, isValid, errors, 
                }) => (
                    <Form noValidate onSubmit= { handleSubmit }>
                        <Form.Row>
                            <FormGroup as= { Col } md='6' controlId= 'validationFormik01'>
                                <FormLabel>Nom : </FormLabel>
                                <Form.Control type= 'text' name= 'lastName' value= { values.lastName } onChange= { handleChange } 
                                              onBlur= { handleBlur } isValid= { touched.lastName && !errors.lastName }/>
                            </FormGroup>

                            <FormGroup as= { Col } md='6' controlId= 'validationFormik02'>
                                <FormLabel>Prénom : </FormLabel>
                                <Form.Control type= 'text' name= 'firstName' value= { values.firstName } onChange= { handleChange } 
                                              onBlur= { handleBlur } isValid= { touched.firstName && !errors.firstName }>
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

export default MemberCreation;
