Pour les annonces, 
# De Github au Server : 
```json
{
    	"screen_id" : /* integer */,
	"type" : "annonce",
    	"parameters" : [
		{ 
        		"type" : /* information, warning, ou autre */,
			"content" : "Contenu de l'annonce"
    		}
	]
}
```
# Du Server au Client : 
```json
{
	"type": "annonce",
    	"parameters": [
		{
        		"type" : /* information, warning, ou autre */,
			"content" : "Contenu de l'annonce"
    		}
	]
}
```
