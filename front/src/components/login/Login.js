import React, { Component } from "react";


class Login extends Component {
    render() {
        return (
            <form>
                <h3>Connexion</h3>

                <div className="form-group">
                    <label>Utilisateur</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <br />
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Mot de passe oublié ?
                </p>
            </form>
        );
    }
}
export default Login;