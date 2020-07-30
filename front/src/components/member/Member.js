import React from 'react';


class Member extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      shortDisplay: this.props.shortDisplay ? this.props.shortDisplay : false,
      memberId: this.props.memberId,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      fullName: (this.props.firstName + ' ' + this.props.lastName),
      adress: this.props.adress,
      postalCode: this.props.postalCode,
      city: this.props.city,
      phoneHome: this.props.phoneHome,
      phoneMobile: this.props.phoneMobile,
      email: this.props.email,
      contribution: this.props.contribution,
      contributionRate: this.props.contributionRate,
    }

  }

  render () {
    if (this.state.shortDisplay === true) {
      return (
        <div>
          <p>
            Prénom(s) : { this.state.firstName } <br />
            Nom : { this.state.lastName }
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <p>
            Prénom(s) : { this.state.firstName } <br />
            Nom : { this.state.lastName }
          </p>
          <p>
            Adresse : { this.state.adress } <br />
            Code postal : { this.state.postalCode } <br />
            Ville : { this.state.city }
          </p>
          <p>
            Téléphone fixe : { this.state.phoneHome } <br />
            Téléphone portable : { this.state.phoneMobile } <br />
            Adresse mail : { this.state.email }
          </p>
          <p>
            Cotisation : { this.state.contribution } € <br />
            Taux de cotisation : { this.state.contributionRate }
          </p>
        </div>
      )
    }
  }
}

export default Member;