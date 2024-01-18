// ScreenComponent.js

import React, { useEffect, useState } from 'react';
import ReactCrop from 'react-image-crop'
import PropTypes from 'prop-types';
import "./screen.css";

const Screen = ({Id_screen, selectedTimeLineParts, sendingScreensData, onSelect, selectedScreens, screens, setScreens}) => {

    //Si c'est une image
    const [crop, setCrop] = useState({
        unit: '%', 
        x: 0,
        y: 0,
        width: 100,
        height: 100
    })

    //Passage de l'id dans l'array d'écrans (0 -> 8) aux coordonnées de l'écran dans la grille (3x3)
    const idToCoordonate = (id) => {
        if(id == -1)
        return [-1, -1];
        return [(id % 3), ((id - (id % 3)) / 3)];
    }

    const minX = Math.min(selectedScreens[0][0], selectedScreens[1][0]);
    const maxX = Math.max(selectedScreens[0][0], selectedScreens[1][0]);
    const minY = Math.min(selectedScreens[0][1], selectedScreens[1][1]);
    const maxY = Math.max(selectedScreens[0][1], selectedScreens[1][1]);

    useEffect(() => { //CORRIGER ICI LA LOGIQUE
        const coord = idToCoordonate(Id_screen);
        if(coord[0] >= minX && coord[0] <=  maxX && coord[1] >= minY && coord[1] <= maxY)
            setScreens( screens => ({...screens, [Id_screen]: {...[Id_screen], isSelected: true }}));
        else
            setScreens( screens => ({...screens, [Id_screen]: {...[Id_screen], isSelected: false }}));
    }, [selectedScreens, screens]);


    const handleSelect = (e) => {
        onSelect(Id_screen, e.ctrlKey || e.shiftKey);
    }

    const minPart =  Math.min(selectedTimeLineParts[0], selectedTimeLineParts[1]); 
    const maxPart =  Math.max(selectedTimeLineParts[0], selectedTimeLineParts[1]);

    useEffect(() => {
        setScreens( screens => ({...screens, [Id_screen]: {...[Id_screen], type: sendingScreensData[minPart][Id_screen].type }}));
        setScreens( screens => ({...screens, [Id_screen]: {...[Id_screen], parameters: sendingScreensData[minPart][Id_screen].parameters }}));

        for(let i = minPart + 1; i < maxPart; i++)
        {   
            if((screens[Id_screen].type !== sendingScreensData[i][Id_screen].type) ||
            (screens[Id_screen].parameters !== sendingScreensData[i][Id_screen].parameters))
            {
                setScreens( screens => ({...screens, [Id_screen]: {...[Id_screen], type: "conflicting" }}));
            }
                
        }

        if(screens[Id_screen].type == "image" && screens[Id_screen].parameters.cut)
        {
            setCrop({
                unit: 'px', 
                x: screens[Id_screen].parameters.start_coordinates[0],
                y: screens[Id_screen].parameters.start_coordinates[1],
                width: screens[Id_screen].parameters.end_coordinates[0] - screens[Id_screen].parameters.start_coordinates[0],
                height: screens[Id_screen].parameters.end_coordinates[1] - screens[Id_screen].parameters.start_coordinates[1]
            })
        }
        else
        {
            setCrop({
                unit: '%', 
                x: 0,
                y: 0,
                width: 100,
                height: 100
            })
        }
    },[selectedTimeLineParts, sendingScreensData]);

    
    return (
    <div className={`screen ${(screens[Id_screen].isSelected && "isSelected")}`} onClick={(e) => handleSelect(e)}>
        <h2>Screen {Id_screen}</h2>
        <p className="type-label">{screens[Id_screen].type}</p>

        {screens[Id_screen].type === "image" && (
            <div className="image-container">
                <ReactCrop crop={crop}>
                    <img
                        className="image-background"
                        src={screens[Id_screen].parameters.image_url}
                        alt={`Screen ${Id_screen} Image`}
                    />
                </ReactCrop>
            </div>
        )}
    </div>
    );
};

export default Screen;
