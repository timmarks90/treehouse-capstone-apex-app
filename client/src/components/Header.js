import React, { Component } from 'react';
import apexLogo from '../assets/logo.png';

export default class Header extends Component {
    render() {
        return (
            <div>
                <img src={apexLogo} alt="Apex Legends Logo" />
            </div>
        )
    }
}
