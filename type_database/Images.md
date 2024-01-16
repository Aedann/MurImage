Pour les images, 
# De Github au Server : 
```json
{
    "Id_screen" : /*integer*/,
	"type" : "image",
    "parameters" : { 
		"source" : /* "remote" ou "local"*/ ,
		"location" : "url ou path"
    }

}
```
# Du Server au Client : 
```json
{
    "Id_screen" : /*integer*/,
	"type" : "image",
    "parameters" : {
		"start_coordinates" : {"x" : 0, "y" : 0},
		"end_coordinates" : {"x" : 0, "y" : 0},
		"cut" : true,
		"image_stream" : /*binary*/,
		'image_type" : "jpg"
    }	

}
```
A COMPLETER
