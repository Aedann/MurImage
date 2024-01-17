extends MeshInstance


func _process(delta):
	transform.basis = transform.basis.rotated(Vector3.DOWN,delta*2)
