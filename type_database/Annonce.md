Pour les annonces, 
# De Github au Server : 
```json
{
    "Id_screen" : /*integer*/,
	"type" : "annonce",
    "parameters" : { 
        "type" : "information" /* ou warning, ou autre */,
		"content" : "Contenu de l'annonce"
    }

}
```
# Du Server au Client : 
```json
{
    "Id_screen" : /*integer*/,
	"type" : "annonce",
    "parameters" : {
        "type" : "information" /* ou warning, ou autre */,
		"content" : "Contenu de l'annonce"
    }	

}
```
A COMPLETER
