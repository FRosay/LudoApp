import React from 'react';
import axios from 'axios';


class GameCreation extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            gameToCreate: {availability: 'Available'}
        }

        this.createGame = this.createGame.bind(this)
        this.formChangeHandler = this.formChangeHandler.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
    }

    createGame() {
        axios.post('http://localhost:5000/game', {
            game: this.state.gameToCreate
        }).then(() => alert('Jeu ajouté : ' + this.state.gameToCreate.name + '.'))
    };

    formChangeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        let newGame = this.state.gameToCreate;

        switch (name) {
            case 'name':
                newGame.name = value
                break;
            case 'availability':
                newGame.availability = value
                break;
            case 'gameType':
                newGame.gameType = value
                break;
            case 'editor':
                newGame.editor = value
                break;
            case 'author':
                newGame.author = value
                break;
            case 'description':
                newGame.description = value
                break;
            default:
                
                break;
        }

        this.setState({ gameToCreate: newGame });
    };

    formSubmitHandler(e) {
        e.preventDefault();
        if (this.state.gameToCreate.availability === undefined) {
            let newGame = this.state.gameToCreate;
            newGame.availability = 'Available'
            this.setState({ gameToCreate: newGame });
        }
        this.createGame()
    };

    render () {
        let newGame = this.state.gameToCreate
        
        return (
            <form onSubmit= { this.formSubmitHandler }>
                <p>Nom du jeu :</p>
                <input
                    type= 'text'
                    name= 'name'
                    onChange= { this.formChangeHandler }
                />
                <br/>
                <p>Type de jeu :</p>
                <input
                    type= 'text'
                    name= 'gameType'
                    onChange= { this.formChangeHandler }
                />
                <br/>
                <p>Édité par :</p>
                <input
                    type= 'text'
                    name= 'editor'
                    onChange= { this.formChangeHandler }
                />
                <br/>
                <p>Créé par :</p>
                <input
                    type= 'text'
                    name= 'author'
                    onChange= { this.formChangeHandler }
                />
                <br/>
                <p>Description :</p>
                <input
                    type= 'text'
                    name= 'description'
                    onChange= { this.formChangeHandler }
                />
                <br/>

                <p>Disponibilité :</p>
                <select value= { newGame.availability }
                        onChange= { this.formChangeHandler }
                        name= 'availability'>
                    <option value= 'Available'>Disponible</option>
                    <option value= 'InRepair'>En réparation</option>
                    <option value= 'Loaned'>Prêté</option>
                </select>

                <br/> <br/>
                
                <input type= 'submit' />
            </form>
        )
    };
};

export default GameCreation;
