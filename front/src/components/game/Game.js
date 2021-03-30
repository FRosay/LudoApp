import React, { useState } from 'react';


function Game(props) {

    const [game] = useState({gameId: props.gameId, name: props.name, availability: props.availability, gameType: props.gameType, 
                                      editor: props.editor, author: props.author, description: props.description,});


    let availability = ''

    switch (game.availability) {
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
            <p>Nom : { game.name }</p>
            <p>
              Statut : { availability } <br />
              Type : { game.gameType }
            </p>
            <p>
              Edité par : { game.editor } <br />
              Créé par : { game.author }
            </p>
            <p>Description : { game.description }</p>
            <br/>
        </div>
    )
}

export default Game;