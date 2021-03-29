import React from 'react';
import { Link } from 'react-router-dom';

import './home-menu-button.css'

function HomeMenuButton(props) {
   
    return (
        <div className='home-menu-button-div'>
            <button className='home-menu-button-button'>
                <Link className='nav-link' to={ props.link }>
                    <img src={ props.image } alt={ props.alt } className='home-menu-button-image' />
                    <div className='home-menu-button-overlay'>
                        <div className='home-menu-button-text'>{ props.text }</div>
                    </div>
                </Link>
            </button>
        </div>
    )
}

export default HomeMenuButton;