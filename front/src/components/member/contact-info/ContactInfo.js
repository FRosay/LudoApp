import React from 'react';


class ContactInfo extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      phoneHome: this.props.phoneHome,
      phoneMobile: this.props.phoneMobile,
      email: this.props.email,
    }

  }

  render () {
    return (
        <div>
            <p>Téléphone fixe : { this.state.phoneHome }</p>
            <p>Téléphone portable : { this.state.phoneMobile }</p>
            <p>Adresse mail : { this.state.email }</p>
        </div>
    )
  }
}

export default ContactInfo;