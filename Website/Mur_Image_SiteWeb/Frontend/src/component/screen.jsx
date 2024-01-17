// ScreenComponent.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "./screen.css";

const Screen = ({Id_screen, selectedTimeLineParts, sendingScreensData, onSelect}) => {

    const [type, setType] = useState("");
    const [parameters, setParameters] = useState({});
    

    const handleSelect = (e) => {
        onSelect(Id_screen, e.ctrlKey);
    }

    const minPart =  Math.min(selectedTimeLineParts[0], selectedTimeLineParts[1]); 
    const maxPart =  Math.max(selectedTimeLineParts[0], selectedTimeLineParts[1]);

    useEffect(() => {

        console.log("screen Id : ", Id_screen, "selectedTimeLineParts: ", selectedTimeLineParts);

        setType(sendingScreensData[minPart][Id_screen].type);
        setParameters(sendingScreensData[minPart][Id_screen].parameters);

        for(let i = minPart + 1; i < maxPart; i++)
        {   
            if((type !== sendingScreensData[i][Id_screen].type) ||
            (parameters !== sendingScreensData[i][Id_screen].parameters))
            {
                setType("conflicting");
            }
                
        }
    },[selectedTimeLineParts]);



    return (
        <div className="screen" onClick={(e) => handleSelect(e)}>
            <h2>Screen {Id_screen}</h2><br/>
            <p className="type-label">{type}</p>
        </div>
    );
};

export default Screen;
