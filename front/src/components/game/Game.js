import React from 'react';


class Game extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      gameId: this.props.gameId,
      name: this.props.name,
      availability: this.props.availability,
      gameType: this.props.gameType,
      editor: this.props.editor,
      author: this.props.author,
      description: this.props.description,
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
            <p>
              Statut : { availability } <br />
              Type : { this.state.gameType }
            </p>
            <p>
              Edité par : { this.state.editor } <br />
              Créé par : { this.state.author }
            </p>
            <p>Description : { this.state.description }</p>
            <br/>
        </div>
    )
  }
}

export default Game;