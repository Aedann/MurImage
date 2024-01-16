const express = require('express')
const app = express();


const githubRepoUrl = 'https://raw.githubusercontent.com/MathisVermeren/MurImage/main/data/content.json';

async function fetchJsonFile() {
  try {
    const response = await fetch(githubRepoUrl);

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status} - ${response.statusText}`);
    }

    const jsonData = await response.json();

    console.log('Contenu du fichier JSON:');
    console.log(jsonData);

    // Faites ce que vous voulez avec les données JSON ici

  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération du fichier JSON:', error.message);
  }
}

fetchJsonFile();
