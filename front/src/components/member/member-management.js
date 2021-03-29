import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MembersList from '../member/members-list';
import MemberCreation from '../member/member-creation';

function MemberManagement() {

const [showedScreen, setShowedScreen] = useState('main')

if (showedScreen === 'main') {
    return (
        <div>
            <div>
                <Link className= 'nav-link' to= { '/addMember' }>Ajouter un.e adhérent.e</Link>
                <button onClick= { () => setShowedScreen('addMember') }>Ajouter un.e adhérent.e</button>
            </div>
            <div>
                <Link className= 'nav-link' to= { '/membersList' }>Liste des adhérent.e.s</Link>
                <button onClick= { () => setShowedScreen('membersList') }>Liste des adhérent.e.s</button>
            </div>
        </div>
      )
} else if (showedScreen === 'addMember') {
    return (
        <MemberCreation />
      )
} else if (showedScreen === 'membersList') {
    return (
        <MembersList />
      )
}
    
}

export default MemberManagement;