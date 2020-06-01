import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { motion } from 'framer-motion'

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, FormGroup, FormLabel, Col, Button } from 'react-bootstrap'


const formErrorTextAnimation = {
    open: { opacity: [0, 0,5, 1] },
    closed: { opacity: [1, 0.5, 0] },
    transition: { duration: 1.2 }
}

const loginSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, "Nom d'utilisateur trop court")
        .max(20, "Nom d'utilisateur trop long.")
        .required("Nom d'utilisateur requis."),
    password: Yup.string()
        .required('Mot de passe requis.'),
});

class Login extends Component {

    constructor(props) {

        super(props)
        this.state = {
            redirect: null
        }

        this.login = this.login.bind(this)              
    }

    login(values) {
        if (values.username === 'test' && values.password === 'test') {
            this.setState({
                redirect: '/home'
            })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to= {this.state.redirect} />
        }
        return (
            <div className='auth-wrapper'>
                <nav className='navbar navbar-expand-lg navbar-light fixed-top'>
                    <div className='container'>
                        <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
                            <ul className='navbar-nav ml-auto'>
                                <li className='nav-item'>
                                    <Link className= 'nav-link' to= { '/home' }>Voir le site</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <motion.div animate= {{ y: [-400, -180, 50, -70, 25, -35, 12, -17, 0] }} transition= {{ duration: 0.9 }} >
                    <div className='auth-inner' >
                        <h1>Ludogiciel</h1>
                    </div>
                    
                    <div className='auth-inner'>
                        <h3>Connexion</h3>
                        <Formik
                            initialValues= {{ username: '', password: '' }}
                            validationSchema= { loginSchema }
                            validateOnBlur= { false }
                            validateOnChange= { false }
                            onSubmit= {(values, { setSubmitting }) => {
                                setSubmitting(true)
                                this.login(values)
                                setSubmitting(false)
                            }}
                        >
                            {({ values, errors, isSubmitting,
                                handleChange, handleBlur, handleSubmit,
                            }) => (
                                <Form onSubmit= { handleSubmit }>

                                    <FormGroup as= { Col } controlId= 'validationFormik01'>
                                        <FormLabel>Nom d'utilisateur</FormLabel>
                                        <Form.Control type= 'text' name= 'username' value= { values.username } onChange= { handleChange } 
                                                    onBlur= { handleBlur } placeholder= 'Exemple : FRosay'/>
                                        <motion.div animate= { errors.username ? 'open' : 'closed' } transition= { 'transition' } variants= { formErrorTextAnimation } > 
                                            <p className='form-error-text'>{ errors.username }</p>
                                        </motion.div> 
                                    </FormGroup>

                                    <FormGroup as= { Col } controlId= 'validationFormik02'>
                                        <FormLabel>Mot de passe</FormLabel>
                                        <Form.Control type= 'password' name= 'password' value= { values.password } onChange= { handleChange }
                                                    onBlur= { handleBlur } placeholder= 'Exemple : Ch4u$$ette !'/>
                                        <motion.div animate= { errors.password ? 'open' : 'closed' } transition= {{ duration: 1 }} variants= { formErrorTextAnimation }>
                                            <p className='form-error-text'>{ errors.password }</p>
                                        </motion.div> 
                                    </FormGroup>
                                    <br />
                                    <Button type= 'submit' className='btn btn-primary btn-block' disabled= { isSubmitting }>Se connecter</Button>
                                    <p className='forgot-password text-right'>Mot de passe oublié ?</p>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </motion.div>
            </div>
        );
    }
}
export default Login;