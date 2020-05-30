import React, { Component } from "react";
import { Link } from "react-router-dom";


class Login extends Component {
    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
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
                            <input type="email" className="form-control" placeholder="Entrez votre nom d'utilisateur" />
                        </div>

                        <div className="form-group">
                            <label>Mot de passe</label>
                            <input type="password" className="form-control" placeholder="Entrez votre mot de passe" />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                        <p className="forgot-password text-right">
                            Mot de passe oublié ?
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;