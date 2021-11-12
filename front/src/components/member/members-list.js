import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TableView from '../views/table-view';
import ModalPopup from '../views/modal-view';


export default function MembersList() {

  const [members, setMembers] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [memberToEdit, setMemberToEdit] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const editMember = React.useCallback((member) => {
    setMemberToEdit(member)
    setRedirect('/addMember')
  }, []);

  const deleteOneMember = React.useCallback((memberId) => {
    axios.delete('http://localhost:5000/member/delete/', { data: { memberId: memberId } })
      .then((response) => {
        if (response.status === 200) {
          getAllMembers()
        }
      })
  }, []);

  const processData = React.useCallback(() => {
    if (Array.isArray(members) === true) {
      return members.map(d => {
        return ({
          _id: d._id,
          memberDetail: <button onClick={() => setModalShow(true)}>Details</button>,
          memberId: d._id,
          memberFirstName: d.firstName,
          memberLastName: d.lastName,
          memberCity: d.city,
          memberEmail: d.email,
          memberEditButton: <button onClick={() => editMember(d)}>Modifier</button>,
          memberDeleteButton: <button onClick={() => deleteOneMember(d._id)}>Supprimer</button>
        })
      })
    } else {
      return []
    }
  }, [members, editMember, deleteOneMember])

  const data = React.useMemo(() => processData(), [processData])

  const columns = React.useMemo(
    () => [
      {
        Header: '_id',
        accessor: '_id',
      },
      {
        Header: '',
        accessor: 'memberDetail',
      },
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
      {
        Header: '',
        accessor: 'memberEditButton',
      },
      {
        Header: '',
        accessor: 'memberDeleteButton',
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

  if (redirect) {
    return <Redirect to={{ pathname: redirect, state: { referrer: memberToEdit } }} />
  } else {
    return (
      <div>
        <ModalPopup
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <h2>Liste des adhérent.e.s :</h2>
        <br />
        <TableView columns={columns} data={data} />
        <br />
        <button onClick={() => getAllMembers()}>Rafraîchir</button>
        <button onClick={() => deleteAllMembers()}>Supprimer tous les membres</button>
      </div>
    )
  }
};