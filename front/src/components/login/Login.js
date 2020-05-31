import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { motion } from 'framer-motion'


class Login extends Component {

    constructor(props) {

        super(props)
        this.state = {
            username: null,
            password: null,
            redirect: null
        }

        this.formSubmitHandler = this.formSubmitHandler.bind(this)
        this.formChangeHandler = this.formChangeHandler.bind(this)
    }


    formChangeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;

        switch (name) {
            case 'username':
                this.setState({ username: value });
                break;
            case 'password':
                this.setState({ password: value });
                break;
            default:
                
                break;
        }
    };

    formSubmitHandler(e) {
        e.preventDefault();
        if (this.state.username === 'test' && this.state.password === 'test') {
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
            <motion.div
                className="auth-wrapper"
                initial= {{ ocacity: 0 }}
                animate= {{ opacity: 1 }}
                exit= {{ opacity: 0}}>
                <div className="auth-inner">
                    <form onSubmit= { this.formSubmitHandler }>
                        <h3>Connexion</h3>
                        
                        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                            <div className="container">
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/home"}>Voir le site</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div className="form-group">
                            <label>Nom d'utilisateur</label>
                            <input  type="username" name= 'username' className="form-control" 
                                    placeholder="Entrez votre nom d'utilisateur" onChange= { this.formChangeHandler } />
                        </div>

                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input  type="password" name= 'password' className="form-control" 
                                    placeholder="Entrez votre mot de passe" onChange= { this.formChangeHandler } />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                        <p className="forgot-password text-right">Mot de passe oublié ?</p>
                    </form>
                </div>
            </motion.div>
        );
    }
}
export default Login;