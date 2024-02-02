require('dotenv').config();
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mime = require('mime-types');
const multer = require('multer')



const app = express();
const port = process.env.PORT;

const storage = multer.diskStorage({
  destination: './data', // Dossier de destination pour enregistrer l'image
	filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilisez le nom original du fichier
  },
});

const upload = multer({ storage: storage });


app.use(cors());

app.use(bodyParser.json());

const imgurAccessToken = process.env.IMGURTOKEN;
console.log("imgurAccessToken : ",imgurAccessToken);


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
    console.log("filePath : ",filePath);
    console.log("req.body : ",req.body);
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

app.post('/uploadImgur', upload.single('image'), async function (req, res, next) {
  console.log("poked ! ");   
  console.log("\n\n\n req : AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n",req);
  try {
    const imagePath = `./data/${req.file.originalname}`;
    const imageData = fs.readFileSync(imagePath);

    const contentType = mime.lookup(imagePath) || 'application/octet-stream';
    
    const responseImgur = await axios.post('https://api.imgur.com/3/image', imageData, {
      headers: {
        'Authorization': `Bearer ${imgurAccessToken}`,
        'Content-Type': contentType,
        'Content-Length': imageData.length.toString(),
      },
    });
 
    const imgurLink = responseImgur.data.data.link;

    console.log('Réponse Imgur:', responseImgur);

    // Suppression de l'image du serveur Node.js
    fs.unlinkSync(imagePath);

    res.json({ msg: 'File uploaded successfully', imgurLink });

  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image sur Imgur:', error);
    res.status(500).json({ msg: error.message });
  }
}); 


app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
