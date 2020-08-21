import React from 'react';
import './Header.scss';
import {HeaderToggler} from "./HeaderToggler";

export const Header = ({getThemeState}) => {
    return (
        <header className="section-header">
            <div className="container">
                <a href="#" className="section-header__logo">TSTech Test</a>
                <HeaderToggler getThemeState={getThemeState}/>
            </div>
        </header>
    );
};