import React, {useState} from 'react';
import './HeaderToggler.scss'


export function HeaderToggler({getThemeState}) {

    return (
        <div className="toggle-button" >
            <input type="checkbox" id="switch" onClick={() => getThemeState()}/>
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