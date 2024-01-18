# Architecture du projet : 
Des clients tournent pour chaques écran. Ils sont codés en Godot.
Un server local Node.JS est connecté aux clients via un websocket et à internet.
Les données à afficher sont stockées soit sur le repo github sous data/content.json soit sur le serveur distant NodeJS : https://mountain-big-basement.glitch.me/content (hebergé sur glitch gratuitement, il faut le relancer toutes les 12h).
Le serveur traduit ensuite ce premier JSON en allant chercher les données à jour de chaque API d'internet (météo, images ...) et renvoie un JSON au client avec les informations à afficher.
Voir par exemple [Meteo](type_database/Meteo.md).



Les json suit cette structure : 
```json
{
	"screen_id": /* integer */,
	"type": /* weather, image, datetime, etc... */
	"parametres": {
		/* parametres de chaque scène */
	}
},  
```

On peut modifier les données à afficher grâce au site web : https://mathisvermeren.github.io/MurImage/

# Structure Json pour chaque scène : (A Compléter)
(A Compléter pour chaque type)

 * [Image](type_database/Image.md)
 * [Meteo](type_database/Meteo.md)
 * [RATP](type_database/RATP.md)
 * [PlanningEvent](type_database/PlanningEvent.md)
 * [ResaSalles](type_database/ResaSalles.md)
 * [Annonce](type_database/Annonce.md)
Ajouter les types suivants : 
 * heure
 * logo
 * modulable...
 * calendrier vacances
 * news
