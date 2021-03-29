import React from 'react';

import Member from '../../assets/images/Member.png';
import MembersList from '../../assets/images/membersList.png';
import AddGame from '../../assets/images/addGame.png';
import GamesList from '../../assets/images/gamesList.png';
import Login from '../../assets/images/login.png';
import HomeMenuButton from '../misc/home-menu-button.js';

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
                <HomeMenuButton text='Retour à la connexion' alt='Retour à la connexion' image={ Login } link='/login' />
            </div>
        </div>
    )
}

export default Home;