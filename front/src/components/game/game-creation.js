import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, FormGroup, FormLabel, Col, Button } from 'react-bootstrap'


function GameCreation() {

    const [gameToCreate, setGameToCreate] = useState({ name: '', availability: 'Available', authors: '', editor: '', distributor: '', publishYear: 2000, description: '', 
                                                        esarIndexes: '', usualGameLength: 20, minPlayers: 2, maxPlayers: 12, minAge: 2, location: '' })

    const GAMECREATIONSCHEMA = Yup.object().shape({
        name:               Yup.string().max(40, 'Trop long').required('Requis'),
        availability:       Yup.string().max(40, 'Trop long').required('Requis'),
        authors:            Yup.string().max(40, 'Trop long').required('Requis'),
        editor:             Yup.string().max(40, 'Trop long'),
        distributor:        Yup.string().max(40, 'Trop long'),
        publishYear:        Yup.number(),
        description:        Yup.string().max(40, 'Trop long').required('Requis'),
        esarIndexes:        Yup.string().max(40, 'Trop long'),
        usualGameLength:    Yup.number().max(40, 'Trop long').required('Requis'),
        minPlayers:         Yup.number().max(40, 'Trop long').required('Requis'),
        maxPlayers:         Yup.number().max(40, 'Trop long').required('Requis'),
        minAge:             Yup.number(),
        location:           Yup.string()
    });

    function createGame() {
        axios.post('http://localhost:5000/game', {
            game: gameToCreate
        }).then(() => alert('Jeu ajouté : ' + gameToCreate.name + '.'))
    };

    function formSubmitHandler(values) {
        let newGame = {}
        
        newGame.name            = values.name
        newGame.availability    = values.availability
        newGame.authors         = values.authors
        newGame.editor          = values.editor
        newGame.distributor     = values.distributor
        newGame.publishYear     = values.publishYear
        newGame.description     = values.description
        newGame.esarIndexes     = values.esarIndexes
        newGame.usualGameLength = values.usualGameLength
        newGame.minPlayers      = values.minPlayers
        newGame.maxPlayers      = values.maxPlayers
        newGame.minAge          = values.minAge
        newGame.location        = values.location

        setGameToCreate(newGame)
    };
       
    return (
        <div>
            <h2>Ajouter un jeu</h2>
            <br />
            <Formik initialValues=  {{  name: gameToCreate.name,
                                        availability: gameToCreate.availability,
                                        authors: gameToCreate.authors,
                                        editor: gameToCreate.editor,
                                        distributor: gameToCreate.distributor,
                                        publishYear: gameToCreate.publishYear,
                                        description: gameToCreate.description,
                                        esarIndexes: gameToCreate.esarIndexes,
                                        usualGameLength: gameToCreate.usualGameLength,
                                        minPlayers: gameToCreate.minPlayers,
                                        maxPlayers: gameToCreate.maxPlayers,
                                        minAge: gameToCreate.minAge,
                                        location: gameToCreate.location }}
                    validationSchema= { GAMECREATIONSCHEMA }
                    onSubmit= { async (values) => { await formSubmitHandler(values)
                                                          createGame() }}
            >
            {({ handleSubmit, handleChange,
                values, touched, errors, 
            }) => (
                <Form noValidate onSubmit= { handleSubmit }>
                    <Form.Row>
                        <FormGroup as= { Col } md='8' controlId= 'validationFormik01'>
                            <FormLabel>Nom du jeu : </FormLabel>
                            <Form.Control type= 'text' name= 'name' value= { values.name } onChange= { handleChange }
                                            isValid= { touched.name && !errors.name }/>
                        </FormGroup>

                        <FormGroup as= { Col } md='8' controlId= 'validationFormik02'>
                            <FormLabel>Localisation : </FormLabel>
                            <Form.Control type= 'text' name= 'location' value= { values.location } onChange= { handleChange } 
                                            isValid= { touched.location && !errors.location }>
                            </Form.Control>
                        </FormGroup>
                    </Form.Row>

                    <FormGroup as= { Col } md='8' controlId= 'validationFormik03'>
                        <FormLabel>Disponibilité : </FormLabel>
                        <Form.Control as= 'select' name= 'availability' value= { values.availability } onChange= { handleChange } 
                                        isValid= { touched.availability && !errors.availability }>
                            <option value= 'Available'>Disponible</option>
                            <option value= 'InRepair'>En réparation</option>
                            <option value= 'Loaned'>Prêté</option>
                        </Form.Control>
                    </FormGroup>
                    
                    <Form.Row>
                        <FormGroup as= { Col } md='4' controlId= 'validationFormik04'>
                            <FormLabel>Distribué par : </FormLabel>
                            <Form.Control type= 'text' name= 'distributor' value= { values.distributor } onChange= { handleChange } 
                                            isValid= { touched.distributor && !errors.distributor }>
                            </Form.Control>
                        </FormGroup>                    
                        <FormGroup as= { Col } md='4' controlId= 'validationFormik05'>
                            <FormLabel>Édité par : </FormLabel>
                            <Form.Control type= 'text' name= 'editor' value= { values.editor } onChange= { handleChange } 
                                            isValid= { touched.editor && !errors.editor }>
                            </Form.Control>
                        </FormGroup>
                        <FormGroup as= { Col } md='4' controlId= 'validationFormik06'>
                            <FormLabel>Créé par : </FormLabel>
                            <Form.Control type= 'text' name= 'authors' value= { values.authors } onChange= { handleChange } 
                                            isValid= { touched.authors && !errors.authors }>
                            </Form.Control>
                        </FormGroup>
                    </Form.Row>

                    <Form.Row>
                        <FormGroup as= { Col } md='6' controlId= 'validationFormik07'>
                            <FormLabel>Nombre minimum de joueurs : </FormLabel>
                            <Form.Control type= 'text' name= 'minPlayers' value= { values.minPlayers } onChange= { handleChange } 
                                            isValid= { touched.minPlayers && !errors.minPlayers }>
                            </Form.Control>
                        </FormGroup>
                        <FormGroup as= { Col } md='6' controlId= 'validationFormik08'>
                            <FormLabel>Nombre maximum de joueurs : </FormLabel>
                            <Form.Control type= 'text' name= 'maxPlayers' value= { values.maxPlayers } onChange= { handleChange } 
                                            isValid= { touched.maxPlayers && !errors.maxPlayers }>
                            </Form.Control>
                        </FormGroup>
                    </Form.Row>

                    <FormGroup as= { Col } md='14' controlId= 'validationFormik09'>
                        <FormLabel>Description : </FormLabel>
                        <Form.Control as= 'textarea' rows= '3' name= 'description' value= { values.description } onChange= { handleChange } 
                                        isValid= { touched.description && !errors.description }>
                        </Form.Control>
                    </FormGroup>

                    <Form.Row>
                        <FormGroup as= { Col } md='3' controlId= 'validationFormik10'>
                            <FormLabel>Année de publication : </FormLabel>
                            <Form.Control type= 'text' name= 'publishYear' value= { values.publishYear } onChange= { handleChange } 
                                            isValid= { touched.publishYear && !errors.publishYear }>
                            </Form.Control>
                        </FormGroup>                    
                        <FormGroup as= { Col } md='3' controlId= 'validationFormik11'>
                            <FormLabel>Indexes ESAR : </FormLabel>
                            <Form.Control type= 'text' name= 'esarIndexes' value= { values.esarIndexes } onChange= { handleChange } 
                                            isValid= { touched.esarIndexes && !errors.esarIndexes }>
                            </Form.Control>
                        </FormGroup>
                        <FormGroup as= { Col } md='3' controlId= 'validationFormik12'>
                            <FormLabel>Temps de jeu moyen : </FormLabel>
                            <Form.Control type= 'text' name= 'usualGameLength' value= { values.usualGameLength } onChange= { handleChange } 
                                            isValid= { touched.usualGameLength && !errors.usualGameLength }>
                            </Form.Control>
                        </FormGroup>
                        <FormGroup as= { Col } md='3' controlId= 'validationFormik12'>
                            <FormLabel>Age conseillé : </FormLabel>
                            <Form.Control type= 'text' name= 'minAge' value= { values.minAge } onChange= { handleChange } 
                                            isValid= { touched.minAge && !errors.minAge }>
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

export default GameCreation;
