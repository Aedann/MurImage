import { useState, useEffect } from 'react'
import './App.css'
import Screen from './component/screen';
import Form from './component/form';
import ImageForm from './component/ImageForm';  
import TimeLinePart from './component/timeLinePart';

function App() {
  const [selectedTimeLineParts, setSelectedTimeLineParts] = useState([0,0]);
  const [selectedScreens, setSelectedScreens] = useState([[-1,-1],[-1,-1]]);
  const [sendingScreensData, setSendingScreensData] = useState([]);
  const [screens, setScreens] = useState([
    {type:"",parameters:{},isSelected:false},
    {type:"",parameters:{},isSelected:false},
    {type:"",parameters:{},isSelected:false},
    {type:"",parameters:{},isSelected:false},
    {type:"",parameters:{},isSelected:false},
    {type:"",parameters:{},isSelected:false},
    {type:"",parameters:{},isSelected:false},
    {type:"",parameters:{},isSelected:false},
    {type:"",parameters:{},isSelected:false}
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/MathisVermeren/Database_Mur_Image/main/content.json');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données.');
        }
        const data = await response.json();
        console.log("data: ", data);
        setSendingScreensData(data);
      } catch (error) {
        console.error('Erreur:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("screens updated: ", screens);
  }, [screens]);

  useEffect(() => {
    console.log("sendingScreensData updated: ", sendingScreensData);
  }, [sendingScreensData]);

  useEffect(() => {
    console.log("Screens selected from " + selectedScreens[0] + " to " + selectedScreens[1]);
  }, [selectedScreens]);

  useEffect(() => {
    console.log("Timeline selected from " + selectedTimeLineParts[0] +" to " + (selectedTimeLineParts[1]));
  }, [selectedTimeLineParts]);

  //Passage de l'id dans l'array d'écrans (0 -> 8) aux coordonnées de l'écran dans la grille (3x3)
  const idToCoordonate = (id) => {
    if(id == -1)
      return [-1, -1];
    return [(id % 3), ((id - (id % 3)) / 3)];
  }
  //Passage des coordonnées de l'écran dans la grille (3x3) à l'id dans l'array d'écrans (0 -> 8)
  const coordonateToId = (coordonate) => {
    if(coordonate[0] == -1)
      return -1;
    return coordonate[0] + coordonate[1] * 3;
  }

  const handleScreenSelect = (id, isCrtlClickPressed) => {
    if(isCrtlClickPressed && selectedScreens[0][0] !== -1)
    {
      //On étend la sélection actuelle à l'écran sélectionné
      setSelectedScreens([selectedScreens[0], idToCoordonate(id)]);
    }
    else
    {
      //On séléctionne un nouvel écran
      setSelectedScreens([idToCoordonate(id), idToCoordonate(id)]);
    }
   
  }

  const handleTimeLinePartSelect = (id, isCrtlClickPressed) => {
    if(isCrtlClickPressed)
    {
      //On étend la séléction actuelle à la période sélectionnée
      setSelectedTimeLineParts([selectedTimeLineParts[0], id]);
    }
    else
    {
      //On séléctionne une nouvelle période
      setSelectedTimeLineParts([id, id]);
    }
  }

  
  let rangeScreens = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const rangeTimeLinePart = [0, 1, 2, 3, 4, 5];

  return (
    <div>
      {(sendingScreensData.length !== 0) &&
      <div>
        <h1>Mur d'image </h1>
        <div className="screens">
        {rangeScreens.map((index) => (
          <Screen key={index} Id_screen={index} selectedTimeLineParts={selectedTimeLineParts} sendingScreensData={sendingScreensData} onSelect={handleScreenSelect} selectedScreens={selectedScreens} screens={screens} setScreens={setScreens} />
        ))
        }
        </div>
        <div >
            <h3>Timeline : </h3>
            <div className="timeLine">
            {rangeTimeLinePart.map((i) => (
              <TimeLinePart key={i} Id_part={i} onSelect={handleTimeLinePartSelect} selectedTimeLineParts={selectedTimeLineParts}/>
            ))
            }
            </div>
        </div>
        <Form sendingScreensData={sendingScreensData} setSendingScreensData={setSendingScreensData} selectedScreens={selectedScreens} screens={screens} selectedTimeLineParts={selectedTimeLineParts}/>
      </div>
  }
  </div>
  )
}

export default App
/*

*/