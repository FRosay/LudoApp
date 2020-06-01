import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, FormGroup, FormLabel, Col, Button } from 'react-bootstrap'


class GameCreation extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            gameToCreate: { availability: 'Available' }
        }

        this.createGame = this.createGame.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
    
        // eslint-disable-next-line
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
    }

    createGame() {
        axios.post('http://localhost:5000/game', {
            game: this.state.gameToCreate
        }).then(() => alert('Jeu ajouté : ' + this.state.gameToCreate.name + '.'))
    };

    formSubmitHandler(values) {
        
        let newGame = this.state.gameToCreate
        newGame.name = values.name
        newGame.gameType = values.gameType
        newGame.availability = values.availability
        newGame.author = values.author
        newGame.editor = values.editor
        newGame.description = values.description

        this.createGame()
    };

    render () {        
        return (
            <div>
                <h2>Ajouter un jeu</h2>
                <br />
                <Formik initialValues=  {{ name: '',
                                        availability: this.state.gameToCreate.availability,
                                        gameType: '',
                                        editor: '',
                                        author: '',
                                        description: '', }}
                        validationSchema= { this.GAMECREATIONSCHEMA }
                        onSubmit= { values => { this.formSubmitHandler(values) }}
                >
                {({ handleSubmit, handleChange, handleBlur,
                    values, touched, isValid, errors, 
                }) => (
                    <Form noValidate onSubmit= { handleSubmit }>
                        <Form.Row>
                            <FormGroup as= { Col } md='8' controlId= 'validationFormik01'>
                                <FormLabel>Nom du jeu : </FormLabel>
                                <Form.Control type= 'text' name= 'name' value= { values.name } onChange= { handleChange } 
                                              isValid= { touched.lastName && !errors.lastName }/>
                            </FormGroup>

                            <FormGroup as= { Col } md='8' controlId= 'validationFormik02'>
                                <FormLabel>Type de jeu : </FormLabel>
                                <Form.Control type= 'text' name= 'gameType' value= { values.gameType } onChange= { handleChange } 
                                              isValid= { touched.lastName && !errors.lastName }>
                                </Form.Control>
                            </FormGroup>
                        </Form.Row>

                        <FormGroup as= { Col } md='8' controlId= 'validationFormik03'>
                            <FormLabel>Disponibilité : </FormLabel>
                            <Form.Control as= 'select' name= 'availability' value= { values.availability } onChange= { handleChange } 
                                          isValid= { touched.lastName && !errors.lastName }>
                                <option value= 'Available'>Disponible</option>
                                <option value= 'InRepair'>En réparation</option>
                                <option value= 'Loaned'>Prêté</option>
                            </Form.Control>
                        </FormGroup>

                        <Form.Row>
                            <FormGroup as= { Col } md='8' controlId= 'validationFormik04'>
                                <FormLabel>Créé par : </FormLabel>
                                <Form.Control type= 'text' name= 'author' value= { values.author } onChange= { handleChange } 
                                                isValid= { touched.lastName && !errors.lastName }>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup as= { Col } md='8' controlId= 'validationFormik05'>
                                <FormLabel>Édité par : </FormLabel>
                                <Form.Control type= 'text' name= 'editor' value= { values.editor } onChange= { handleChange } 
                                                isValid= { touched.lastName && !errors.lastName }>
                                </Form.Control>
                            </FormGroup>
                        </Form.Row>

                        <FormGroup as= { Col } md='14' controlId= 'validationFormik06'>
                            <FormLabel>Description : </FormLabel>
                            <Form.Control as= 'textarea' rows= '3' name= 'description' value= { values.description } onChange= { handleChange } 
                                            isValid= { touched.lastName && !errors.lastName }>
                            </Form.Control>
                        </FormGroup>

                        <Button variant="primary" type='submit'>Créer</Button>
                    </Form>
                )}        
                </Formik>
            </div>
        )
    };
};

export default GameCreation;
