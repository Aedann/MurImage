# Architecture du projet : 
![https://mathisvermeren.github.io/MurImage/](./Website/Frontend.png)


```mermaid
---
title: "Project Architecture"
---
flowchart
	3(["Online NodeJS Server\nUploading Images and updating screens info \nhttps://glitch.com/edit/#!/mountain-big-basement "]) <-.-> 4[("Imgur\nImage Database")]
	style 4 fill:#ffffff
	4 -.-> 102565["Local NodeJS Server\nCalling APIs and \ncontrolling clients"]
	3 -.-> 102565
	281473[["Online Website\nHumain/Machine Interface \nhttps://mathisvermeren.github.io/MurImage/\n"]] <-.-> 3
	102565 --> 2("Raspberry Pi\nRunning Godot client")
	2 --> 848101["Screen"]
	4 -.-> 281473
	968207("Raspberry Pi\nRunning Godot client") --> 1["Screen"]
	475894("Raspberry Pi\nRunning Godot client") --> 445265["Screen"]
	102565 --> 475894
	102565 --> 968207

%% Mermaid Flow Diagram Link
%% Keep this link to make future edits to your diagram
%% https://www.mermaidflow.app/flowchart#N4IgZgNg9g7iBcoB2UAmBTAzgg2qGAlqgC4AWCAjACxUA0Ip6BA5qcQgBwAM9RCIFEPQAOUTAWIEoSBKAAeCAExcqAOkUBmDQHZFANgCseihwqLd9AJ5KqHdYsVUjmqlwMauegL71UAQ2I-WRAIPwAjdAh+AGUAYwAndHQZeni-JABrTAARNJgZRB8QYT9EpGIAJXSMhB4QVDzo4ksIdARieIBXdCLm4Tb4EETYwKRmVoA5NDaRMQkpJABBMMwoCE7iAfklFXUtXUNjU3NFKxs7B0dnDVd3TyLMSPQR9FQEMD8IR9805mYCMbvT6PHz4IhkHYUeiMFhsBAATjqfEGiiExTmkmkwQU8Bo8NUBnhBg42m08PJ8L0ig4BjO8GoegJOnhGmoFAo2i48KoiiK-kCwVCESigyqmGEEXi8UsAAIAAoEAA6SAqnSQSABzBlAHE0FBiDLYhACMliNhUtUcnkCsAiiUypVqrUfn4YE0WgMOt1epZ+vx4lA1RhUBVnqNxugphg0aJxJilis1hstiAcXiCUSSWSKVSaXSGUyyayqOzOdzefRHq0Xm94B8vugXX9NUCG6CQIQSOR4BoOBxoUxWOx6Z5eLWQBoYxiFtjKCp8Q49FRtHouBR4Y5e-nbKoaAZ2YjtAZbPCKHyAkFECFwpF+AB5JDGpDoGVR9AAKWiMui6HiADdf2VABVYRoD8VBNRlABJABbPxmCwGV0lQGVOmEflIMwBIkiQTAZQBMAoBlZU2GIYRMHgAB6SjxgkWJSFUWIoBgyjXgkSiAGIAEJKJgwNyj8AEAFowhYES-EeGDTRlNE0kyK1XRtO1SlNKpMmdepGmaVp2i6Hp6D6AZigICAIDfKc4wWZZVnWTZZxHKgF30ZdV3XTd+xAax6R3PcDy4I8TzPSsnhrVtvk0+D-kBOtgX0sEu0ofcB1hYd4W0Md+CoCz5ixK8cURfFjCcVw+xMQx0s8hADDcDMKDcChWQ0Y9920c8BSvIVb0GWDmE6eJlVg+CX2yC8wgkmYhktXJFNkZSHTUmp4DqBpXXdHSYobSttKwXBwBMiB4A4sBjpOkAAF0fT9QZ+XCcbzNmSzpGspM7LyhEuVUIrjy4UqOHKulqoMWr6sa5qOQeELNlretwpW5tophuKO3BbtqDoBhBzheBuAywY930AxsvjezlCBjQNz0ItFDSlcqA0OkOA0XdKTuHkNEUCg9D0Dg2svUBOpFEA4kSZI0UwbbsHgHAzoteTpvyWaRBU8oFo0la3W23TvQM30jOGcNJmmMXIdeMLGwi+HmDNh6coTGzkxJmryf0KmaaXenKuxpnHMMDw2Y5rmefbTsIW89GYSHTgkXHDhbDqwQbeJt74GUJnFy4HRqrq8lSXzQxVA3XQOTK9wVw0S69bDdII3u+oL0FG9BeFnCxYl3AZcmuXrUV4plcddSlpdDWPS1-SQCrMNTY28LY1t57bJTHFU-sVdM7XLkabzoHC457QS50PRy6bKKrenpGQ9Rjh4WSyP6WoXGBC4RQjEJxOZ2TvRKVUJ-lwcbQOGpNTa+ns0aqG0DyOqpdDAbjSrzBuwp+AABkoCxE+K+aYn5vy-gAv1JAABhT4T4tSLDlFBPCyFiJICYuUAMplIJGhNOUc04825Sw7nJLI8slJK3mk6QeEVh7rS9GPQy-oq5jENtGYK1YobW3RI9O2L1F4IE-oyH+uhzAAIAeSbcahwEczcAfQk1NWrHxbGfYOKMEC9jqBHLG7J0bIhANSag2hJxv1ytsekhwC6p2qqeRmJh8wGCBgYRc8JuDaLXDzXw9cOqN3vI+AEL4ADq6AVgSHQMqAAEp0OCAJKIAFk-D0WSdBcov4PixBfCRYgZEKLUTgmQAgmAcFSTKKof4ZBOhhFUFIIpfVBoIUosqVuHpJbS1lpw7uhQeGqT4ctLSI94DCIrvwTAPSAwbGSbXCeoUz5mIRrFDxiiF72U5kYXxGd-EmFZB5LyFAQkEnCZE6m0SvCWISvSNKN8saIgfsuYk3Iibvy8TQOwgczCuGhf5KgegAZ2DJGEumu9ESxwMGswYWykDBlDCMaukiJo3XgV1EAYoJS-mlPKJUKo1QajGDqPUBo8HGlNGM1oEz2FTRmbaOZKsFlDzWp6PSEMZFT2ESc+eDtk7gs+tzKFKhFXgPhZ7YkYCiSblRT9JwfJfgnzNp80OpNfmpWjvwSkAD-Igs8amBAsqbjKqPJoectJPaaCBg1ckbNuBP25DEkAoisX8VxeImuRtYntX5gk0UEkKVSllAqZUqp1SQV1KgfUMoWWMLNOynabCpkKQVrM3uvCB6LNWprFZIrpGT2hsc+Rc9ExnJlTuB1cKnV+yJHSd1qhPXlhsb62wurIrmMRl4DurwEITNAIGkAsROji2YmiOC8QMi-iaKUYc6IATsHoCutd8QACiOL+CiB3WiHdv4SnxhSVYlOdRxbLNAOLAMa7b1fKhPUFpoE-BeRAACJ8bQihOMnegISDU1wMg8I4BO49AzxGqfwdxAbSgIS3VlSs8HqnZOQutAQaJAjxDQzhnFeHYPEqvC0w9EFJBHM2teYU76jXowFtkzGw5HCitrXI9IBAmniurTO3W-B52Lpgsu0oB6N3xC3VAfoKQQD7t-Me8cZ7ygXoqWkEYCwmPdmUFtJ9LDX3oF05QXw37Qh-oA8kkADwsNGQw3Bvq2HcNGVg4RtD-A6rP0MAR1D6BiAkdQHh1ED9QNCXJG4Ukx4-aOd4-x2sEq66RpYcsnARmoBrsOmECgOWwh6HOvQAWpmU4scbmxlKNheCYGo-MOjIIa37LHbQITV050LuIEuvdkn12Edk-JiTq7lMnsGGp3d-7NPXp03e-TqX1rPo6Jlkzd7P0QXFJZ-g1nny2cw85oyyHVh7aCyFvzRGAteafi-U7xHXP8FC-+8c4X3CsiXDyDOlM0TxYCAJ7oEa+ZzYGOll9S3su5dywVjuxWZtleFBV2+jhqu1do6fZr48TZ1rbC1gNwnBiic6+J7rQ34jSa3WNwbB6VOnqgOe3gk3tPSBK7Nx982MtvpW+Z9bv7NtJO23Zvbd3TDLgO-Z47Rl7sefO4MZDEvAu3ZRBex7qAEJCVZJyKkmiWQFfoF92RVbfvJf+8zwHrP0Cg7yxDorjdGcw8iHDrGCP-01Zo6O2KXGmuu6x7OvHXXFM9eJ31-gcnRaE4pyN7d6naebC0zembD7K0LeMyVoKTmENucu753bqfRd3eu5L5xufZekbFwr-g4WNUkh+uvFkn2NQJbkRRhbaWTdm-B4VhjkRreW9h+xqrjukcu8x2jsVGOGutaMt7gnvuick8DwNkPw3VPU4jxNqPU2Gex4Myz4HbOP189TznzPLmi9eYL-wWOpg1wF+z4MWDIGldge+ofGkBjyQ17499kf5sG8A92tv03HE8tW9Icrdocu9bce9StEdnd6sx49lddmsx8RMOsfclN-dN1Z9g8p9Q9F8acV8r16ckBGc49DM-8k8Ocf0rMecgND8HMxYRc5d8MDJ-Mt0XEhcr8GD7s79lcypew3t1wjA38689cv84lG91ogdFsssACwd8s28ocvkHdWMICHcqNoCUcPch9uMLFPccd2sxNydet0DBgg8FNUDKdRsl9xtL1o9psFDiCt9JDltd8aDzVuZlBtA6CjsODT8b92Dj95cwt78hJHJ1w4VuAuYQlBCP969RCf8pZm9pDzc5CQCFCbcIA7cONHEnc6t1DB84Cp4EDsc2sJ8DC0CZMMDTC-dzDw8rC6cY87DN8UxSCVs99EM8Yjwr5HNDss8GD3NmDMonACY-Dgti9AjlcOYSwfY+xD5YMdcCj61v8jdf9HCW9ZDgDGNQD290jlCsj+8YC3d4CPdEDcdkDJ9UCZ9jC58sCF8qdcDrC19CCN84iE8lsk9Wi08fNX4U8j8RiT8mCzt0MOjgV-ibt-D88xiwN2RexeC4UgUojDj6NFjK0JDjNViLctjO8tiMje9VCciDVGsETR8ijx9TjSiLiQATDSjqiydI98D6ijV7CmjHC3iXCb908vjuifiTsQS88LV3DhjuSHtS8gjOQUUmpqYmouB4T5jETYilj4i-80TkiNjUiwDtjKtIC+81D8TND3c2wO4-wTQYBRByjk4TEwEnB-IbhjwSx1w6Q4UuAwEi44VHln40oPIAAvKAJdJaVQWOSmJwVkTQKkMJSkD5czeCNIGCQpALPwEaFLCCfWd+EAAAFQACE0QwAAxyhik6lfxghJBiA8M5QAwAArMMGURYBDUgTJEYPqagr9JMgCTlegJiGCKSJhduVs0ITAR4TlYDGrOQE04gOUdISIO8AbYQ+gcYKAMaCAajBCFMnHUAVAToT4ORQDJctrGyPgegUDYpInLcoySk1stYKAeIfgRI1vIoGcuct8I8gs3Q-WAlSMcNOdM8i8wYDiLgH838tEMaWIDIZgbFVAPBD8y8k6U6egMIc8jAeIMC6AT8kAb838n8-82C38FMmswC58Xs9ZNYXcx3EaTARgT-D5IAA
```

Des clients tournent pour chaques écran. Ils sont codés en Godot.
Un server local Node.JS est connecté aux clients via un websocket et à internet.
Les données à afficher sont stockées soit sur le repo github sous data/content.json soit sur le serveur distant NodeJS : https://mountain-big-basement.glitch.me/content (hebergé sur glitch gratuitement, il faut attendre une dizaine de secondes pour qu'il se lance et reste allumé 12h).
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

## Site Web  
#### Backend 
Le backend tourne sur glitch.me à l'addresse (https://mountain-big-basement.glitch.me/).
Le serveur s'éteint tout les 8h, il faut alors attendre une dizaine de secondes pour qu'il se relance.
Le backend a trois routes : 
 * GET /content : qui renvoie content.json, les informations à afficher à chaque écran et pour chaque timeline. 
 * POST /content : qui permet d'enregistrer un nouveau content.json.
 * POST /uploadImgur : qui enregistre une image envoyée, l'envoie ensuite à l'API du site de téléchargement d'images Imgur avec un token d'identification, puis renvoie l'URL de l'image au client et supprime l'image stockée (car le serveur gratuit a un stockage très limité).  

 Ce serveur est codé en NodeJS et ExpressJS et utilise quelques libraries comme :
**ExpressJS** : Un framework web minimaliste pour Node.js, simplifiant la création d'applications web en utilisant des concepts tels que les routes et les middlewares.
**dotenv** : Une bibliothèque Node.js permettant de charger des variables d'environnement depuis un fichier `.env`, permettant de séparer les tokens du reste du code.
**cors** : Un middleware Express facilitant la gestion des politiques CORS (Cross-Origin Resource Sharing) pour autoriser les requêtes HTTP depuis des domaines différents.
**axios** : Une bibliothèque HTTP basée sur les promesses pour effectuer des requêtes HTTP depuis le navigateur ou Node.js.
**fs** : Le module système de fichiers intégré à Node.js, permettant la manipulation des fichiers, la lecture et l'écriture, ainsi que la gestion des répertoires.
**path** : Un module Node.js fournissant des utilitaires pour travailler avec les chemins de fichiers et de répertoires, offrant des fonctionnalités pour normaliser et résoudre les chemins.
**body-parser** : Un middleware Express permettant de traiter le corps des requêtes HTTP, notamment l'extraction des données des formulaires ou des charges utiles JSON.
**mime-types** : Une bibliothèque permettant de déterminer le type MIME d'un fichier à partir de son extension, utile lors du traitement des fichiers dans des applications web.
**multer** : Un middleware Express spécialisé dans le traitement des données de formulaire de type `multipart/form-data`, souvent utilisé pour gérer les téléchargements de fichiers dans les applications web.

#### Frontend 
Le frontend est hebergé gratuitement grâce à github-pages à l'addresse https://mathisvermeren.github.io/MurImage/. Il est réalisé avec le framework ReactJS et deployé avec viteJS. La fonctionnalité principale de celui ci est de pouvoir sélectionner plusieurs écrans et plusieurs crénaux temporels en même temps, pour par exemple mettre une image coupées en plusieurs écrans ou pour fixer un écran pendant plus de 10s en 1 clique. Il a été réalisé en une quarantaine d'heure.

# Structure Json pour chaque scène : (A Compléter)
(A Compléter pour chaque type)

 * [Image](type_database/Image.md)
 * [Meteo](type_database/Meteo.md)
 * [RATP](type_database/RATP.md)
 * [PlanningEvent](type_database/PlanningEvent.md)
 * [ResaSalles](type_database/ResaSalles.md)
 * [Annonce](type_database/Annonce.md)
 * [WeeklyPokemon](type_database/WeeklyPokemon.md)
 * [LogoPolytech](type_database/LogoPolytech.md)
 * Ajouter les types suivants : 
 * heure
 * logo
 * modulable...
 * calendrier vacances
 * news
