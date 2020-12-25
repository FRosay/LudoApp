import React, { Component } from 'react';
import { TabContainer, TabPane, TabContent, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

import GamesList from '../game/games-list';
import GameCreation from '../game/game-creation';
import MembersList from '../member/members-list';
import MemberCreation from '../member/member-creation';
import LoansList from '../loan/loans-list';
import LoanCreation from '../loan/loan-creation';

import './Home.css'


const tabAnimation = {
    in: { opacity: 1.5 },
    out: { opacity: 0 },
    hover: { y: -5 }
}


class Home extends Component {
    render() {
        return (
            <div className= 'home'>
                <TabContainer defaultActiveKey='members' id='main-tab'>
                    <div className= 'navbar'>
                        <Nav variant="tabs" className="tabs-row">
                            <Nav.Item>
                                <motion.div className= 'App' initial= 'out' animate= 'in'
                                            exit= 'out' whileHover= 'hover' variants= { tabAnimation }>
                                    <Nav.Link eventKey="members">Gestion des adhérent.e.s</Nav.Link>
                                </motion.div>
                            </Nav.Item>
                            <Nav.Item>
                                <motion.div className= 'App' initial= 'out' animate= 'in'
                                            exit= 'out' whileHover= 'hover' variants= { tabAnimation }>
                                    <Nav.Link eventKey="games">Gestion des jeux</Nav.Link>
                                </motion.div>
                            </Nav.Item>
                            <Nav.Item>
                                <motion.div className= 'App' initial= 'out' animate= 'in'
                                            exit= 'out' whileHover= 'hover' variants= { tabAnimation }>
                                    <Nav.Link eventKey="loans">Gestion des prêts</Nav.Link>
                                </motion.div>
                            </Nav.Item>
                            <Nav.Item>
                                <motion.div className= 'App' initial= 'out' animate= 'in'
                                            exit= 'out' whileHover= 'hover' variants= { tabAnimation }>
                                    <Nav.Link eventKey="statistics">Statistiques</Nav.Link>
                                </motion.div>
                            </Nav.Item>
                            <Nav.Item>
                                <motion.div className= 'App' initial= 'out' animate= 'in'
                                            exit= 'out' whileHover= 'hover' variants= { tabAnimation }>
                                    <Nav.Link eventKey="settings">Paramètres</Nav.Link>
                                </motion.div>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <TabContent>
                        <TabPane eventKey='members'>
                            <div className= 'main-display'>
                                <div className='tab-inner'>
                                    <MemberCreation />
                                </div>
                                <div className='tab-inner'>
                                    <MembersList />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane eventKey='games'>
                            <div className= 'main-display'>
                                <div className='tab-inner'>
                                    <GameCreation />
                                </div>
                                <div className='tab-inner'>
                                    <GamesList />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane eventKey='loans'>
                            <div className= 'main-display'>
                                <div className='tab-inner'>
                                    <LoanCreation />
                                </div>
                                <div className='tab-inner'>
                                    <LoansList />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane eventKey='statistics'>
                            <div className= 'main-display'>
                                <div className='tab-inner'>
                                    <p>Work in progress</p>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane eventKey='settings'>
                            <div className= 'main-display'>
                                <div className='tab-inner'>
                                    <Link className='nav-link' to={'/login'}> Retour à la connexion</Link>
                                </div>
                            </div>
                        </TabPane>
                    </TabContent>
                </TabContainer>
            </div>
        );
    }
}
export default Home;