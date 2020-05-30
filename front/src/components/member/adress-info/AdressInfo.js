import React from 'react';


class AdressInfo extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      adress: this.props.adress,
      postalCode: this.props.postalCode,
      city: this.props.city,
    }

  }

  render () {
    return (
        <div>
            <p>Adresse : { this.state.adress }</p>
            <p>Code postal : { this.state.postalCode }</p>
            <p>Ville : { this.state.city }</p>
        </div>
    )
  }
}

export default AdressInfo;