import { useState } from 'react';
import './DropZone.css';

const DropZone = (file, setFile) => {

  const handleDrop = (event) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="drop-zone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      {file ? (
        <div className="preview">
          {/* <img src={URL.createObjectURL(file)} alt="Preview" /> */}
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
