// form.js

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import "./screen.css";

const Form = ({sendingScreensData, setSendingScreensData,selectedScreen}) => {
    const handleChangeType = (event) => {
        const newType = event.target.value;
        setSendingScreensData((prevData) =>
            prevData.map((screen) =>
                screen.Id_screen === selectedScreen
                    ? { ...screen, type: newType }
                    : screen
            )
        );
    };

    const handleChangeParameters = (paramName, event) => {
        const paramValue = event.target.value;
        setSendingScreensData((prevData) =>
            prevData.map((screen) =>
                screen.Id_screen === selectedScreen
                    ? {
                        ...screen,
                        parametres: {
                            ...screen.parametres,
                            [paramName]: paramValue,
                        },
                    }
                    : screen
            )
        );
    };
    
    return (
        <div className="form">
            <label>
                {console.log("Found : ",sendingScreensData.find(screen => screen.Id_screen === selectedScreen))}
                Type:
            </label>
            <select value={sendingScreensData.find(screen => screen.Id_screen === selectedScreen)?.type} onChange={handleChangeType}>
                <option value="Meteo">Meteo</option>
                <option value="News">News</option>
                <option value="Image">Image</option>
                <option value="Annonce">Annonce</option>
            </select>
            <div>
                {(sendingScreensData.find(screen => screen.Id_screen === selectedScreen).type === 'Image') && (
                    <label>
                        Image URL:
                        <input
                            type="text"
                            value={sendingScreensData.find(screen => screen.Id_screen === selectedScreen)?.parametres.url || ''}
                            onChange={(e) => handleChangeParameters("url", e)}
                        />
                    </label>
                        )}
            </div>
            <button>Commit</button>
    </div>
    );
};

export default Form;
