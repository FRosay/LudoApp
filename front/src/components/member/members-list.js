import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TableView from '../views/TableView';
import ModalView from '../views/modal-view';
import { Sorter } from "../../utils/TableDataSorter";

export default function MembersList() {

  const [members, setMembers] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [memberToEdit, setMemberToEdit] = useState({});
  const [memberToDetail, setMemberToDetail] = useState({});
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
          memberDetail: <button onClick={() => {setMemberToDetail(d); setModalShow(true)}}>Details</button>,
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
        title: '',
        dataIndex: 'memberDetail',
      },
      {
        title: 'Id',
        dataIndex: 'memberId',
      },
      {
        title: 'Prénom',
        dataIndex: 'memberFirstName',
        sorter: { compare: Sorter.DEFAULT, }
      },
      {
        title: 'Nom',
        dataIndex: 'memberLastName',
        sorter: { compare: Sorter.DEFAULT, }
      },
      {
        title: 'Ville',
        dataIndex: 'memberCity',
        sorter: { compare: Sorter.DEFAULT, }
      },
      {
        title: 'Adresse mail',
        dataIndex: 'memberEmail',
        sorter: { compare: Sorter.DEFAULT, }
      },
      {
        title: '',
        dataIndex: 'memberEditButton',
      },
      {
        title: '',
        dataIndex: 'memberDeleteButton',
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
        <ModalView
          show={modalShow}
          onHide={() => setModalShow(false)}
          heading={'Fiche d\'adhérent.e'}
          title={memberToDetail.firstName + ' ' + memberToDetail.lastName}
          text={'TO DO : afficher la cotisation, conditions d\'adhésion etc.'}
        />
        <h2>Liste des adhérent.e.s :</h2>
        <br />
        <TableView rowKey='memberId' columns={columns} data={data} />
        <br />
        <button onClick={() => getAllMembers()}>Rafraîchir</button>
        <button onClick={() => deleteAllMembers()}>Supprimer tous les membres</button>
      </div>
    )
  }
};