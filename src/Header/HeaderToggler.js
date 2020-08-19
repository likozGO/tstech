import React from 'react';
import './HeaderToggler.scss'


export function HeaderToggler() {
    return (
        <div className="toggle-button">
            <input type="checkbox" id="switch"/>
            <div className="content">
                <label htmlFor="switch">
                    <div className="toggle"></div>
                    <div className="names">
                        <p className="light">Light</p>
                        <p className="dark">Dark</p>
                    </div>
                </label>
            </div>
        </div>
    );
};