import React from 'react';
import axios from 'axios';


class Member extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      members: []
    }

    this.getAllMembers()
  }

  getAllMembers() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:5000/members').then(response => {
        resolve(response.data)
      }).catch(e => reject(e))
    })
  }

  render () {

    if (!this.state.member) {
      return null
    }
    return (  
      <div>
        <h1>Tous les adhérent.e.s :</h1>
        <br/>
          {this.state.members.map((member, index) => {
            return <Member key={index} firstName={member.firstName} lastName={member.lastName}></Member>
          })}
    </div>
    )
  }
 
}

export default Member;
