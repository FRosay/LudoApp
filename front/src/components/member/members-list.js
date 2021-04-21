import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Member from './Member';
import { Redirect } from 'react-router-dom';


function MembersList() {

  const [shortDisplay] = useState(true);
  const [members, setMembers] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [memberToEdit, setMemberToEdit] = useState({});

  useEffect(() => {
    getAllMembers();
  }, []);

  function getAllMembers() {
    axios.get('http://localhost:5000/members')
      .then((response) => {
        setMembers(response.data)
    })
  }

  function editMember(member) {
    setMemberToEdit(member)
    setRedirect('/addMember')
  }

  async function deleteOneMember(memberId) {
      axios.delete('http://localhost:5000/member/delete/', { data: { memberId: memberId } })
      .then((response) => {
        if (response.status === 200) {
          getAllMembers()
        }
      })       
  };

  function deleteAllMembers() {
    axios.delete('http://localhost:5000/member/delete/')
      .then((response) => { 
        if (response.status === 200) {
          getAllMembers() 
        }
      })
  }

  if (redirect) {
    return <Redirect to= {{ pathname: redirect, state: { referrer: memberToEdit } }} />
  }

  return (
    <div>
      <h2>Liste des adhérent.e.s :</h2>
      <br/>
      {members.map((member, index) => {
        return  <div key= { index }>
                  <Member key= { member._id } shortDisplay= { shortDisplay } memberId= { member._id } firstName= { member.firstName } lastName= { member.lastName } 
                          adress= { member.adress } postalCode= { member.postalCode } city= { member.city } 
                          phoneHome= { member.phoneHome } phoneMobile= { member.phoneMobile } email= { member.email } 
                          contribution= { member.contribution } contributionRate= { member.contributionRate }>
                  </Member>
                  <button key= { member._id+1 } onClick={ () => deleteOneMember(member._id) }>Supprimer cet.te adhérent.e</button>
                  <button key= { member._id+2 } onClick={ () => editMember(member) }>Modifier cet.te adhérent.e</button>
                </div>
      })}
      <br/>
      <button onClick= { () => getAllMembers() }>Rafraîchir</button>
      <button onClick= { () => deleteAllMembers() }>Supprimer tous les membres</button>
    </div>
  )
}

export default MembersList;