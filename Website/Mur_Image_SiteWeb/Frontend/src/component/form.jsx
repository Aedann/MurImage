// form.js

import React, {useState, useEffect} from 'react';
import DropZone from './DropZone';
import PropTypes from 'prop-types';
import "./screen.css";
import { send } from 'vite';

//Print "conflicting" if there are mutliple types of screens in selectedScreens


const Form = ({sendingScreensData, setSendingScreensData,selectedScreen}) => {
    const [file, setFile] = useState(null);
    const [formState, setFormState] = useState("singleScreen"); //Or Images or Conflicting


    const idToCoordonate = (id) => {
        if(id == -1)
        return [-1, -1];
        return [(id % 3), ((id - (id % 3)) / 3)];
    }
    let coord = -1;

    const minX = Math.min(selectedScreens[0][0], selectedScreens[1][0]);
    const maxX = Math.max(selectedScreens[0][0], selectedScreens[1][0]);
    const minY = Math.min(selectedScreens[0][1], selectedScreens[1][1]);
    const maxY = Math.max(selectedScreens[0][1], selectedScreens[1][1]);

    for(let i = 0; i < 9; i++){
        coord = idToCoordonate(i);
        if(coord[0] >= minX && coord[0] <=  maxX && coord[1] >= minY && coord[1] <= maxY)
            if(sendingscreensData.find(screen => screen.Id_screen === idToCoordonate(selectedScreen[0])).type !== sendingscreensData.find(screen => screen.Id_screen === selectedScreen).type)

    }


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

    async function uploadImage(){
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
    
          await fetch('http://localhost:4800/uploads', {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              console.log('Image envoyée avec succès:', data);
              setSendingScreensData((prevData) => 
                prevData.map((screen) =>
                    (screen.Id_screen === selectedScreen)
                        ? {
                            ...screen,
                            parametres: {
                                ...screen.parametres,
                                url: data.url,
                            },
                        }
                        : screen
                )
              );
            })
            .catch(error => {
              console.error('Erreur lors de l\'envoi de l\'image:', error);
            });
        }
    };

    async function handleCommit(e){
        e.preventDefault();
        if(sendingScreensData.find(screen => screen.Id_screen === selectedScreen)?.type == "image"){
            await uploadImage();
        }
        await fetch('http://localhost:4800/content', {
            method: 'POST',
            body: sendingScreensData,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
          console.log('Ecran mis à jour avec succès : ', data);
        })
    }
    
    
    return (
        <div className="form">
            <form>
                <label>
                    {console.log("Found : ",sendingScreensData.find(screen => screen.Id_screen === selectedScreen))}
                    Type:
                </label>
                <select value={sendingScreensData.find(screen => screen.Id_screen === selectedScreen)?.type} onChange={handleChangeType}>
                    <option value="weather">Meteo</option>
                    <option value="News">News</option>
                    <option value="image">Image</option>
                    <option value="announcement">Annonce</option>
                </select>
                <div>
                    {(sendingScreensData.find(screen => screen.Id_screen === selectedScreen).type === 'image') && (
                        <label>
                            Entrer l'URL de l'image :
                            <input
                                type="text"
                                value={sendingScreensData.find(screen => screen.Id_screen === selectedScreen)?.parametres.url || ''}
                                onChange={(e) => handleChangeParameters("url", e)}
                            />
                            Or upload image:
                            {/* <DropZone file={file} setFile={setFile} /> */}
                        </label>
                    )}
                    {(sendingScreensData.find(screen => screen.Id_screen === selectedScreen).type === 'announcement') && (
                        <label>
                            Entrer un titre d'Annonce:
                            <h2>
                                <input
                                    type="text"
                                    value={sendingScreensData.find(screen => screen.Id_screen === selectedScreen)?.parametres.text || ''}
                                    onChange={(e) => handleChangeParameters("title", e)}
                                />
                            </h2>
                            <input
                                    type="text"
                                    value={sendingScreensData.find(screen => screen.Id_screen === selectedScreen)?.parametres.text || ''}
                                    onChange={(e) => handleChangeParameters("content", e)}
                                />
                        </label>
                    )}
                </div>
                <button onSubmit={handleCommit}>Commit</button>
            </form>
        </div>
    );
};

export default Form;
