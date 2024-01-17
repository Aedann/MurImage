# Gauvain Lucas
extends Node2D

# ////////FONCTION SERVANT POUR LA PARTIE SERVEUR-CLIENT,a Adapter avec mon code pour que sa fonctionne
#func _on_websocket_message(message):
   # if message == "update_weather":
	 #   receive_command("update_weather")

#func receive_command(command):
 #   if command == "update_weather":
  #      fetch_weather_data()
onready var WeatherIcon = $WeatherIcon
# textures
var textureWallpaper
var textureUmbrella
var textureWater
var textureMaxTemp
var textureMinTemp
var textureIconWeather

# debug (envoyé par api météo)
var temperature : float = 12.3;
var temp_max : float = 15.1;
var temp_min : float = 10.1;
var cityname : String = "Paris";
var humidity : int = 20; # en %
var precipitation : int = 3; # en %
var id_weather : int = 6; # de 1 à 9

# fonts
var fontCity;
var fontTemperature;
var fontTemperatureMinMax;
var fontHumidityPrecipitation;
var fontWeather;


func _ready():
	textureWallpaper = ImageTexture.new()
	textureWallpaper = load("res://icon/wallpaper.jpg")
	$wallpaper.texture = textureWallpaper
	
	textureUmbrella = ImageTexture.new()
	textureUmbrella = load("res://icon/umbrella.png")
	$umbrella.texture = textureUmbrella
	
	textureWater = ImageTexture.new()
	textureWater = load("res://icon/water.png")
	$water.texture = textureWater
	
	textureMaxTemp = ImageTexture.new()
	textureMaxTemp = load("res://icon/max.png")
	$maxArrow.texture = textureMaxTemp
	
	textureMinTemp = ImageTexture.new()
	textureMinTemp = load("res://icon/min.png")
	$minArrow.texture = textureMinTemp
	
	fontCity = creerFonteSF(80)
	fontTemperature = creerFonteSF(100)
	fontTemperatureMinMax = creerFonteSF(25)
	fontHumidityPrecipitation = creerFonteSF(25)
	fontWeather = creerFonteSF(40)
	$LabelTemperature.add_font_override("font", fontTemperature)
	$LabelMaxTemperature.add_font_override("font", fontTemperatureMinMax)
	$LabelMinTemperature.add_font_override("font", fontTemperatureMinMax)
	$LabelCityName.add_font_override("font", fontCity)
	$LabelHumidity.add_font_override("font", fontHumidityPrecipitation)
	$LabelPrecipitation.add_font_override("font", fontHumidityPrecipitation)
	$LabelWeather.add_font_override("font", fontWeather)
	# fonction display pour l'affichage (j'ai passé en paramètre les variables déclarés
	# en dessous du commentaire debug ligne 21
	display(temperature, temp_max, temp_min, cityname, humidity, precipitation, id_weather);
	
func creerFonteSF(sz):
	var bf
	bf = DynamicFont.new()
	bf.font_data = load("res://fonts/SF-Compact-Display-Black.ttf")
	bf.size = sz
	bf.use_filter = true
	return bf
	
func display(temperature : float, temp_max : float, temp_min : float, cityname : String, 
	hum : int, precipitation : int, id_weather : int):
	
	if id_weather == 1:
		textureIconWeather = load("res://icon/clearsky.png")
		WeatherIcon.texture=textureIconWeather
		$LabelWeather.text = "Ensoleillé"
	elif id_weather == 2:
		textureIconWeather = load("res://icon/fewclouds.png")
		WeatherIcon.texture=textureIconWeather
		$LabelWeather.text = "Partiellement couvert"
	elif id_weather == 3:
		textureIconWeather = load("res://icon/clouds.png")
		WeatherIcon.texture=textureIconWeather
		$LabelWeather.text = "Couvert"
	elif id_weather == 4:
		textureIconWeather = load("res://icon/clouds.png")
		WeatherIcon.texture=textureIconWeather
		$LabelWeather.text = "Couvert"
	elif id_weather == 5:
		textureIconWeather = load("res://icon/showerrain.png")
		WeatherIcon.texture=textureIconWeather
		$LabelWeather.text = "Faible pluie"
	elif id_weather == 6:
		textureIconWeather = load("res://icon/rain.png")
		WeatherIcon.texture=textureIconWeather
		$LabelWeather.text = "Pluie"
	elif id_weather == 7:
		textureIconWeather = load("res://icon/thunderstorm.png")
		WeatherIcon.texture=textureIconWeather
		$LabelWeather.text = "Orage"
	elif id_weather == 8:
		textureIconWeather = load("res://icon/snow.png")
		WeatherIcon.texture=textureIconWeather
		$LabelWeather.text = "Neige"
	elif id_weather == 9:
		textureIconWeather = load("res://icon/mist.png")
		WeatherIcon.texture=textureIconWeather
		$LabelWeather.text = "Brouillard"
	
	if has_node("LabelTemperature"):
		$LabelTemperature.text = str(temperature) + "°"
	else:
		print("LabelTemperature non trouvé")

	if has_node("LabelMaxTemperature"):
		$LabelMaxTemperature.text = str(temp_max) + "°"
	else:
		print("LabelMaxTemperature non trouvé")

	if has_node("LabelMinTemperature"):
		$LabelMinTemperature.text = str(temp_min) + "°"
	else:
		print("LabelMinTemperature non trouvé")

	if has_node("LabelCityName"):
		$LabelCityName.text = cityname
	else:
		print("LabelCityName non trouvé")

	if has_node("LabelHumidity"):
		$LabelHumidity.text = str(hum) + "%"
	else:
		print("LabelHumidity non trouvé")

	if has_node("LabelPrecipitation"):
		$LabelPrecipitation.text = str(precipitation) + "%"
	else:
		print("LabelPrecipitation non trouvé")

	
