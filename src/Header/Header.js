import React from 'react';
import './Header.scss';
import {HeaderToggler} from "./HeaderToggler";

export const Header = () => {
    return (
        <header className="section-header">
            <div className="container">
                <a href="#" className="section-header__logo">TSTech Test</a>
                <HeaderToggler />
            </div>
        </header>
    );
};