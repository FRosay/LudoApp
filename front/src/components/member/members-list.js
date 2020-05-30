import React from 'react';
import axios from 'axios';
import Member from './Member';


class MembersList extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      members: []
    }

    this.getAllMembers = this.getAllMembers.bind(this)
    this.deleteAllMembers = this.deleteAllMembers.bind(this)

    this.getAllMembers()
  }

  
  getAllMembers() {
    return new Promise(() => {
      axios.get('http://localhost:5000/members')
        .then((response) => {
          console.log(response.data)
          this.setState({
            members: response.data
          })
      })
    })
  }

  deleteAllMembers() {
    axios.delete('http://localhost:5000/member/delete/')
  }

  render () {
    return (
      <div>
        <h1>Tous les membres :</h1>
        <br/>
        {this.state.members.map((member, index) => {
          return <Member key= { index } memberId= { member._id } firstName= { member.firstName } lastName= { member.lastName }></Member>
        })}
        <br/>
        <button onClick= { () => this.getAllMembers() }>Rafraîchir</button>
        <button onClick= { () => this.deleteAllMembers() }>Supprimer tous les membres</button>
      </div>
    )
  }
 
}

export default MembersList;