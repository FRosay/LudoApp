import React from 'react';
import axios from 'axios';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, FormGroup, FormLabel, Col, Button } from 'react-bootstrap'



const GAMECREATIONSCHEMA = Yup.object().shape({
    firstName: Yup.string()
        .max(40, 'Trop long')
        .required('Requis'),
    lastName: Yup.string()
        .max(40, 'Trop long')
        .required('Requis'),
});

class MemberCreation extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            memberToCreate: {memberNumber: 1, firstName: '', lastName: ''}
        }

        this.createMember = this.createMember.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
        
        this.setMemberNumber()
    }

    createMember() {
        axios.post('http://localhost:5000/member', {
            member: this.state.memberToCreate
        }).then(() => { this.setMemberNumber() })
          .then(() => alert('Membre ajouté : ' + this.state.memberToCreate.firstName + ' ' + this.state.memberToCreate.lastName + '.'))
    };

    setMemberNumber() {
        axios.get('http://localhost:5000/member/getlastnumber').then((response) => {
            if (response.data !== null && response.data.memberNumber !== undefined) {
                let newMember = this.state.memberToCreate
                newMember.memberNumber = response.data.memberNumber + 1

                this.setState({ memberToCreate: newMember })
            }
        })
    }

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
            <br />
            <p>Numéro d'adhérent.e : { this.state.memberToCreate.memberNumber !== null ? this.state.memberToCreate.memberNumber : '?' }</p>
            <Formik initialValues=  {{  firstName: '',
                                        lastName: '' }}
                    validateOnBlur= { false }
                    validateOnChange= { false }
                    validationSchema= { GAMECREATIONSCHEMA }
                    onSubmit= { async (values, { resetForm }) => { await this.formSubmitHandler(values)
                                                                              resetForm() }}
            >
                {({ handleSubmit, handleChange, handleBlur, values 
                }) => (
                    <Form noValidate onSubmit= { handleSubmit }>
                        <Form.Row>
                            <FormGroup as= { Col } md='8' controlId= 'validationFormik01'>
                                <FormLabel>Nom : </FormLabel>
                                <Form.Control type= 'text' name= 'lastName' value= { values.lastName } 
                                              onChange= { handleChange } onBlur= { handleBlur } />
                            </FormGroup>

                            <FormGroup as= { Col } md='8' controlId= 'validationFormik02'>
                                <FormLabel>Prénom : </FormLabel>
                                <Form.Control type= 'text' name= 'firstName' value= { values.firstName } 
                                              onChange= { handleChange } onBlur= { handleBlur }>
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
