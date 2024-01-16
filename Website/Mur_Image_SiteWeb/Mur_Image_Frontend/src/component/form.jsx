// form.js

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import "./screen.css";

const Form = ({sendingScreensData, setSendingScreensData,selectedScreen}) => {
    const [currentScreen, setCurrentScreen] = useState({});

    if(sendingScreensData !== undefined && selectedScreen !== 0){
        setCurrentScreen(sendingScreensData.find(screen => screen.Id_screen === selectedScreen));
    }  
    

    useEffect(() => {
        console.log("Current Screen : ",currentScreen)
    },[currentScreen])
    // const handleChangeType = (event) => {
    //     const newType = event.target.value;
    //     setSendingScreensData((prevData) =>
    //         prevData.map((screen) =>
    //             screen.Id_screen === selectedScreen
    //                 ? { ...screen, type: newType }
    //                 : screen
    //         )
    //     );
    // };

    // const handleChangeParameters = (event) => {
    //     const newUrl = event.target.value;
    //     setSendingScreensData((prevData) =>
    //         prevData.map((screen) =>
    //             screen.Id_screen === selectedScreen &&
    //             screen.type === "Image"
    //                 ? { ...screen, parametres: { url: newUrl } }
    //                 : screen
    //         )
    //     );
    // };

    return (
        <div className="form">
    </div>
    );
};

export default Form;

/*
Commented : 

            {(sendingScreensData.find(screen => screen.Id_screen === selectedScreen).type === 'Image') && (
                 <label>
                     Image URL:
                     <input
                         type="text"
                         value={sendingScreensData.find(screen => screen.Id_screen === selectedScreen)?.parametres.url || ''}
                         onChange={handleChangeUrl}
                     />
                 </label>
             )}





                         {(currentScreen !== undefined) &&
            <label>
                {console.log("Found : ",sendingScreensData.find(screen => screen.Id_screen === selectedScreen))}
                Type:
            </label>
            // <select value={sendingScreensData.find(screen => screen.Id_screen === selectedScreen)?.type} onChange={handleChangeType}>
            //     <option value="Meteo">Meteo</option>
            //     <option value="News">News</option>
            //     <option value="Image">Image</option>
            //     <option value="Annonce">Annonce</option>
            // </select>


            }

*/