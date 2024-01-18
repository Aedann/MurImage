
extends Node2D

onready var Carte_France = $Carte_France
onready var Fond=$Fond
onready var http_request = $HTTPRequest
#Bibli à utiliser si on récupére depuis godot sinon non
var city_ids = ["2988507","2995469","3014728","3030300","2983990","2990969","6454707","2973783","2998324","6454924","6454307","2972315","2996944","3031582"]
var api_key = "2938dc6e6ca893ba86a0b4dc49a811c4"
# ma key mec
onready var Paris = $Paris
onready var Marseille = $Marseille
onready var Grenoble = $Grenoble
onready var Brest = $Brest
onready var Rennes = $Rennes
onready var Nantes =$Nantes
onready var Rouen = $Rouen
onready var Lille = $Lille
onready var Lyon = $Lyon
onready var Strasbourg=$Strasbourg
onready var Nice =$Nice
onready var Bordeaux =$Bordeaux
onready var Toulouse =$Toulouse
onready var Nancy=$Nancy

# Called when the node enters the scene tree for the first time.
func _ready():
	# Pour récup la météo
	fetch_weather_for_all_cities()
	# sert a loader le background, 1 la carte et l'autre un fond blanc
	var carte_texture=load("res://Capture d’écran du 2024-01-18 18-13-18.png")
	Carte_France.texture=carte_texture
	var Fond_img =load("res://Sans titre.png")
	Fond.texture=Fond_img
	# appeler les trucs comme ça pour faire fonctionner en intern
	#update_weather_display("Paris",13,1)
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	Carte_France.rect_size = get_viewport_rect().size
	# Pour que qaund on met en plein ecran la carte s'adapte
#!!!!!!! LES CODES CI DESSOUS SONT INUTILES SI ON RECUPERE LES DONNEES DU COTER SERVEUR
# !!!! CELA SERT JUSTE POUR TESTER COTE CLIENT
func fetch_weather_for_all_cities():
	request_weather_data_for_city(0)
# Pour faire la request a tout les villes
func request_weather_data_for_city(index):
	if index < city_ids.size():
		var city_id = city_ids[index]
		var url = "http://api.openweathermap.org/data/2.5/weather?id=" + city_id + "&appid=" + api_key
		http_request.request(url)
# on va demander au site ce que on besoin
func _on_HTTPRequest_request_completed(result, response_code, headers, body):
	if response_code == 200:
		var weather_data = parse_json(body.get_string_from_utf8())
		if "weather" in weather_data and "main" in weather_data:
			var city_name = weather_data["name"]
			
			var temperature = weather_data["main"]["temp"] - 273.15 # Convertir de Kelvin en Celsius
			print(city_name)
			var current_index = city_ids.find(str(weather_data["id"]))
			if current_index >= 0 and current_index < city_ids.size() - 1:
				request_weather_data_for_city(current_index + 1)
				# sert de test
			var icon_code=5
			update_weather_display(city_name, temperature,icon_code)
		else:
			print("Données météo non disponibles")
	else:
		print("Échec de la requête HTTP. Code de réponse:", response_code)
# Pour afficher les icones
#Fonctionnenera avec le serveur


#LES CODES LES PLUS IMPORTANTS A PRENDRE pour faire fonctionner en client, il faut juste appeller
# update_weather_display quand besoin pour afficher correctement
func display(city_name: String, id_weather: int):
	var weather_icon_path = get_weather_icon_path(id_weather)
	var city_node = get_node_or_null(city_name + "_icon")
	#print("city_node for", city_name, "is:", city_node)
	if city_node:
		city_node.texture = load(weather_icon_path)
	else:
		print("Icon node not found for", city_name)
# set a savoir quoi load
# Fonctionnera avec le serveur
func get_weather_icon_path(id_weather: int) -> String:
	match id_weather:
		1:
			return "res://clearsky.png"
		2:
			return "res://fewclouds.png"
		3:
			return "res://clouds.png"
		4: # Comme 3 et 4 sont tous les deux des nuages, vous pouvez les regrouper
			return "res://clouds.png"
		5:
			return "res://showerrain.png"
		6:
			return "res://rain.png"
		7:
			return "res://thunderstorm.png"
		8:
			return "res://snow.png"
		9:
			return "res://mist.png"
		_:
			return "" # Retournez un chemin vide ou un chemin par défaut si id_weather n'est pas reconnu
# La fonction importante qui sert a afficher la météo avec la temperature et icone
# Fonctionnera aussi avec le serveur
# Il faut juste créer un code qui permet d'envoyer en argument sur cette fonction
# un nom de ville, la temp et l'id de l'icone ( de 1 a 9)
func update_weather_display(city_name, temperature,id_weather):
	# Arrondit la température au nombre entier supérieur
	var rounded_temperature = ceil(temperature)

	# Vérifie le nom de la ville et met à jour le label correspondant
	if city_name == "Paris":
		Paris.text = str(rounded_temperature) + " °C"
		Paris.show()
		
		display("Paris",id_weather)
	elif city_name == "Marseille":
		Marseille.text = str(rounded_temperature) + " °C"
		Marseille.show()
		#id_weather=3
		display("Marseille",id_weather)
	elif city_name == "Grenoble":
		Grenoble.text = str(rounded_temperature) + " °C"
		Grenoble.show()
		#id_weather=3
		display("Grenoble",id_weather)
	elif city_name == "Brest":
		Brest.text = str(rounded_temperature) + " °C"
		Brest.show()
		#id_weather=4
		display("Brest",id_weather)
	elif city_name == "Rennes":
		Rennes.text = str(rounded_temperature) + " °C"
		Rennes.show()
		#id_weather=5
		display("Rennes",id_weather)
	elif city_name == "Nantes":
		Nantes.text = str(rounded_temperature) + " °C"
		Nantes.show()
		#id_weather=6
		display("Nantes",id_weather)
	elif city_name == "Rouen":
		Rouen.text = str(rounded_temperature) + " °C"
		Rouen.show()
		#id_weather=7
		display("Rouen",id_weather)
	elif city_name == "Lille":
		Lille.text = str(rounded_temperature) + " °C"
		Lille.show()
		#id_weather=8
		display("Lille",id_weather)
	elif city_name == "Lyon":
		Lyon.text = str(rounded_temperature) + " °C"
		Lyon.show()
		#id_weather=9
		display("Lyon",id_weather)
	elif city_name == "Strasbourg":
		Strasbourg.text = str(rounded_temperature) + " °C"
		Strasbourg.show()
		#id_weather=1
		display("Strasbourg",id_weather)
	elif city_name == "Nice":
		Nice.text = str(rounded_temperature) + " °C"
		Nice.show()
		#id_weather=2
		display("Nice",id_weather)
	elif city_name == "Bordeaux":
		Bordeaux.text = str(rounded_temperature) + " °C"
		Bordeaux.show()
		#id_weather=3
		display("Bordeaux",id_weather)
	elif city_name == "Toulouse":
		Toulouse.text = str(rounded_temperature) + " °C"
		Toulouse.show()
		#id_weather=5
		display("Toulouse",id_weather)
	elif city_name == "Nancy":
		Nancy.text = str(rounded_temperature) + " °C"
		Nancy.show()
		#id_weather=7
		display("Nancy",id_weather)
	else:
		print("Météo reçue pour une autre ville:", city_name)

