import { useState } from 'react';
import './DropZone.css';

const DropZone = () => {
  const [file, setFile] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch('http://localhost:4800/uploads', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Image envoyée avec succès:', data);
        })
        .catch(error => {
          console.error('Erreur lors de l\'envoi de l\'image:', error);
        });
    }
  };

  return (
    <div className="drop-zone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      {file ? (
        <div className="preview">
          <img src={URL.createObjectURL(file)} alt="Preview" />
          <button onClick={handleUpload}>Envoyer</button>
        </div>
      ) : (
        <div className="instructions">
          <p>Faites glisser une image ici ou</p>
          <input type="file" onChange={handleFileChange} />
        </div>
      )}
    </div>
  );
};

export default DropZone;
