import { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageForm.css';

const ImageForm = ({SelectedScreenIds, sendingScreensData, setSendingScreensData, selectedTimeLineParts, selectedScreens}) => {

  const [file, setFile] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState(null);

  function getImageSizeFromFile(file){
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
  
      img.onload = () => {
        const imageSize = { x: img.width, y: img.height };
        return imageSize;
      };
    };
  };

  async function getImageSizeFromUrl(url){
    const loadImage = path => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
        img.src = path
        img.onload = () => {
          resolve(img)
        }
        img.onerror = e => {
          reject(e)
        }
      })
    }
    try{
      const img = await loadImage(url)
      const imageSize = { x: img.width, y: img.height };
      return imageSize;
    }catch(e){
      console.log(e)
    }
  };  
  
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    setFile(droppedFile);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    setRequestSuccess(null);
  }, [file]);


  function generateCutCoordinates(imageSize){
    let coordinates = [{Id_screen : 0},{Id_screen : 1},{Id_screen : 2},{Id_screen : 3},{Id_screen : 4},{Id_screen : 5},{Id_screen : 6},{Id_screen : 7},{Id_screen :8}]
    const minX = Math.min(selectedScreens[0][0], selectedScreens[1][0]);
    const maxX = Math.max(selectedScreens[0][0], selectedScreens[1][0]);
    const minY = Math.min(selectedScreens[0][1], selectedScreens[1][1]);
    const maxY = Math.max(selectedScreens[0][1], selectedScreens[1][1]);
    const screenXs = maxX - minX +1 ; //Le nombre de colonnes d'écrans sélectionnés
    const screenYs = maxY - minY +1 ; //Le nombre de lignes d'écrans sélectionnés
    const quantaX = imageSize.x / screenXs;
    const quantaY = imageSize.y / screenYs;
    console.log({screenXs : screenXs, screenYs : screenYs, quantaX : quantaX, quantaY : quantaY})
    console.log({SelectedScreenIds})
    let incrementX = 0;
    let incrementY = 0;
    for(let i = 0; i < 9; i++){
      if(SelectedScreenIds.includes(i)){
        console.log("it is included")
        if(incrementX==screenXs){
          console.log("incrementX==screenXs")
          incrementX=0;
          incrementY++;
        }
        coordinates[i].start_coordinates = {x : incrementX*quantaX, y : incrementY*quantaY};
        coordinates[i].end_coordinates = {x : (incrementX+1)*quantaX, y : (incrementY+1)*quantaY};
        incrementX++;
        console.log({i : i, incrementX : incrementX, incrementY : incrementY})
      }
    }
    console.log("coordinates : ", coordinates)
    return coordinates;
  }

  async function uploadImage(event){ //AJOUTER LA LOGIQUE DE CREATION DE cut et de end_coordinates et start_coordinates
    event.preventDefault();
    const minPart =  Math.min(selectedTimeLineParts[0], selectedTimeLineParts[1]); 
    const maxPart =  Math.max(selectedTimeLineParts[0], selectedTimeLineParts[1]);    
    console.log("UPLOAD IMAGE")
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log("formData : ", formData)


      // await fetch('https://mountain-big-basement.glitch.me/uploads', {
      // //await fetch('http://localhost:4800/uploads', {
      //   method: 'POST',
      //   body: formData,
      // })
      // axios.post("https://mountain-big-basement.glitch.me/uploadTest",formData)
      axios.post("http://localhost:4800/uploadTest",formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentage}%`);
        },


      })

        .then(response => {
          console.log("response : ", response)
          if(response.status === 200){
            setRequestSuccess(true);
          }
          return(response.json())})
        .then(async data => {
          console.log('Image envoyée avec succès:', data);
          const ImageSize = await getImageSizeFromUrl(data.imgurLink);
          console.log("ImageSize : ", ImageSize)
          const cutCoordinates = generateCutCoordinates(ImageSize);
          setSendingScreensData(prevData => {
            let updatedData = { ...prevData };
            console.log("Entering setSendingScreensData")
            for (let j = minPart; j < maxPart+1; j++) { //Pour chaque Periode
              for (let i = 0; i < 9; i++) { //Pour chaque écran
                if ((SelectedScreenIds.includes(updatedData[j][i].Id_screen))) {
                  updatedData[j][i] = {
                    ...updatedData[j][i],
                    parameters: {
                            ...updatedData[j][i].parameters,
                            image_url: data.imgurLink, 
                            start_coordinates: {
                              x : cutCoordinates[i].start_coordinates.x,
                              y : cutCoordinates[i].start_coordinates.y},
                            end_coordinates: {
                              x : cutCoordinates[i].end_coordinates.x,
                              y : cutCoordinates[i].end_coordinates.y
                            },
                    },
                  }
                }
              }
            }
            console.log("updatedData: ", updatedData);
            return updatedData;
          })
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi de l\'image:', error);
          setRequestSuccess(false);
        });
    }
  };


  axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request
  })
  
  async function uploadImage2(event){ //AJOUTER LA LOGIQUE DE CREATION DE cut et de end_coordinates et start_coordinates
    event.preventDefault();
    const minPart =  Math.min(selectedTimeLineParts[0], selectedTimeLineParts[1]); 
    const maxPart =  Math.max(selectedTimeLineParts[0], selectedTimeLineParts[1]);    
    console.log("UPLOAD IMAGE")
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log("formData : ", formData)


      // await fetch('https://mountain-big-basement.glitch.me/uploads', {
      // //await fetch('http://localhost:4800/uploads', {
      //   method: 'POST',
      //   body: formData,
      // })
      axios.post("https://mountain-big-basement.glitch.me/uploadImages",formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentage}%`);
        },
  

      })

        .then(response => {
          console.log("response : ", response)
          if(response.status === 200){
            setRequestSuccess(true);
          }
          return(response.json())})
        .then(async data => {
          console.log('Image envoyée avec succès:', data);
          const ImageSize = await getImageSizeFromUrl(data.imgurLink);
          console.log("ImageSize : ", ImageSize)
          const cutCoordinates = generateCutCoordinates(ImageSize);
          setSendingScreensData(prevData => {
            let updatedData = { ...prevData };
            console.log("Entering setSendingScreensData")
            for (let j = minPart; j < maxPart+1; j++) { //Pour chaque Periode
              for (let i = 0; i < 9; i++) { //Pour chaque écran
                if ((SelectedScreenIds.includes(updatedData[j][i].Id_screen))) {
                  updatedData[j][i] = {
                    ...updatedData[j][i],
                    parameters: {
                            ...updatedData[j][i].parameters,
                            image_url: data.imgurLink, 
                            start_coordinates: {
                              x : cutCoordinates[i].start_coordinates.x,
                              y : cutCoordinates[i].start_coordinates.y},
                            end_coordinates: {
                              x : cutCoordinates[i].end_coordinates.x,
                              y : cutCoordinates[i].end_coordinates.y
                            },
                    },
                  }
                }
              }
            }
            console.log("updatedData: ", updatedData);
            return updatedData;
          })
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi de l\'image:', error);
          setRequestSuccess(false);
        });
    }
  };









  function requestSuccessRender(){
    switch (requestSuccess) {
      case null:
        return <span></span>;
      case true:
        return <p style={{color : "green"}}>Image envoyée avec succès, n'oubilez pas de Commit</p>;
      case false:
        return <p style={{color : "red"}}>Erreur lors de l'envoi de l'image. Veuillez réessayer ou relancer le serveur https://glitch.com/edit/#!/mountain-big-basement</p>
      default:
        return <span></span>;
    }
  }

  return (
    <div style={{display : "flex", flexDirection : "column"}}>
      
      <div className="drop-zone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {file !== null ? (
          <div className="preview">
            {<img src={URL.createObjectURL(file)} alt="Preview" /> }
          </div>
        ) : (
          <div className="instructions">
            <p>Faites glisser une image ici ou</p>
            <input type="file" onChange={handleFileChange} />
          </div>
        )}
      </div>
      <button id="uploadImage" onClick={(e) => {uploadImage2(e)}} >Upload Image GLITCH</button>
      <button id="uploadImage" onClick={(e) => {uploadImage(e)}} >Upload Image Localhost</button>
      {requestSuccessRender()}
    </div>
  );
};

export default ImageForm;

/*


*/