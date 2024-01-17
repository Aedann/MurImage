const cors = require('cors');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { ImgurClient } = require('imgur');
const fileUpload = require('express-fileupload');


const app = express();
const port = 4800;

app.use(cors());

app.use(fileUpload());
app.use(bodyParser.json());


app.get('/content', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'content.json');
    const contentData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(contentData);
    res.json(jsonData);
  } catch (error) {
    console.error('Erreur:', error.message);
    res.status(500).send('Erreur lors du traitement de la requête.');
  }
});

app.post('/content', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'content.json');
    console.log(filePath);
    const newData = req.body; // Le corps de la requête POST contient les nouvelles données

    // Écriture des nouvelles données dans le fichier
    console.log(newData);
    fs.writeFileSync(filePath, JSON.stringify(newData));

    res.send('Données mises à jour avec succès.');
  } catch (error) {
    console.error('Erreur:', error.message);
    res.status(500).send('Erreur lors du traitement de la requête.');
  }
});

app.post('/uploads', (req, res) => {
  if (!req.files) {
    return res.status(400).send({ msg: 'No file were uploaded' });
  }
  let sampleFile = req.files.sampleFile;  
  let uploadPath = __dirname + '/uploads/' + sampleFile.name;
  sampleFile.mv(uploadPath, function(err) { 
    if (err) {
      return res.status(500).send(err);
    }

  });
});


app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
