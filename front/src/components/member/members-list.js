import React, { useState } from 'react';
import axios from 'axios';
import Member from './Member';


function MembersList() {

  const [members, setMembers] = useState([]);
  const [getAll, setGetAll] = useState(true);
  const [shortDisplay] = useState(true);

  function getAllMembers() {
    return new Promise(() => {
      axios.get('http://localhost:5000/members')
        .then((response) => {
          setMembers(response.data)
      })
    })
  }

  function deleteAllMembers() {
    axios.delete('http://localhost:5000/member/delete/');
  }

  if (getAll === true) {
    getAllMembers()
    setGetAll(false)
  }

    return (
      <div>
        <h2>Liste des adhérent.e.s :</h2>
        <br/>
        {members.map((member, index) => {
          return  <Member key= { index } shortDisplay= { shortDisplay } memberId= { member._id } firstName= { member.firstName } lastName= { member.lastName } 
                          adress= { member.adress } postalCode= { member.postalCode } city= { member.city } 
                          phoneHome= { member.phoneHome } phoneMobile= { member.phoneMobile } email= { member.email } 
                          contribution= { member.contribution } contributionRate= { member.contributionRate }>
                  </Member>
        })}
        <br/>
        <button onClick= { () => getAllMembers() }>Rafraîchir</button>
        <button onClick= { () => deleteAllMembers() }>Supprimer tous les membres</button>
      </div>
    )
}

export default MembersList;
