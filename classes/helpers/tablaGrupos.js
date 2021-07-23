import chalk from 'chalk';

export const muestraTabla = (listaEquipos) => {
  console.log('');
  console.log(
    ' Pos. |     Equipo     | PG | PP | PE |  GAF  |  GEC  |  GAv  | Puntos '
  );
  console.log(
    '-----------------------------------------------------------------------'
  );

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

    console.log(
      `${txtPos}|${txtEquipo}|${txtVictorias}|${txtDerrotas}|${txtEmpates}|${txtGolesAF}|${txtGolesEC}|${txtGolAV}|${txtPuntos}`
    );
  });
  console.log('');
};

const separadorPos = (index) => {
  let msg = '';
  if (index <= 1) msg = chalk`   {green {bold ${index + 1}}}  `;
  else if (index === 2) msg = chalk`   {yellow {bold ${index + 1}}}  `;
  else msg = chalk`   {red {bold ${index + 1}}}  `;
  return msg;
};

const separadorNombreEquipo = (nombreEquipo, index) => {
  const separadorEquipos = 15 - nombreEquipo.length;
  let espaciosEquipos = '';
  for (let i = 0; i < separadorEquipos; i++) {
    espaciosEquipos += ' ';
  }

  let msg = '';
  if (index <= 1)
    msg = chalk` {bgGreen {bold ${nombreEquipo}${espaciosEquipos}}}`;
  else if (index === 2)
    msg = chalk` {bgYellow {bold ${nombreEquipo}${espaciosEquipos}}}`;
  else msg = chalk` {bgRed {bold {black ${nombreEquipo}${espaciosEquipos}}}}`;

  return msg;
};

const separadorVictoriasDerrotasEmpates = (resultado) => `  ${resultado} `;

const separadoresGoles = (numGoles) => {
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

  return `${espaciosGoles}${numGoles}${espaciosGolesDetras}`;
};

const separadorPuntos = (puntos) => `    ${puntos}`;
