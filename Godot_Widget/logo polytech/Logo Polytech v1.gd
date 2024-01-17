extends MeshInstance


func _process(delta):
	var input_h = Input.get_action_strength("ui_left") - Input.get_action_strength("ui_right")
	var input_v = Input.get_action_strength("ui_up") - Input.get_action_strength("ui_down")
	
	transform.origin.x += input_h * delta * 5 

	#transform.basis = transform.basis.rotated(Vector3.DOWN,delta*1)
