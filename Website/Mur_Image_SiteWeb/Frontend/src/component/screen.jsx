// ScreenComponent.js

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CroppedImage from './CroppedImage';
import "./screen.css";

const Screen = ({Id_screen, selectedTimeLineParts, sendingScreensData, onSelect, selectedScreens, screens, setScreens}) => {

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

    useEffect(() => { //Permet de savoir si l'écran est sélectionné ou non
        const coord = idToCoordonate(Id_screen);
        if(coord[0] >= minX && coord[0] <=  maxX && coord[1] >= minY && coord[1] <= maxY)
            setScreens( screens => ({...screens,
                                     [Id_screen]:{
                                        ...screens[Id_screen],
                                        isSelected: true
                                    }}));
        else
            setScreens( screens => ({...screens,
                                     [Id_screen]:{
                                        ...screens[Id_screen],
                                        isSelected: false
                                    }}));
    }, [selectedScreens]);//J'ai corriger la sensibilité en enlevant screens psk on n'a pas besoin de screens pour savoir si notre écran est sélectionné.



    const handleSelect = (e) => {
        onSelect(Id_screen, e.ctrlKey || e.shiftKey);
    }

    const minPart =  Math.min(selectedTimeLineParts[0], selectedTimeLineParts[1]); 
    const maxPart =  Math.max(selectedTimeLineParts[0], selectedTimeLineParts[1]);

    useEffect(() => {
        setScreens( screens => ({
            ...screens,
            [Id_screen] : {
            ...screens[Id_screen],
            type: sendingScreensData[minPart][Id_screen].type,
            parameters: sendingScreensData[minPart][Id_screen].parameters
        }}));

        for(let i = minPart + 1; i < maxPart; i++)
        {   
            if((screens[Id_screen].type !== sendingScreensData[i][Id_screen].type) ||
            (screens[Id_screen].parameters !== sendingScreensData[i][Id_screen].parameters))
            {
                setScreens( screens => ({...screens, [Id_screen]: {...[Id_screen], type: "conflicting" }}));
            }
                
        }

    },[selectedTimeLineParts, sendingScreensData]);

    // Coordonnées de début et de fin pour le recadrage
    return (
    <div className={`screen ${(screens[Id_screen].isSelected && "isSelected")}`} onClick={(e) => handleSelect(e)}>
        <div className="absolute">
            <h2>Screen {Id_screen}</h2>
            <p className="type-label">{screens[Id_screen].type}</p>
        </div>
        {screens[Id_screen].type === "image" && (
        <div className="image-container">
            <CroppedImage url={screens[Id_screen].parameters.image_url} startCoordinates={screens[Id_screen].parameters.start_coordinates} endCoordinates={screens[Id_screen].parameters.end_coordinates} Id_screen={Id_screen}/>
        </div>
    )}
    </div>
    );
};

export default Screen;
