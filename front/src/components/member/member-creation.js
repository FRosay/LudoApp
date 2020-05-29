import React from 'react';
import axios from 'axios';
import Member from './Member';


class MemberCreation extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            memberToCreate: new Member(),
        }

        this.createMember = this.createMember.bind(this)
        this.formChangeHandler = this.formChangeHandler.bind(this)
        this.formSubmitHandler = this.formSubmitHandler.bind(this)
    }

    createMember() {
        axios.post('http://localhost:5000/member', {
            member: this.state.memberToCreate
        }).then(() => alert('Jeu ajouté : ' + this.state.memberToCreate.name + '.'))
    };

    formChangeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        let newMember = this.state.memberToCreate;

        switch (name) {
            case 'name':
                newMember.name = value
                break;
            case 'availability':
                newMember.availability = value
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
    let newMember = this.state.memberToCreate
    
    return (
      <form onSubmit= { this.formSubmitHandler }>
        <p>Prénom(s) :</p>
        <input
            type= 'text'
            name= 'firstName'
            onChange= { this.formChangeHandler }
        />
        <p>Nom de famille :</p>
        <input
            type= 'text'
            name= 'lastName'
            onChange= { this.formChangeHandler }
        />
        <br/> <br/>

        <p>Disponibilité :</p>
        <select value= { newMember.availability }
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

export default MemberCreation;
