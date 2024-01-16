# Architecture du projet : 
Des clients tournent pour chaques écrans. Ils sont codés en godot.
Un server local nodeJS est connecté aux clients et à internet.
Les données à afficher sont stockées sur le repo github sous data/content.json.
Le serveur traduit ensuite ce premier json en allant chercher les données à jour de chaque API d'internet (météo, images ...) et renvoie un json au client avec les informations à afficher.
Voir par exemple [Meteo](type_database/Meteo.md).



Les json suit cette structure : 
```json
{
	"Id_screen" : integer,
	"type" : /* meteo, salle, image.... */
	"parametres" : { /* parametres de chaques scènes */ }
},  
```

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