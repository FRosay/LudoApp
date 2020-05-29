import React from 'react';


class Member extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      firstName: '',
      lastName: ''
    }

  }

  render () {
    return (
        <div>
            <p>Prénom(s) : { this.state.firstName }</p>
            <br/>
            <p>Nom : { this.state.lastName }</p>
        </div>
    )
  }
}

export default Member;