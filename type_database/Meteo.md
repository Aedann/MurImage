Pour la météo, 
# De Github au Server : 
On envoie le type météo.
```json
{
    	"screen_id": /* integer */,
	"type": "weather",
}
```
# Du Server au Client : 
On envoie le type météo.
```json
{
	"type": "weather",
    	"parameters": {
		"temperature": 10,
		"temperature_max": 20,
		"temperature_min": 0,
		"location": "Paris",
		"humidity" : 4
	}
}
```
