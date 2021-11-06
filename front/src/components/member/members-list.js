import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableView from '../views/table-view';


export default function MembersList() {

  const [members, setMembers] = useState([]);

  const processData = React.useCallback(() => {
    if (Array.isArray(members) === true) {
      return members.map(d => {
        return ({
          memberId: d._id,
          memberFirstName: d.firstName,
          memberLastName: d.lastName,
          memberCity: d.city,
          memberEmail: d.email,
        })
      })
    } else {
      return []
    }
  }, [members])

  const data = React.useMemo(() => processData(), [processData])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'memberId',
      },
      {
        Header: 'Prénom',
        accessor: 'memberFirstName',
      },
      {
        Header: 'Nom',
        accessor: 'memberLastName',
      },
      {
        Header: 'Ville',
        accessor: 'memberCity',
      },
      {
        Header: 'Adresse mail',
        accessor: 'memberEmail',
      },
    ],
    []
  )

  useEffect(() => {
    getAllMembers();
  }, []);

  function getAllMembers() {
    axios.get('http://localhost:5000/members')
      .then((response) => {
        setMembers(response.data)
      })
  }

  function deleteAllMembers() {
    axios.delete('http://localhost:5000/member/delete/')
      .then((response) => {
        if (response.status === 200) {
          getAllMembers()
        }
      })
  }

  return (
    <div>
      <h2>Liste des adhérent.e.s :</h2>
      <br />
      <TableView columns={columns} data={data} />
      <br />
      <button onClick={() => getAllMembers()}>Rafraîchir</button>
      <button onClick={() => deleteAllMembers()}>Supprimer tous les membres</button>
    </div>
  )
};

/*
import { Redirect } from 'react-router-dom';

const [shortDisplay] = useState(true);
const [redirect, setRedirect] = useState(null);
const [memberToEdit, setMemberToEdit] = useState({});

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

if (redirect) {
    return <Redirect to={{ pathname: redirect, state: { referrer: memberToEdit } }} />
  }

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
      */