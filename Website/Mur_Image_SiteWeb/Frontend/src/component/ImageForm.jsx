import { useEffect, useState } from 'react';
import './ImageForm.css';

const ImageForm = ({SelectedScreenIds, sendingScreensData, setSendingScreensData, selectedTimeLineParts}) => {

  const [file, setFile] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState(null);

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

  async function uploadImage(event){ //AJOUTER LA LOGIQUE DE CREATION DE cut et de end_coordinates et start_coordinates
    event.preventDefault();
    const minPart =  Math.min(selectedTimeLineParts[0], selectedTimeLineParts[1]); 
    const maxPart =  Math.max(selectedTimeLineParts[0], selectedTimeLineParts[1]);    
    console.log("UPLOAD IMAGE")
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log("formData : ", formData)
      //await fetch('https://mountain-big-basement.glitch.me/uploads', {
      await fetch('http://localhost:4800/uploads', {
          method: 'POST',
        body: formData,
      })
        .then(response => {
          console.log("response : ", response)
          if(response.status === 200){
            setRequestSuccess(true);
          }
          return(response.json())})
        .then(data => {
          console.log('Image envoyée avec succès:', data);
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
                            //AJOUTER LA LOGIQUE ICI
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
        return <p style={{color : "red"}}>Erreur lors de l'envoi de l'image. Veuillez relancer le serveur https://glitch.com/edit/#!/mountain-big-basement</p>
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
      <button id="uploadImage" onClick={(e) => uploadImage(e)} >Upload Image</button>
      {requestSuccessRender()}
    </div>
  );
};

export default ImageForm;

/*


*/