extends Node

# The URL we will connect to
export var websocket_url = "mur-images.khawand.dev:8080"

# Our WebSocketClient instance
var _client = WebSocketClient.new()

onready var globalImage = Image.new()

func _ready():
	# Connect base signals to get notified of connection open, close, and errors.
	_client.connect("connection_closed", self, "_closed")
	_client.connect("connection_error", self, "_closed")
	_client.connect("connection_established", self, "_connected")
	_client.connect("data_received", self, "_on_data")

	# Initiate connection to the given URL.
	var err = _client.connect_to_url(websocket_url)
	if err != OK:
		print("Unable to connect")
		set_process(false)
	
func _closed(was_clean = false):
	# was_clean will tell you if the disconnection was correctly notified
	# by the remote peer before closing the socket.
	print("Closed, clean: ", was_clean)
	set_process(false)

func _connected(proto = ""):
	print("Connected with protocol: ", proto)
	var authdict = "{\"type\":\"authenticate\",\"id\":\"1\"}"
	_client.get_peer(1).put_packet(authdict.to_utf8())

func _on_data():
	print("AAAAA")
	print(_client.get_peer(1).get_available_packet_count())
	var packetStr = _client.get_peer(1).get_packet().get_string_from_utf8()
	if(packetStr.length() < 2048):
		print("Got data from server: ", packetStr)
	else:
		print("Got data from server: ", packetStr.substr(0,2048))
	var JSONPacket = JSON.parse(packetStr)
	if JSONPacket.error != OK:
		print("Error on parsing JSON")
		print(JSONPacket.error)
		print(JSONPacket.error_string)
		print(JSONPacket.error_line)
		return

	if(!((JSONPacket.result).has("type"))):
		print("Malformed JSON, missing type")
		print("Recieved JSON :")
		print(JSONPacket.result)
		return

	if(!((JSONPacket.result).has("parameters"))):
		print("Malformed JSON, missing parameters")
		print("Recieved JSON :")
		print(JSONPacket.result)
		return
		

	var params = JSONPacket.result["parameters"]
	print(params)

	match JSONPacket.result["type"]:
		"welcome":
			print("Received handshake from server")	

		"image":
			match params.image_type:
				"jpg":
					globalImage.load_jpg_from_buffer(Marshalls.base64_to_raw(params.image_stream))
				"png":
					globalImage.load_png_from_buffer(Marshalls.base64_to_raw(params.image_stream))
				"webp":
					globalImage.load_webp_from_buffer(Marshalls.base64_to_raw(params.image_stream))
				_:
					print("Image error - wrong or unsupported format" + params.type);
					return
#			var startCoords = Vector2(params["start_coordinates"].x,params["start_coordinates"].y)
#			var stopCoords = Vector2(params["stop_coordinates"].x,params["stop_coordinates"].y)
#			var cut = bool(params.cut)
			$ImageDisplay.display(globalImage,true,Vector2(0,0),Vector2(100,100))

		"transport":
			pass

		"announcement":
			pass	

		"weather":
			pass
			$WeatherDisplay.display(params.temperature, params.temperature_max, params.temperature_min, "Paris", params.humidity)
		
		"3D":
			pass
			
		"pokemon":
			pass
			
		_:
			# No recognized type found
			print("Malformed JSON, unrecognized type" + JSONPacket.result["type"])
			print("Recieved JSON :")
			print(JSONPacket.result)

	return
		
func _process(delta):
	_client.poll()
#	print(_client.get_peer(1).get_available_packet_count())
#	print(_client.get_connected_host())
#	print(_client.get_connection_status())
