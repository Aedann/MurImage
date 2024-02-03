// form.js

import React, {useState, useEffect} from 'react';
import ImageForm from './ImageForm';
import PropTypes from 'prop-types';
import axios from 'axios';
import "./screen.css";

//Print "conflicting" if there are mutliple types of screens in selectedScreens


const Form = ({sendingScreensData, setSendingScreensData, screens, selectedTimeLineParts, selectedScreens}) => {
    const [formState, setFormState] = useState("singleScreen"); //Or images or conflicting or sameType
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
        if(SelectedScreenIds.length === 0){
            setFormState("noSelection");
            console.log("FormState: noSelection");
            return;
        }
        if((SelectedScreenIds.length === 1)&&(screens[SelectedScreenIds[0]].type !== "conflicting")){
            setFormState("singleScreen");
            console.log("FormState: singleScreen");
            return;
        }else{
            let i = 0
            let j = 0
            for(; i < 9;i++){
                if(screens[i].isSelected){console.log("First screen on", i );break;}
            }//i = premier écran sélectionné
            for(; j < 9; j++)
            {//on parcourt les screens, et on regarde si elles sont du même type
                if(screens[j].isSelected)
                {
                    if(screens[j].type !== screens[i].type)
                    {
                        console.log("Found conflicting screens on i,j : ", i, j," with types : ", screens[i].type, screens[j].type)
                        setFormState("conflicting");
                        console.log("FormState: conflicting");
                        return;
                    }
                }
            }
            if(screens[i].type === "image"){
                setFormState("images");
                console.log("FormState: images");
                return;
            }else{
                setFormState("conflicting");
                console.log("FormState: conflicting");
                return;
            }
        }
    }

    useEffect(() => {
        console.log("Entering findFormState") 
        findFormState();
    }, [SelectedScreenIds, screens]);


    const handleChangeType = (event) => {// Ajouter la suppression des paramètres si on change de type
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
                    parameters: {},//On écrase les anciens paramètres
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

    async function handleCommit(e){
        e.preventDefault();
        await axios.post('https://mountain-big-basement.glitch.me/content', sendingScreensData, {
        //await axios.post('http://localhost:4800/content', sendingScreensData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => {
          console.log('Ecran mis à jour avec succès : ', data);
        })
    }

    function renderSelectValue(){
        switch(formState){
            case 'singleScreen':
                return screens[SelectedScreenIds[0]].type;
            case 'images':
                return "image";
            case 'sameType':
                return screens[SelectedScreenIds[0]].type;
            default:
                return "conflicting";
        }
    }

    console.log("SelectedScreenIds: ", SelectedScreenIds);

    if(SelectedScreenIds.length !== 0){
    return ( 
        <div className="form">
            {/* <p>Selected Screen is : {SelectedScreenIds}</p>
            <p>FormState : {formState}</p> */}
            <form>
                <div >
                    Type:  
                <select style={{margin:10}} value={renderSelectValue()} onChange={handleChangeType}>
                    {(formState === "conflicting")&& 
                        <option value="Conflicting">Conflicting</option>
                    }
                    <option value="weather">Meteo</option>
                    <option value="News">News</option>
                    <option value="image">Image</option>
                    <option value="announcement">Annonce</option>
                    <option value="WeeklyPokemon">Weekly Pokemon</option>
                    <option value="LogoPolytech">Logo Polytech</option>
                    {/* <option value="example">Exemple</option> AJOUTER TYPE ICI*/ }
                </select>
                </div>
                <div>
                {(((formState === 'images')&&(screens[SelectedScreenIds[0]].type === 'image'))||((formState === 'singleScreen')&&(screens[SelectedScreenIds[0]].type == "image"))) && (
                    <p>
                        Entrer l'URL de l'image :
                        <input
                            type="text"
                            value={screens[SelectedScreenIds[0]].parameters.image_url || ''}
                            onChange={(e) => handleChangeParameters("image_url", e)}
                        /><br/>
                        Ou importer une image:
                        <div >
                            <ImageForm SelectedScreenIds={SelectedScreenIds} sendingScreensData={sendingScreensData} setSendingScreensData={setSendingScreensData}
                            selectedTimeLineParts={selectedTimeLineParts} selectedScreens={selectedScreens}/>
                        </div>

                    </p>
                )}
                {formState == 'singleScreen' && [
                    screens[SelectedScreenIds[0]].type === 'announcement' && (
                    <div key="announcement">
                        <p >
                            Entrer un titre d'Annonce:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column'}}>
                            <div style={{ marginBottom: 10 }}>
                                <label style={{ marginRight: 10 }}>Titre :</label>
                                <input
                                    type="text"
                                    value={(screens[SelectedScreenIds[0]].parameters.title ?? '')}
                                    onChange={(e) => handleChangeParameters("title", e)}
                                    maxLength="50"
                                />
                            </div>
                            <div>
                                <label style={{ marginRight: 10 }}>Description :</label>
                                <textarea
                                    style={{ marginRight :50, marginBottom : -10 }}
                                    value={(screens[SelectedScreenIds[0]].parameters.content ?? '')}
                                    onChange={(e) => handleChangeParameters("content", e)}
                                />
                            </div>
                        </div>
                    </div>),
                    screens[SelectedScreenIds[0]].type === 'example' && (
                    <div key="example">
                        <p >
                            Entrer un :
                        </p>
                        <h2>
                            <input
                                type="text"
                                value={screens[SelectedScreenIds[0]]?.parametres?.text ?? ''}
                                onChange={(e) => handleChangeParameters("title", e)}
                            />
                        </h2>
                        <input
                                type="text"
                                value={screens[SelectedScreenIds[0]]?.parametres?.text ?? ''}
                                onChange={(e) => handleChangeParameters("content", e)}
                            />
                    </div>),
                ]}
                </div><br></br><br></br>
                <button onClick={(e) => handleCommit(e)}>Sauvegarder</button>
            </form>
        </div>
    );
    }else{return(<div></div>)}
};

export default Form;