import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import GamesList from './components/game/games-list';
import GameCreation from './components/game/game-creation';
import MembersList from './components/member/members-list';
import MemberCreation from './components/member/member-creation';
import LoansList from './components/loan/loans-list';
import LoanCreation from './components/loan/loan-creation';


class Home extends Component {
    render() {
        return (
            <div className='App'>
                <Tabs defaultActiveKey='members' id='main-tab'>
                    <Tab eventKey='members' title='Adhérent.e.s'>
                        <div className='defaultDiv'>
                            <MemberCreation /><MembersList />
                        </div>
                    </Tab>
                    <Tab eventKey='games' title='Jeux'>
                        <div className='defaultDiv'>
                            <GameCreation /><GamesList />
                        </div>
                    </Tab>
                    <Tab eventKey='loans' title='Prêts'>
                        <div className='defaultDiv'>
                            <LoanCreation /><LoansList />
                        </div>
                    </Tab>
                    <Tab eventKey='login' title='Login'>
                        <Link className='nav-link' to={'/sign-in'}> Retour à la connexion</Link>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
export default Home;