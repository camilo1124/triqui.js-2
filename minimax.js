function mejorJugada(){

	let mejorPuntaje = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++){
          
			if(tablero[i][j] == ''){
				tablero[i][j] = ai;
				let puntaje = minimax(tablero,0,false);
				tablero[i][j] = '';
                console.log(puntaje)
				if (puntaje > mejorPuntaje){
					mejorPuntaje = puntaje;
                    console.log(mejorPuntaje)
					move = { i,j };                
				}
			}
		}
	}
	tablero[move.i][move.j] = ai;
	jugadorActual = ambiente;
}

let puntajes = {
	X: 1,
	O: -1,
	empate:0
};

function minimax(tablero,profundidad,maximizando){
	let resultado = revisar_victoria();
	if (resultado != null){
		return puntajes[resultado]
	}
	if (maximizando){
		let mejorPuntaje = -Infinity;
		for (let i = 0; i<3;i++){
			for (let j = 0;j<3;j++){
				if (tablero[i][j] == ''){
					tablero[i][j] = ai;
					let puntaje = minimax(tablero,profundidad +1,false);
					tablero[i][j] = '';
					mejorPuntaje = max(puntaje,mejorPuntaje);
				}
			}
		}
		return mejorPuntaje;

	}else{	
		let mejorPuntaje = Infinity;
		for (let i = 0; i<3;i++){
			for (let j = 0;j<3;j++){
				if (tablero[i][j] == ''){
					tablero[i][j] = ai;
					let puntaje = minimax(tablero,profundidad +1,true);
					tablero[i][j] ='';
					mejorPuntaje = min(puntaje,mejorPuntaje)
				}
			}
		}
		return mejorPuntaje;

	}

}

