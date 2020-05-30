import React from 'react';
import axios from 'axios';


class MemberCreation extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            memberToCreate: {firstName: '', lastName: ''}
        }

        this.createMember = this.createMember.bind(this)
        this.formChangeHandler = this.formChangeHandler.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
    }

    createMember() {
        axios.post('http://localhost:5000/member', {
            member: this.state.memberToCreate
        }).then(() => alert('Membre ajouté : ' + this.state.memberToCreate.firstName + ' ' + this.state.memberToCreate.lastName + '.'))
    };

    formChangeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        let newMember = this.state.memberToCreate;

        switch (name) {
            case 'firstName':
                newMember.firstName = value
                break;
            case 'lastName':
                newMember.lastName = value
                break;
            default:
                
                break;
        }

        this.setState({ memberToCreate: newMember });
    };

    formSubmitHandler(e) {
        e.preventDefault();
        this.createMember()
    };

  render () {    
    return (
        <div>
            <h2>Ajouter un.e adhérent.e</h2>
            <form onSubmit= { this.formSubmitHandler }>
                <p>Prénom de l'adhérent.e :</p>
                <input
                    type= 'text'
                    name= 'firstName'
                    onChange= { this.formChangeHandler }
                />
                <br/>
                <p>Nom de l'adhérent.e :</p>
                <input
                    type= 'text'
                    name= 'lastName'
                    onChange= { this.formChangeHandler }
                />

                <br/> <br/>
                
                <input type= 'submit' />
            </form>
        </div>
    )
  };
 
};

export default MemberCreation;
