const cors = require('cors');
const express = require('express');
const axios = require('axios');

const app = express();
const port = 4800;

app.use(cors());


app.get('/content', async (req, res) => {
  try {
    const githubUrl = 'https://raw.githubusercontent.com/MathisVermeren/Database_Mur_Image/main/content.json';
    const response = await axios.get(githubUrl);

    if (response.status !== 200) {
      throw new Error('Erreur lors de la récupération des données depuis GitHub.');
    }

    const contentData = response.data;
    res.json(contentData);
    console.log('Données récupérées depuis GitHub : ', contentData);
  } catch (error) {
    console.error('Erreur:', error.message);
    res.status(500).send('Erreur lors du traitement de la requête.');
  }
});

app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
