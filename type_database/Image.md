Pour les images, 
# De Github au Server : 
```json
{
	"screen_id" : /*integer*/,
	"type" : "image",
    	"parameters" : {
		"start_coordinates": {"x" : 0, "y" : 0},
		"end_coordinates": {"x" : 0, "y" : 0},
		"cut": /* true si sur plusieurs écrans, false sinon */,
		"image_url": "url de l'image"
	}
}
```
# Du Server au Client : 
```json
{
	"type": "image",
	"parameters": {
		"start_coordinates": {"x" : 0, "y" : 0},
		"end_coordinates": {"x" : 0, "y" : 0},
		"cut": true,
		"image_stream": /*binary*/,
		"image_type": "jpg"
	}
}
```
