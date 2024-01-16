// ScreenComponent.js

import React from 'react';
import PropTypes from 'prop-types';
import "./screen.css";

const Screen = ({Id_screen, type, onSelect}) => {
    const handleSelect = () => {
        onSelect(Id_screen);
        };
    
    return (
        <div className="screen" onClick={handleSelect}>
            <h2>Screen {Id_screen}</h2><br/>
            <p className="type-label">{type}</p>
        </div>
    );
};

export default Screen;
