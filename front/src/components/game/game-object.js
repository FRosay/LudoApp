import React from 'react';


class Game extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      name: null,
      availability: 'Available'
    }

  }

  render () {
    let availability = ''

    switch (this.state.availability) {
        case 'Available':
          availability = 'Disponible'
          break;
        
        case 'InRepair':
          availability = 'En réparations'
          break;

        case 'Loaned':
          availability = 'Prêté'
          break;
          
        default:
          availability = ''
          break;
    }

    return (
        <div>
            <h2>{ this.state.concept.name }</h2>
            <br/>
            <p>Statut : { availability }</p>
        </div>
    )
  }
}

export default Game;