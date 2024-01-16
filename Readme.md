Le json suit cette structure : 
```json
{
	"Id_screen" : integer,
	"type" : /* meteo, salle, image.... */
	"parametres" : { /* parametres de chaques scènes */ }
},  
```

Types différents : 
 * météo
 * heure
 * images
 * logo
 * modulable...
 * résa salles
 * ratp
 * planning des events
 * calendrier vacances
 * news
 * annonces/texte


Parametres pour chaque type : 
Meteo : 
```json
{
	"temperature" : /* integer */,
	"Lieu" : /* String */,
	...
}	
```
A Compléter pour chaque type
