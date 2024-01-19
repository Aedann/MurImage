// form.js

import React, {useState, useEffect} from 'react';
import DropZone from './DropZone';
import PropTypes from 'prop-types';
import "./screen.css";

//Print "conflicting" if there are mutliple types of screens in selectedScreens


const Form = ({sendingScreensData, setSendingScreensData, selectedScreens, screens, setScreens, selectedTimeLineParts}) => {
    const [file, setFile] = useState(null);
    const [formState, setFormState] = useState("singleScreen"); //Or images or conflicting
    const [SelectedScreenIds, setSelectedScreenIds] = useState([]);


    const idToCoordonate = (id) => {
        if(id == -1)
        return [-1, -1];
        return [(id % 3), ((id - (id % 3)) / 3)];
    }
    let coord = -1;

    //L'ERREUR EST ICI A CORRIGER  : selectedScreenIds reste vide après ce useEffect ------------------------------------------------------------------
    useEffect(() => {//Stocke un tableau d'id d'écrans sélectionnés
        setSelectedScreenIds([]);
        for(let i = 0; i < selectedScreens.length; i++)
        {
            coord = idToCoordonate(i);
            if(coord === selectedScreens[i]){
                setSelectedScreenIds(SelectedScreenIds => [...SelectedScreenIds, i]);
            }
        }        
    },[selectedScreens]);

    // const minX = Math.min(selectedScreens[0][0], selectedScreens[1][0]);
    // const maxX = Math.max(selectedScreens[0][0], selectedScreens[1][0]);
    // const minY = Math.min(selectedScreens[0][1], selectedScreens[1][1]);
    // const maxY = Math.max(selectedScreens[0][1], selectedScreens[1][1]);

    function findFormState(){
        if(selectedScreens.length === 1){
            setFormState("singleScreen");
            return;
        }else{
            let i = 0
            let j = 0
            for(; i < 9;i++){
                if(!screens[i].isSelected){break;}
            }//i = premier écran sélectionné
            for(; j < 9; j++)
            {//on parcourt les screens, et on regarde si elles sont du même type
                if(screens[j].isSelected)
                {
                    if(screens[j].type !== screens[i].type)
                    {
                        setFormState("conflicting");
                        return;
                    }
                }
            }//En fait peut être que ça sert à rien si suelement le type image peut être en multiselection.
            if(screens[i].type === "image"){
                setFormState("images");
                return;
            }
        }
    }

    useEffect(() => {
        findFormState();
    }, [selectedScreens, selectedTimeLineParts, screens]);


    const handleChangeType = (event) => {
        const newType = event.target.value;
        setSendingScreensData((prevData) =>
            prevData.map((screen) =>
                screen.SelectedScreenIds === selectedScreen
                    ? { ...screen, type: newType }
                    : screen
            )
        );
    };

    const handleChangeParameters = (paramName, event) => {
        const paramValue = event.target.value;
        setSendingScreensData((prevData) =>
            prevData.map((screen) =>
                screen.SelectedScreenIds === selectedScreen
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
                    (screen.SelectedScreenIds === selectedScreen)
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
        if(screens[SelectedScreenIds[0]].type == "image"){
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
    
    if(SelectedScreenIds.length !== 0){
    return ( 
        <div className="form">
            {(formState === "singleScreen")&& 
            <form>
                <label>
                    Type:
                </label>
                <select value={screens[SelectedScreenIds[0]].type} onChange={handleChangeType}>
                    <option value="weather">Meteo</option>
                    <option value="News">News</option>
                    <option value="image">Image</option>
                    <option value="announcement">Annonce</option>
                </select>
                <div>
                    {(screens[SelectedScreenIds[0]].type === 'image') && (
                        <label>
                            Entrer l'URL de l'image :
                            <input
                                type="text"
                                value={screens[SelectedScreenIds[0]].parametres.url || ''}
                                onChange={(e) => handleChangeParameters("url", e)}
                            />
                            Or upload image:
                            <DropZone file={file} setFile={setFile} />
                        </label>
                    )}
                    {(screens[SelectedScreenIds[0]].type === 'announcement') && (
                        <label>
                            Entrer un titre d'Annonce:
                            <h2>
                                <input
                                    type="text"
                                    value={screens[SelectedScreenIds[0]].parametres.text || ''}
                                    onChange={(e) => handleChangeParameters("title", e)}
                                />
                            </h2>
                            <input
                                    type="text"
                                    value={screens[SelectedScreenIds[0]].parametres.text || ''}
                                    onChange={(e) => handleChangeParameters("content", e)}
                                />
                        </label>
                    )}
                </div>
                <button onSubmit={handleCommit}>Commit</button>
            </form>
            }
        </div>
    );
    }else{return(<div></div>)}
};

export default Form;
