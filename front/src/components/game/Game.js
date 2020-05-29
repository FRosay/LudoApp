import React from 'react';


class Game extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      name: this.props.name,
      availability: this.props.availability
    }

  }

  render () {
    // eslint-disable-next-line
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
          availability = '?'
          break;
    }

    return (
        <div>
            <p>Nom : { this.state.name }</p>
            <p>Statut : { availability }</p>
            <br/>
        </div>
    )
  }
}

export default Game;