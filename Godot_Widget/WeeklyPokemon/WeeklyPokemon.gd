extends Node2D

# VARIABLES
# Image of the week
var imageWeek

# Timer for a week
var dureeWeek = 1.5
# var dureeWeek = 604800

# Labels
var pokemonWeek # Pokemon de la semaine
var pokemonName # Nom du Pokemon

# Police d'écriture
var font1
var font2

# Main function
func _ready():
	var timer = get_tree().create_timer(dureeWeek)
	font2=creerFont(25)
	$NomPokemon.add_font_override("font",font2)
	$NomPokemon.modulate = Color(0.7, 0.5, 0.3)
	$WeekPokemon.text="Pokemon de la semaine"
	font1=creerFont(35)
	$WeekPokemon.add_font_override("font",font1)
	$WeekPokemon.modulate = Color(0.8, 0.3, 0.3)
	$WeekPokemon.show()
	while(1):
		imageWeek = ImageTexture.new()
		imageWeek.load("res://001.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#001 Bulbizarre"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://370.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#370 Lovdisc"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://572.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#572 Chinchidou"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://012.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#012 Papilusion"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://200.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#200 Feuforêve"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://702.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#702 Dedenne"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://287.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#287 Parecool"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://529.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#529 Rototaupe"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://074.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#074 Racaillou"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://373.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#373 Drattak"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://122.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#122 Mr.Mime"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://004.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#004 Salamèche"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://506.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#506 Ponchiot"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://035.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#035 Tritonde"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://076.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#076 Grolem"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://645.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#645 Démétéros"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://019.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#019 Rattata"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://568.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#568 Miamiasme"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://233.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#233 Porygon2"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://009.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#009 Tortank"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://146.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#146 Sulfura"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://276.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#276 Nirondelle"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://107.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#107 Tygnon"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://025.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#025 Pikachu"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://422.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#422 Sancoki"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://003.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#003 Florizard"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://007.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#007 Carapuce"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://010.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#010 Chenipan"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://587.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#587 Emolga"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://405.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#405 Luxray"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://095.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#095 Onix"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://255.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#255 Poussifeu"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://062.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#062 Tartard"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://299.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#299 Tarinor"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://006.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#006 Dracaufeu"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://244.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#244 Entei"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://831.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#831 Wooloo"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://197.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#197 Noctali"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://350.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#350 Milobellus"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://762.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#762 Candine"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://092.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#092 Fantominus"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://332.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#332 Cacturne"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://130.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#130 Leviator"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://232.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#232 Donphan"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://387.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#387 Tortipouss"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://015.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#015 Dardargnan"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://195.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#195 Maraiste"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://584.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#584 Sorbouboul"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://398.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#398 Etouraptor"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://444.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#444 Gabite"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://031.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#031 Nidoqueen"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://117.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#117 Hypocéan"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://624.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#624 Scalpion"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://623.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#623 Golemastoc"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://389.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#389 Torterra"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://963.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#963 Dofin"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://498.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#498 Gruikui"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://069.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#069 Chétiflor"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
		imageWeek = ImageTexture.new()
		imageWeek.load("res://674.png")
		$Pokemon.texture=imageWeek
		$Pokemon.show()
		$NomPokemon.text="#674 Pandespiègle"
		$NomPokemon.show()
		yield(timer, "timeout")
		timer = get_tree().create_timer(dureeWeek)
# End of the main program

func creerFont(sz):
	var bf
	bf=DynamicFont.new()
	bf.font_data=load("res://CaviarDreams.ttf")
	bf.size=sz
	bf.use_filter=true
	return bf
