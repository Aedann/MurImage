// form.js

import React, {useState, useEffect} from 'react';
import DropZone from './DropZone';
import PropTypes from 'prop-types';
import "./screen.css";

//Print "conflicting" if there are mutliple types of screens in selectedScreens


const Form = ({sendingScreensData, setSendingScreensData, screens, selectedTimeLineParts}) => {
    const [file, setFile] = useState(null);
    const [formState, setFormState] = useState("singleScreen"); //Or images or conflicting
    const [SelectedScreenIds, setSelectedScreenIds] = useState([]);

    useEffect(() => {//Stocke un tableau d'id d'écrans sélectionnés
        console.log("Entering useEffect: with screens : ", screens);
        setSelectedScreenIds([]);
        for(let k = 0; k < 9; k++){
            if(screens[k].isSelected){
                console.log("Added Id : ", k);
                setSelectedScreenIds(SelectedScreenIds => [...SelectedScreenIds, k]);
            }
        }
    },[screens]);


    function findFormState(){//Depend de screens et SelectedScreenIds //Rajouter le SelectedScreenIds==[] 
        if(SelectedScreenIds.length === 1){
            setFormState("singleScreen");
            console.log("FormState: singleScreen");
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
                        console.log("FormState: conflicting");
                        return;
                    }
                }
            }//En fait peut être que ça sert à rien si suelement le type image peut être en multiselection.
            if(screens[i].type === "image"){
                setFormState("images");
                console.log("FormState: images");
                return;
            }
        }
    }

    useEffect(() => {
        console.log("Entering findFormState") 
        findFormState();
    }, [SelectedScreenIds]);


    const handleChangeType = (event) => {
        const newType = event.target.value;        
        console.log("selectedTimeLineParts: ", selectedTimeLineParts);
        const minPart =  Math.min(selectedTimeLineParts[0], selectedTimeLineParts[1]); 
        const maxPart =  Math.max(selectedTimeLineParts[0], selectedTimeLineParts[1]);    
        console.log("paramName: ", event.target.value);
        setSendingScreensData(prevData => {
            let updatedData = { ...prevData };
            console.log(" with SelectedScreenIds : ", SelectedScreenIds," and minPart, maxPart : ", minPart, maxPart);
            for (let j = minPart; j < maxPart+1; j++) { //Pour chaque Periode
              for (let i = 0; i < 9; i++) { //Pour chaque écran
                console.log("comparing updatedData[j][i].Id_Screen : ", updatedData[j][i].Id_screen);
                if ((SelectedScreenIds.includes(updatedData[j][i].Id_screen))) {
                  console.log("found selected screen for i,j : ", i, j);
                  updatedData[j][i] = {
                    ...updatedData[j][i],
                    type: newType,
                  };
                }
              }
            }
            console.log("updatedData: ", updatedData);
            return updatedData;
        });
    };

    const handleChangeParameters = (paramName, event) => {
        const paramValue = event.target.value;
        console.log("selectedTimeLineParts: ", selectedTimeLineParts);
        const minPart =  Math.min(selectedTimeLineParts[0], selectedTimeLineParts[1]); 
        const maxPart =  Math.max(selectedTimeLineParts[0], selectedTimeLineParts[1]);    
        console.log("paramName: ", event.target.value);
        setSendingScreensData(prevData => {
            let updatedData = { ...prevData };
            console.log(" with SelectedScreenIds : ", SelectedScreenIds," and minPart, maxPart : ", minPart, maxPart);
            for (let j = minPart; j < maxPart+1; j++) { //Pour chaque Periode
              for (let i = 0; i < 9; i++) { //Pour chaque écran
                console.log("comparing updatedData[j][i].Id_Screen : ", updatedData[j][i].Id_screen);
                if ((SelectedScreenIds.includes(updatedData[j][i].Id_screen))) {
                  console.log("found selected screen for i,j : ", i, j);
                  updatedData[j][i] = {
                    ...updatedData[j][i],
                    parameters: {
                      ...updatedData[j][i].parameters,
                      [paramName]: paramValue,
                    },
                  };
                }
              }
            }
            console.log("updatedData: ", updatedData);
            return updatedData;
        });
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
    console.log("SelectedScreenIds: ", SelectedScreenIds);
    if(SelectedScreenIds.length !== 0){
    return ( 
        <div className="form">
            <p>Selected Screen is : {SelectedScreenIds}</p>
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
                                value={screens[SelectedScreenIds[0]].parameters.image_url || ''}
                                onChange={(e) => handleChangeParameters("image_url", e)}
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
