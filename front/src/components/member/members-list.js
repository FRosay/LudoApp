import React from 'react';
import axios from 'axios';


class Member extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      member: null
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
            <h1>{this.state.member.name}</h1>
        </div>
    )
  }
 
}

export default Member;
