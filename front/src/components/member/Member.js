import React from 'react';


class Member extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      memberId: this.props.memberId,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      fullName: (this.props.firstName + ' ' + this.props.lastName)
    }

  }

  render () {
    return (
        <div>
            <p>Prénom(s) : { this.state.firstName }</p>
            <p>Nom : { this.state.lastName }</p>
        </div>
    )
  }
}

export default Member;