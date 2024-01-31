const cors = require('cors');
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mime = require('mime-types');


const app = express();
const port = 4800;

app.use(cors());

app.use(fileUpload());
app.use(bodyParser.json());

const imgurAccessToken = 'b81882edbe7fb55404a1bf9f59d39ac18113e1f9';

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

// app.post('/uploads', (req, res) => {
//   console.log("req.files", req.files);
//   console.log("req.body", req.body);
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).json({ msg: 'No file were uploaded' });
//   }

//   const sampleFile = req.files.file;
//   const uploadPath = path.join(__dirname, 'data', sampleFile.name);

//   sampleFile.mv(uploadPath, function(err) {
//     if (err) {
//       return res.status(500).json({ msg: err.message });
//     }
//     res.json({ msg: 'File uploaded successfully' });
//   });
// });

app.post("/uploadTest", async (req, res) => {
  console.log("poked ! ");   
  console.log("\n\n\n req : AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n",req);
  console.log("req.files.length : ",Object.keys(req.files).length);
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("No file uploaded");
    return res.status(400).json({ msg: 'No file were uploaded' });
  }

  try {

    const sampleFile = req.files.file;
    console.log(sampleFile.name);
    const uploadPath = path.join(__dirname, 'data', sampleFile.name);

    // Enregistrement de l'image sur le serveur Node.js
    await sampleFile.mv(uploadPath);
    try {
      const imageData = fs.readFileSync(uploadPath);
      const contentType = mime.lookup(uploadPath) || 'application/octet-stream';
    } catch (error) {
      console.error('Erreur lors de l\'upload de l\'image sur Imgur:', error.message);
      res.status(500).json({ msg: error.message });
    }
  } catch (error) {
    console.error('Erreur lors du traitement de l\'image:', error);
    res.status(500).json({ msg: error.message });
  }
})



app.post('/uploads', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msg: 'No file were uploaded' });
  }

  try {
    const sampleFile = req.files.file;
    const uploadPath = path.join(__dirname, 'data', sampleFile.name);

    // Enregistrement de l'image sur le serveur Node.js
    await sampleFile.mv(uploadPath);

    try {
      const imageData = fs.readFileSync(uploadPath);
      const contentType = mime.lookup(uploadPath) || 'application/octet-stream';

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
      fs.unlinkSync(uploadPath);

      res.json({ msg: 'File uploaded successfully', imgurLink });
    } catch (error) {
      console.error('Erreur lors de l\'upload de l\'image sur Imgur:', error.message);
      res.status(500).json({ msg: error.message });
    }
  } catch (error) {
    console.error('Erreur lors du traitement de l\'image:', error);
    res.status(500).json({ msg: error.message });
  }
});



app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
