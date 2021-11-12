import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, FormGroup, FormLabel, Col, Button } from 'react-bootstrap'


function GameCreation(props) {

    const GAMECREATIONSCHEMA = Yup.object().shape({
        name: Yup.string().max(40, 'Trop long')/*.required('Requis')*/,
        availability: Yup.string().max(40, 'Trop long')/*.required('Requis')*/,
        authors: Yup.string().max(40, 'Trop long')/*.required('Requis')*/,
        editor: Yup.string().max(40, 'Trop long'),
        distributor: Yup.string().max(40, 'Trop long'),
        publishYear: Yup.number(),
        description: Yup.string().max(40, 'Trop long')/*.required('Requis')*/,
        esarIndexes: Yup.string().max(40, 'Trop long'),
        usualGameLength: Yup.number().max(40, 'Trop long')/*.required('Requis')*/,
        minPlayers: Yup.number().max(40, 'Trop long')/*.required('Requis')*/,
        maxPlayers: Yup.number().max(40, 'Trop long')/*.required('Requis')*/,
        minAge: Yup.number(),
        location: Yup.string()
    });
    const [currentGame, setCurrentGame] = useState(props.location.state ? props.location.state.referrer : {})
    const [createOrEdit, setCreateOrEdit] = useState('')

    useEffect(() => {
        if (props.location.state) {
            setCreateOrEdit('Modifier')
        } else {
            setCreateOrEdit('Créer')
        };
    }, [props.location.state]);

    function createOrModifyGame(newGame) {
        axios.put('http://localhost:5000/game', { game: newGame })
            .then((response) => {
                if (response.status === 200) {
                    if (createOrEdit === 'Créer') {
                        alert('Jeu ajouté : ' + newGame.name + '.')
                    } else {
                        alert('Jeu modifié : ' + newGame.name + '.')
                    };
                }
                console.log(response)
            })
    };

    function formSubmitHandler(values) {
        let newGame = { ...currentGame }

        newGame.name = values.name
        newGame.availability = values.availability
        newGame.authors = values.authors
        newGame.editor = values.editor
        newGame.distributor = values.distributor
        newGame.publishYear = values.publishYear
        newGame.description = values.description
        newGame.esarIndexes = values.esarIndexes
        newGame.usualGameLength = values.usualGameLength
        newGame.minPlayers = values.minPlayers
        newGame.maxPlayers = values.maxPlayers
        newGame.minAge = values.minAge
        newGame.location = values.location

        setCurrentGame(newGame)
        createOrModifyGame(newGame)
    };

    return (
        <div>
            <h2>Ajouter un jeu</h2>
            <br />
            <Formik initialValues={{
                name: currentGame.name,
                availability: currentGame.availability,
                authors: currentGame.authors,
                editor: currentGame.editor,
                distributor: currentGame.distributor,
                publishYear: currentGame.publishYear,
                description: currentGame.description,
                esarIndexes: currentGame.esarIndexes,
                usualGameLength: currentGame.usualGameLength,
                minPlayers: currentGame.minPlayers,
                maxPlayers: currentGame.maxPlayers,
                minAge: currentGame.minAge,
                location: currentGame.location
            }}
                validationSchema={GAMECREATIONSCHEMA}
                onSubmit={async (values) => { await formSubmitHandler(values) }}
            >
                {({ handleSubmit, handleChange,
                    values, touched, errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row>
                            <FormGroup as={Col} md='8' controlId='validationFormik01'>
                                <FormLabel>Nom du jeu : </FormLabel>
                                <Form.Control type='text' name='name' value={values.name} onChange={handleChange}
                                    isValid={!errors.name} />
                            </FormGroup>

                            <FormGroup as={Col} md='8' controlId='validationFormik02'>
                                <FormLabel>Localisation : </FormLabel>
                                <Form.Control type='text' name='location' value={values.location} onChange={handleChange}
                                    isValid={!errors.location}>
                                </Form.Control>
                            </FormGroup>
                        </Form.Row>

                        <FormGroup as={Col} md='8' controlId='validationFormik03'>
                            <FormLabel>Disponibilité : </FormLabel>
                            <Form.Control as='select' name='availability' value={values.availability} onChange={handleChange}
                                isValid={!errors.availability}>
                                <option value='Available'>Disponible</option>
                                <option value='InRepair'>En réparation</option>
                                <option value='Loaned'>Prêté</option>
                            </Form.Control>
                        </FormGroup>

                        <Form.Row>
                            <FormGroup as={Col} md='4' controlId='validationFormik04'>
                                <FormLabel>Distribué par : </FormLabel>
                                <Form.Control type='text' name='distributor' value={values.distributor} onChange={handleChange}
                                    isValid={!errors.distributor}>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup as={Col} md='4' controlId='validationFormik05'>
                                <FormLabel>Édité par : </FormLabel>
                                <Form.Control type='text' name='editor' value={values.editor} onChange={handleChange}
                                    isValid={!errors.editor}>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup as={Col} md='4' controlId='validationFormik06'>
                                <FormLabel>Créé par (mettre une virgule entre les noms s'il y en a plusieurs): </FormLabel>
                                <Form.Control type='text' name='authors' value={values.authors} onChange={handleChange}
                                    isValid={!errors.authors}>
                                </Form.Control>
                            </FormGroup>
                        </Form.Row>

                        <Form.Row>
                            <FormGroup as={Col} md='6' controlId='validationFormik07'>
                                <FormLabel>Nombre minimum de joueurs : </FormLabel>
                                <Form.Control type='text' name='minPlayers' value={values.minPlayers} onChange={handleChange}
                                    isValid={!errors.minPlayers}>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup as={Col} md='6' controlId='validationFormik08'>
                                <FormLabel>Nombre maximum de joueurs : </FormLabel>
                                <Form.Control type='text' name='maxPlayers' value={values.maxPlayers} onChange={handleChange}
                                    isValid={!errors.maxPlayers}>
                                </Form.Control>
                            </FormGroup>
                        </Form.Row>

                        <FormGroup as={Col} md='14' controlId='validationFormik09'>
                            <FormLabel>Description : </FormLabel>
                            <Form.Control as='textarea' rows='3' name='description' value={values.description} onChange={handleChange}
                                isValid={!errors.description}>
                            </Form.Control>
                        </FormGroup>

                        <Form.Row>
                            <FormGroup as={Col} md='3' controlId='validationFormik10'>
                                <FormLabel>Année de publication : </FormLabel>
                                <Form.Control type='text' name='publishYear' value={values.publishYear} onChange={handleChange}
                                    isValid={!errors.publishYear}>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup as={Col} md='3' controlId='validationFormik11'>
                                <FormLabel>Indexes ESAR : </FormLabel>
                                <Form.Control type='text' name='esarIndexes' value={values.esarIndexes} onChange={handleChange}
                                    isValid={!errors.esarIndexes}>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup as={Col} md='3' controlId='validationFormik12'>
                                <FormLabel>Temps de jeu moyen : </FormLabel>
                                <Form.Control type='text' name='usualGameLength' value={values.usualGameLength} onChange={handleChange}
                                    isValid={!errors.usualGameLength}>
                                </Form.Control>
                            </FormGroup>
                            <FormGroup as={Col} md='3' controlId='validationFormik12'>
                                <FormLabel>Age conseillé : </FormLabel>
                                <Form.Control type='text' name='minAge' value={values.minAge} onChange={handleChange}
                                    isValid={!errors.minAge}>
                                </Form.Control>
                            </FormGroup>
                        </Form.Row>

                        <Button variant="primary" type='submit'>{createOrEdit}</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default GameCreation;
