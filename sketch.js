let tablero = [ 
	['','',''],
	['','',''],
	['','',''],
];

let ancho
let altura

let ai = 'X'
let ambiente = 'O'
let jugadorActual = ambiente;




function setup(){
	createCanvas(400,400);
    ancho = width/3
    altura = height/3
    mejorJugada();	
}


function iguala3(a,b,c){
	return (a==b && b==c && a!='');
}

function revisar_victoria(){
	let ganador = null;

	for (let i = 0;i<3;i++){
		if (iguala3(tablero[i][0],tablero[i][1],tablero[i][2])){
			ganador = tablero[i][0];
		}
	}
	for (let i = 0;i<3;i++){
		if (iguala3(tablero[0][i],tablero[1][i],tablero[2][i])){
			ganador = tablero[0][i];
		}
	}
	if (iguala3(tablero[0][0],tablero[1][1],tablero[2][2])){
		ganador = tablero[0][0];
	}
	if (iguala3(tablero[2][0],tablero[1][1],tablero[0][2])){
		ganador = tablero[2][0];
	}
    let disponibles = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tablero[i][j] == '') {
          disponibles++;
        }
    }
  }

	if (ganador == null && disponibles == 0){
		return 'empate';
	}else{
		return ganador;
	}

}

function mousePressed(){
  
  if(jugadorActual==ambiente){
    let i = floor(mouseX / ancho);
    let j = floor(mouseY / altura);

    if (tablero[i][j] == '') {
      tablero[i][j] = ambiente;
      jugadorActual = ai;
      mejorJugada();
      }
  } 
}


function draw(){
	background(255)

	line(ancho,0,ancho,height);
	line(ancho*2,0,ancho*2,height);
	line(0,altura,width,altura);
	line(0,altura*2,width,altura*2);

	for(let j = 0; j < 3; j++){
		for (let i = 0; i<3;i++){
			let x = ancho * i + ancho/2;
			let y = altura * j + altura/2;
			let lugar = tablero[i][j];
            let tam_x = ancho/4; 
			textSize(32);
			strokeWeight(4)
			if (lugar == ambiente) {
				noFill();
				ellipse(x,y,tam_x * 2);
			} else if (lugar == ai){				
				line(x - tam_x,y - tam_x,x + tam_x, y + tam_x);
				line(x + tam_x, y - tam_x, x - tam_x,y + tam_x);
			}
		}
	}


  let resultado = revisar_victoria();
  if (resultado != null){      
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (resultado == 'tie') {
        resultP.html("Tie!")
      } else {
        resultP.html(`${resultado} wins!`);
      }
  }
  
}

