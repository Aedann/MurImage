import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Screen from './component/screen';
import Form from './component/form';

function App() {
  const [count, setCount] = useState(0)
  const [selectedScreen, setSelectedScreen] = useState(0)
  const [fetchedScreensData, setFetchedScreensData] = useState([]);
  const [sendingScreensData, setSendingScreensData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/MathisVermeren/Database_Mur_Image/main/content.json');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données.');
        }
        const data = await response.json();
        setFetchedScreensData(data);
        setSendingScreensData(data);
      } catch (error) {
        console.error('Erreur:', error.message);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("fetchedScreensData updated: ", fetchedScreensData);
  // }, [fetchedScreensData]);
  
  useEffect(() => {
    console.log("sendingScreensData updated: ", sendingScreensData);
  }, [sendingScreensData]);

  const screens = Array.from({length: 10}, (_, i) => i + 1); // Create an array of 10 numbers
  const handleScreenSelect = (id) => {
    console.log("Selected Screen is : " + id);
    setSelectedScreen(id);
  }

  return (
    <div>
      <h1>Mur d'image </h1>
      <div className="card">
      </div>
      <div className="screens">
      {fetchedScreensData.map((screen) => (
          <Screen key={screen.Id_screen} Id_screen={screen.Id_screen} type={screen.type} onSelect={handleScreenSelect}/>
      ))
      }
      </div>
      <div>
        <p>Selected Screen is : {selectedScreen}</p>
        {/* selectedScreen !== 0 &&
          <Form sendingScreensData={sendingScreensData} setSendingScreensData={setSendingScreensData} selectedScreen={selectedScreen}/>*/
        }
      </div>
    </div>
  )
}

export default App
