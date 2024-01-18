// ScreenComponent.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "./screen.css";

const Screen = ({Id_screen, selectedTimeLineParts, sendingScreensData, onSelect, selectedScreens}) => {

    const [type, setType] = useState("");
    const [parameters, setParameters] = useState({});
    const [isSelected, setIsSelected] = useState(false);

    //Passage de l'id dans l'array d'écrans (0 -> 8) aux coordonnées de l'écran dans la grille (3x3)
    const idToCoordonate = (id) => {
        if(id == -1)
        return [-1, -1];
        return [(id % 3), ((id - (id % 3)) / 3)];
    }

    useEffect(() => { //CORRIGER ICI LA LOGIQUE
        const coord = idToCoordonate(Id_screen);
        if(coord[0] >= selectedScreens[0][0] && coord[0] <= selectedScreens[1][0] && coord[1] >= selectedScreens[0][1] && coord[1] <= selectedScreens[1][1])
            setIsSelected(true);
        else
            setIsSelected(false);
    }, [selectedScreens]);


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
        <div className={`screen ${(isSelected)&&"isSelected"}`} onClick={(e) => handleSelect(e)}>
            <h2>Screen {Id_screen}</h2><br/>
            <p className="type-label">{type}</p>
        </div>
    );
};

export default Screen;
