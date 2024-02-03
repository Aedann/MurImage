extends Node2D

var title_font
var body_font
var red
var black

#type soit info soit warning
func display(type: String, title:String, body:String):
	$Title.text=title
	$Body.text=body
	black = Color(0, 0, 0, 1)
	#set("theme_override_colors/title_font",black)
	$Title.modulate = black
	$Body.modulate = black
	if type=="warning":
		red = Color(1.0,0.0,0.0,1.0)
		#set("theme_override_colors/title_font",red)
		$Title.modulate = red
		

func creerFont(name,sz):#taille sz
	var bf 
	bf=DynamicFont.new()
	bf.font_data = load(name)
	bf.size = sz
	bf.use_filter = true
	return bf

# Called when the node enters the scene tree for the first time.
func _ready():
	#title_font=creerFont("res://OldNewspaperTypes.ttf",200)
	$Title.add_font_override("title_font",title_font)
	#body_font=creerFont("res://typewcond_bold.otf",2000)
	$Body.add_font_override("body_font",body_font)


func _process(delta):
	display("warning","TITRE","body du texte lsljĵez\nkpqkhf")	
