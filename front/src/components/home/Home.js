import React from 'react';

import Member from '../../assets/images/Member.png';
import MembersList from '../../assets/images/membersList.png';
import AddGame from '../../assets/images/addGame.png';
import GamesList from '../../assets/images/gamesList.png';
import AddLoan from '../../assets/images/addLoan.png';
import LoansList from '../../assets/images/loansList.png';
import HomeMenuButton from '../misc/home-menu-button.js';

import './Home.css'

function Home() {
    return (
        <div className='home-container'>
            <div className='home-inner'>
                <HomeMenuButton text='Ajouter un.e adhérent.e' alt='Ajouter un.e adhérent.e' image={ Member } link='/addMember' />
                <HomeMenuButton text='Liste des adhérent.e.s' alt='Liste des adhérent.e.s' image={ MembersList } link='/membersList' />
            </div>
            <div className='home-inner'>
                <HomeMenuButton text='Ajouter un jeu' alt='Ajouter un jeu' image={ AddGame } link='/addGame' />
                <HomeMenuButton text='Liste des jeux' alt='Liste des jeux' image={ GamesList } link='/gamesList' />
            </div>
            <div className='home-inner'>
                <HomeMenuButton text='Déclarer un prêt' alt='Déclarer un prêt' image={ AddLoan } link='/addLoan' />
                <HomeMenuButton text='Voir les prêts' alt='Voir les prêts' image={ LoansList } link='/loansList' />
            </div>
        </div>
    )
}

export default Home;