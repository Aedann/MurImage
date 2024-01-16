Pour la météo, 
# De Github au Server : 
On envoie le type météo.
```json
{
    "Id_screen" : /*integer*/,
	"type" : "Meteo",

}
```
# Du Server au Client : 
On envoie le type météo.
```json
{
    "Id_screen" : /*integer*/,
	"type" : "Meteo",
    "parameters" : {"temperature" :10, "temperature_max" : 20, "temperature_min" : 0 , "location" : "Paris", "humidity" : 4}

}
```
A COMPLETER