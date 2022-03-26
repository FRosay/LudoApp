import React from 'react';
import PropTypes from 'prop-types'
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

HomeMenuButton.propTypes={
    link:PropTypes.string.isRequired,
    image:PropTypes.string.isRequired,
    alt:PropTypes.string.isRequired,
    text:PropTypes.string.isRequired,
}

HomeMenuButton.defaultProps={
    alt:'Texte alternatif non fourni'
}

export default HomeMenuButton;