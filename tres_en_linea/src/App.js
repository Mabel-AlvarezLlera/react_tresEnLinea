import './App.css';
import { useState } from 'react';

/*
  De esta manera, cada cuadrado (square) recibirá un value que será: X, O o null (para los 
  cuadrados vacíos)
*/
function Square({value, onSquareClick}) {
  return (
    <button 
      className='square'
      onClick={onSquareClick}
    >
        {value}
    </button>
  );
}

function Board() {
  // El primer movimiento será X
  const [xIsNext, setXIsNext] = useState(true);
  /* 
    Con Array(9).fill(null) creamos una matriz con 9 elementos (el tamaño del tablero) 
    y establecemos cada uno de ellos a null.
    Con useState hacemos que se actualice el componente si hay algún cambio en el estado.
  */
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // Si el cuadrado ya está relleno o si ya se ha hecho 3 en línea no se hace nada
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice(); // Crear una copia de la matriz squares

    if (xIsNext) {
      nextSquares[i] = "X"; // Pinta una X
    } else {
      nextSquares[i] = "O"; // Pinta un O
    }
    
    setSquares(nextSquares); // Decimos a React que el estado del componente ha cambiado
    setXIsNext(!xIsNext); // Cambiamos el turno
  }

  // Para mostrar un mensaje si hay un ganador
  const winner = calculateWinner(squares);
  let status;
  
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (xIsNext? "X" : "O");
  }

  // Función que reinicia el tablero para empezar un juego nuevo
  function handleClickNuevoJuego() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <> 
      { /* 
        <> es un Fragmento que se usa para envolver múltiples elementos JSX (en nuestro caso los button) 
        */ }
      <div className='tablero'>
        <h1>Tres en línea</h1>

        <div className='status'>{status}</div>
        
        <div className='boards'>
        <div className='board-row'>
          { /* 
            () => es una función flecha, que es una forma más corta de definir funciones.
            Cuándo se hace clic en el cuadrado se ejecutará el código después de la flecha (=>),
            es decir, handleClick(0).
            */ }
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>

          <div className='board-row'>
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>

          <div className='board-row'>
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>

        <div className='reiniciar'>
          <button className='nuevoJuego' onClick={handleClickNuevoJuego}>
            Nuevo juego
          </button>
        </div>
      </div>
    </>
  );
}

/*
  Función que declara un ganador del juego
*/
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i=0; i<lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// export: hace que la función sea accesible desde fuera de este archivo
// default: le dice a otros archivos que usan este código que es la función principal
export default Board;
