# Krivokuca Zoran
extends Node2D
# Code qui marche en affichant pendant 10s l'heure et en boucle la météo prise au moment X
# Si vous voulez le modifier c'est facile faut utiliser a la place du timer par exmeple un message reçu par réseau qui affiche l'heure
# J'ai mis des pistes sur l'affichage de la météo en serveur client sur la fin du code, je pense qu'il peut etre facilement réutilisable pour l'heure
var display_duration = 10.0 # compteur qui compte pendant 10 secondes pour afficher le temps

onready var label = $Label
onready var label2 = $Label2
onready var http_request = $HTTPRequest
var display_time = true # variable utile pour la fontion process
onready var weather_icon = $WeatherIcon

func _ready():
	show_label_for_duration(display_duration) # va afficher pendant 10 s 

func show_label_for_duration(duration):
	
	update_datetime() # pour formater l'heure en une heure pouvant etre afficher
	label.show()
	
	var timer = get_tree().create_timer(duration)
	yield(timer, "timeout") # timer de 10s
	
	display_time = false # Plus jamais on va afficher l'heure
	label.hide()
	fetch_weather_data() # on passe  à l'affichage de l'ehure

func update_datetime():
	if display_time:
		var date_dict = OS.get_datetime()# prends le temps de l'os pour définir l'heure courant
		var formatted_date = "%04d-%02d-%02d %02d:%02d:%02d" % [date_dict.year, date_dict.month, date_dict.day, date_dict.hour, date_dict.minute, date_dict.second] #Formatage du temps, facilement modulable par choix
	
		label.text = formatted_date #Le label qui sert à afficher le temps
	
# warning-ignore:unused_argument
func _process(delta):
	update_datetime()# Appel de la fonction pour changer frame par frame
	
func fetch_weather_data():
	var city_id = "2988507" #L'id de paris
	var api_key = "2938dc6e6ca893ba86a0b4dc49a811c4"# ma clé de l'api 
	var url = "http://api.openweathermap.org/data/2.5/weather?id=" + city_id + "&appid=" + api_key # L'url permetant le fonctionnement des envoie de donneés
	http_request.request(url)## pour faire la request

func _on_HTTPRequest_request_completed(result, response_code, headers, body):
	var weather_data = parse_json(body.get_string_from_utf8())# Permet de récuperer les donneés du site de l'api
	if weather_data: #Si le weather_data a bien reçu des données
		if "weather" in weather_data: # Si le "weather" se trouve dans le weather_data alors il a réussi a prendre les données des temp
			var weather_description = weather_data["weather"][0]["description"]#Pour recuperer la description du temps (ex: nuageux......) et la formater
			var temperature = weather_data["main"]["temp"] - 273.15 # Pour récuperer la température et la formater en dégrée
			var icon_code = weather_data["weather"][0]["icon"]  # Pour récuper l'id du type de la description du temps,par exemple si il fait "clear_sky" alors on aura 01d
			
			update_weather_icon(icon_code) # Pour mettre a jour l'icone 
			var weather_info = "Weather: {0}, Temp: {1}°C".format([weather_description, String(temperature)]) # formater le texte a afficher dans le label
			label2.text = weather_info # on affiche le texte du temps sur le label
		else:
			print("La clé 'weather' n'est pas présente dans la réponse.") # But pour le debug,
	else:
		print("Échec de la requête HTTP. Code de réponse:", response_code) # but pour le debug
# fonction qui sert a mettre à jour les icones du temps		
func update_weather_icon(icon_code):
	# C'est un dictionnaire qui sert a associer les images à l'id de la description, NE SURTOUT PAS CHANGER LES ID CAR SINON CA NE MARCHERA PLUS, vous pouvez changer le chemin de l'image si neccesaire, pour plus de référencement voir ce site si besoin https://openweathermap.org/weather-conditions
	var icon_mappings = {"01d": "res://1-s.png","03d": "res://cloudy.png","11d": "res://storm.png","13d": "res://snow.png","50d": "res://mist.png","10d": "res://rainy.png","02d":"res://02d@2x.png","09d":"res://09d@2x.png","04d":"res://04d@2x.png"}
	if icon_code in icon_mappings:# on regarde si on a bien une id correspodantes dans le dictionnaire
		var icon_path = icon_mappings[icon_code] # on associe la clé trouvé pour avoir l'image
		var icon_texture = load(icon_path) # on load la texture pour l'afficher en tant qu'image
		if icon_texture:# pour voir si c'est non vide
			weather_icon.texture = icon_texture #ob affiche simplement l'image
		else:
			print("Impossible de charger l'icône météo pour", icon_code) # But de debug
	else:
		print("Pas d'icône définie pour le code météorologique", icon_code) # but de debug

# ////////FONCTION SERVANT POUR LA PARTIE SERVEUR-CLIENT,a Adapter avec mon code pour que sa fonctionne
#func _on_websocket_message(message):
   # if message == "update_weather":
	 #   receive_command("update_weather")

#func receive_command(command):
 #   if command == "update_weather":
  #      fetch_weather_data()
#func display(temperature : float, temp_max : float, temp_min : float, cityname : String, hum : float)
	
