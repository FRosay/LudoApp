import React from 'react';


class MembershipInfo extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      contribution: this.props.contribution,
      contributionRate: this.props.contributionRate,
    }

  }

  render () {
    return (
        <div>
            <p>Cotisation : { this.state.contribution } €</p>
            <p>Taux de cotisation : { this.state.contributionRate }</p>
        </div>
    )
  }
}

export default MembershipInfo;