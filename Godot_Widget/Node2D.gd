extends Node2D

func _ready():
	display("res://icon.png", true, Vector2(50, 50), Vector2(200, 150))

func display(image_path: String, cut: bool, startCoords: Vector2, stopCoords: Vector2):
	# Load the image from a file
	var image = Image.new()
	
	# Check if the image can be loaded
	if image.load(image_path) == OK:
		# Create an instance of ImageTexture and use it to create a texture from the loaded image
		var image_texture = ImageTexture.new()
		image_texture.create_from_image(image)

		# Create a TextureRect control
		var texture_rect = TextureRect.new()
		texture_rect.texture = image_texture
		texture_rect.rect_min_size = Vector2(startCoords[0], startCoords[1])
		texture_rect.rect_max_size = Vector2(stopCoords[0], stopCoords[1])
		texture_rect.draw(image_texture)
		

		if cut:
			# Set the region to be displayed based on the start and stop coordinates
			texture_rect.rect_min_size = stopCoords - startCoords
			texture_rect.rect_position = startCoords
		else:
			# If cut is not enabled, display the entire image
			texture_rect.rect_position = Vector2(0, 0)

		# Add the TextureRect to the scene
		add_child(texture_rect)
	else:
		print("Invalid image path.")
