Pour les annonces, 
# De Github au Server : 
```json
{
    	"screen_id" : /* integer */,
	"type" : "announcement",
    	"parameters" : [
		{ 
			"type" : /* "information" ou "warning"*/,
			"title": "Titre de l'annonce",
			"content" : "Contenu de l'annonce"
    		}
	]
}
```
# Du Server au Client : 
```json
{
	"type": "announcement",
    	"parameters": [
		{
			"type" : /* "information" ou "warning"*/,
			"title": "Titre de l'annonce",
			"content" : "Contenu de l'annonce"
    		}
	]
}
```
