import chalk from 'chalk';

// Objeto que contiene los estilos de todos los componentes de la tabla
const estilosTabla = {
  cabecera: chalk.hex('#FFFFFF'),
  separadorCabecera: chalk.hex('#FFFFFF'),
  separadorSeccion: chalk.hex('#FFFFFF'),
  vicDerrEmp: chalk.hex('#FFFFFF'),
  goles: chalk.hex('#FFFFFF'),
  puntos: chalk.hex('#FFFFFF'),
  primero: {
    colorPosicion: chalk.green.bold,
    colorNombreBg: chalk.hex('#FFFFFF').bgGreen,
  },
  segundo: {
    colorPosicion: chalk.green.bold,
    colorNombreBg: chalk.hex('#FFFFFF').bgGreen,
  },
  tercero: {
    colorPosicion: chalk.yellow.bold,
    colorNombreBg: chalk.hex('#FFFFFF').bgYellow,
  },
  cuarto: {
    colorPosicion: chalk.red.bold,
    colorNombreBg: chalk.hex('#000000').bgRed,
  },
};

export const muestraTabla = (listaEquipos) => {
  /*
    Funcion que recupera todos los elementos estilizados y los muestra por cada
    equipo que existe en la lista de equipos de cada grupo
  */
  cabeceraTabla();

  listaEquipos.forEach((equipo, index) => {
    const txtPos = separadorPos(index);
    const txtEquipo = separadorNombreEquipo(equipo.nombre, index);
    const txtVictorias = separadorVictoriasDerrotasEmpates(equipo.victorias);
    const txtDerrotas = separadorVictoriasDerrotasEmpates(equipo.derrotas);
    const txtEmpates = separadorVictoriasDerrotasEmpates(equipo.empates);
    const txtGolesAF = separadoresGoles(equipo.golesAfavor);
    const txtGolesEC = separadoresGoles(equipo.golesEnContra);
    const txtGolAV = separadoresGoles(equipo.golAverage);
    const txtPuntos = separadorPuntos(equipo.puntos);
    const barraSeparadoraColoreada = estilosTabla.separadorSeccion('|');

    console.log(
      `${txtPos}${barraSeparadoraColoreada}${txtEquipo}${barraSeparadoraColoreada}${txtVictorias}${barraSeparadoraColoreada}${txtDerrotas}${barraSeparadoraColoreada}${txtEmpates}${barraSeparadoraColoreada}${txtGolesAF}${barraSeparadoraColoreada}${txtGolesEC}${barraSeparadoraColoreada}${txtGolAV}${barraSeparadoraColoreada}${txtPuntos}`
    );
  });
  console.log('');
};

const cabeceraTabla = () => {
  /**
    Funcion que imprime la cabecera estilizada
   */
  const cabeceraEstilizada = estilosTabla.cabecera(
    ' Pos. |     Equipo     | PG | PP | PE |  GAF  |  GEC  |  GAv  | Puntos '
  );
  const separadorCabecera = estilosTabla.separadorCabecera(
    '-----------------------------------------------------------------------'
  );
  console.log('');
  console.log(`${cabeceraEstilizada}`);
  console.log(`${separadorCabecera}`);
};

const separadorPos = (index) => {
  /*
    Funcion que nos devuelve el numero de la posicion coloreado  
  */
  let msg = '';

  switch (index) {
    case 0:
      msg = `   ${estilosTabla.primero.colorPosicion(`${index + 1}`)}  `;
      break;
    case 1:
      msg = `   ${estilosTabla.segundo.colorPosicion(`${index + 1}`)}  `;
      break;
    case 2:
      msg = `   ${estilosTabla.tercero.colorPosicion(`${index + 1}`)}  `;
      break;
    case 3:
      msg = `   ${estilosTabla.cuarto.colorPosicion(`${index + 1}`)}  `;
      break;
    default:
      break;
  }

  return msg;
};

const separadorNombreEquipo = (nombreEquipo, index) => {
  /*
    Función que estila el nombre del equipo y lo devuelve
  */
  const separadorEquipos = 15 - nombreEquipo.length;
  let espaciosEquipos = '';
  for (let i = 0; i < separadorEquipos; i++) {
    espaciosEquipos += ' ';
  }

  let msg = '';

  switch (index) {
    case 0:
      msg = ` ${estilosTabla.primero.colorNombreBg(
        `${nombreEquipo}${espaciosEquipos}`
      )}`;
      break;
    case 1:
      msg = ` ${estilosTabla.segundo.colorNombreBg(
        `${nombreEquipo}${espaciosEquipos}`
      )}`;
      break;
    case 2:
      msg = ` ${estilosTabla.tercero.colorNombreBg(
        `${nombreEquipo}${espaciosEquipos}`
      )}`;
      break;
    case 3:
      msg = ` ${estilosTabla.cuarto.colorNombreBg(
        `${nombreEquipo}${espaciosEquipos}`
      )}`;
      break;
    default:
      break;
  }

  return msg;
};

const separadorVictoriasDerrotasEmpates = (resultado) => `  ${estilosTabla.vicDerrEmp(`${resultado}`)} `;

const separadoresGoles = (numGoles) => {
  /*
    Función que estiliza y devuelve el valor de GAF, GEC y GAv
  */
  const separadorGoles = 5 - numGoles.toString().length;
  let espaciosGoles = '';

  for (let i = 0; i < separadorGoles; i++) {
    espaciosGoles += ' ';
  }

  const separadorGolesDetras =
    numGoles.toString().length > 1
      ? 4 - numGoles.toString().length
      : 3 - numGoles.toString().length;

  let espaciosGolesDetras = '';

  for (let i = 0; i < separadorGolesDetras; i++) {
    espaciosGolesDetras += ' ';
  }

  return `${estilosTabla.goles(`${espaciosGoles}${numGoles}${espaciosGolesDetras}`)}`;
};

const separadorPuntos = (puntos) => `    ${estilosTabla.puntos(`${puntos}`)}`;
