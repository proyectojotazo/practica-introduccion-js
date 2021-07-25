import chalk from 'chalk';

const coloresBasicos = {
  blanco: chalk.hex('#FFFFFF'),
  negro: chalk.hex('#000000'),
  rojo: chalk.hex('#FF0000'),
  verde: chalk.hex('#00FF00'),
  azul: chalk.hex('#0000FF'),
  blancoBold: chalk.hex('#FFFFFF').bold,
};

const estilosEquipos = {
  ganador: chalk.green.bold.underline,
  ganadorNoUnderline: chalk.green.bold,
  perdedor: chalk.red.bold,
  empate: chalk.yellow.bold,
  golesGanador: chalk.green.bold,
  golesPerdedor: chalk.red.bold,
  penaltiEncajado: chalk.green.bold,
  penaltiFallado: chalk.red.bold,
};

const estilosMsg = {
  colorBarras: coloresBasicos.blanco,
  colorFase: chalk.hex('#1FB9DD'),
  colorRonda: chalk.blue,
  colorFasePartido: chalk.blue,
  colorFlecha: chalk.blue,
  colorMsgGrupo: chalk.blue,
  colorSeparadorGrupo: coloresBasicos.blanco,
  colorTextoGrupos: chalk.blue,
  colorSeparadorTextoGrupos: coloresBasicos.blanco,
  colorEquipo: coloresBasicos.blanco,
  colorJornada: chalk.blue,
  colorPartido: coloresBasicos.blanco,
  colorBarrasCampeon: coloresBasicos.blanco,
  colorMsgCampeon: coloresBasicos.blanco,
  colorCampeon: chalk.green.bold
};

export const msgCabeceraGrupos = () => {
  /**
   * Funcion que muestra el mensaje inicial 'Grupos y Estilos' estilizado
   */

  const msgColoreado = estilosMsg.colorTextoGrupos('Grupos y equipos');
  const separadorColoreado = estilosMsg.colorSeparadorTextoGrupos(
    '========================='
  );

  console.log('');
  console.log(`${msgColoreado}`);
  console.log(`${separadorColoreado}`);
  console.log('');
};

export const msgGruposInicio = (letra, listaEquipos) => {
  /*
    Función que muestra los equipos de cada grupo coloreados
  */
  const grupoColoreado = estilosMsg.colorTextoGrupos(`Grupo ${letra}`);
  const separadorColoreado = estilosMsg.colorSeparadorTextoGrupos(
    '-------------------'
  );
  const equipoColoreado = estilosMsg.colorEquipo;

  console.log(`${grupoColoreado}`);
  console.log(`${separadorColoreado}`);
  listaEquipos.forEach((equipo) =>
    console.log(`${equipoColoreado(`${equipo.nombre}`)}`)
  );
  console.log('');
};

export const msgJornadas = (calendario) => {
  /*
        Funcion que muestra las jornadas de cada grupo coloreadas
    */
  const cabeceraJornadaColoreada = estilosMsg.colorJornada;
  const jornadaColoreada = estilosMsg.colorPartido

  calendario.forEach((jornada, indiceJornada) => {
    console.log(`${cabeceraJornadaColoreada(`Jornada ${indiceJornada + 1}:`)}`);
    jornada.forEach((partido) => {
      console.log(`${jornadaColoreada(`- ${partido.local.nombre} vs ${partido.visitante.nombre}`)}`);
    });
    console.log('');
  });
};

export const msgInicioFase = (fase) => {
  /*
        Función que nos muestra el mensaje de inicio de cada fase siendo estas:
            - Inicio Eurocopa (Fase Grupos)
            - Fase de Eliminatiorias
    */
  const barrasContenedoras = estilosMsg.colorBarras(
    '=================================================='
  );
  const faseColoreada = estilosMsg.colorFase(`${fase}`);
  const barrasColoreadasCentradas = creaBarras(fase.length);

  console.log(`${barrasContenedoras}`);
  console.log(
    `${barrasColoreadasCentradas} ${faseColoreada} ${barrasColoreadasCentradas}`
  );
  console.log(`${barrasContenedoras}`);
};

const creaBarras = (longFase) => {
  /*
    Función creada para los mensajes que contienen:
        '============================='
        '============ MSG ============'
        '============================='
    Creamos las barras de la parte central del mensaje en función de la longiud del texto que pasemos
  */

  const maxLong = 50; // maxLong es la cantidad de '=' que hay en la barra, tanto superior como inferior del mensaje

  /* 
    Nos calculará el numero de '=' por lado del mensaje central en función de la 
    longitud de la frase que le pasemos
  */

  const longBarrasXlado = (maxLong - longFase) / 2 - 1;
  let auxBarrasColoreadas = '';

  for (let i = 0; i < longBarrasXlado; i++) {
    auxBarrasColoreadas += '=';
  }

  return estilosMsg.colorBarras(`${auxBarrasColoreadas}`);
};

export const msgRonda = (ronda) => {
  /*
    Esta función nos creara el mensaje de cada ronda de Playoffs (OCTAVOS, CUARTOS...)
  */
  const barrasColoreadas = estilosMsg.colorBarras('==========');
  const mensajeColoreado = estilosMsg.colorRonda(`${ronda}`);

  console.log('');
  console.log(`${barrasColoreadas} ${mensajeColoreado} ${barrasColoreadas}`);
  console.log('');
};

export const msgGrupo = (letra, nombreJornada) => {
  /*
        Funcion que nos muestra por cada grupo la cabecera con el grupo y la jornada
        de partido jugada estilizados
    */
  const msgGrupoColoreado = estilosMsg.colorMsgGrupo(
    `Grupo ${letra} - ${nombreJornada}`
  );
  const separadorGrupo = estilosMsg.colorSeparadorGrupo('------------------');

  console.log(`${msgGrupoColoreado}`);
  console.log(`${separadorGrupo}`);
};

export const msgFinPartido = (
  nombreLocal,
  nombreVisitante,
  golesLocal,
  golesVisitante,
  nombreGanador = null
) => {
  /*
        Función que nos crea el mensaje de final de cada partido.
        Primero comprobamos si ha habido empate o no, damos el estilo
        indicado al mensaje y luego comprobamos si es un partido de 
        PlayOffs (PO), ya que éste tiene un añadido de mostrar quien es
        el equipo clasificado a la siguiente ronda o si ha habido EMPATE.
    */
  const empate = golesLocal === golesVisitante;
  const guionBlanco = coloresBasicos.blancoBold('-');

  let partidoPO = nombreGanador !== null ? true : false;

  let msg = '';

  if (!empate) {
    const ganadorLocal = golesLocal > golesVisitante;

    const localColoreado = ganadorLocal
      ? estilosEquipos.ganador(`${nombreLocal}`)
      : estilosEquipos.perdedor(`${nombreLocal}`);

    const visitanteColoreado = ganadorLocal
      ? estilosEquipos.perdedor(`${nombreVisitante}`)
      : estilosEquipos.ganador(`${nombreVisitante}`);

    const golesLocalColoreados = ganadorLocal
      ? estilosEquipos.golesGanador(`${golesLocal}`)
      : estilosEquipos.golesPerdedor(`${golesLocal}`);

    const golesVisitanteColoreados = ganadorLocal
      ? estilosEquipos.golesPerdedor(`${golesVisitante}`)
      : estilosEquipos.golesGanador(`${golesVisitante}`);

    msg = `${localColoreado} ${golesLocalColoreados} ${guionBlanco} ${visitanteColoreado} ${golesVisitanteColoreados}`;
  } else {
    const localColoreado = estilosEquipos.empate(`${nombreLocal}`);
    const visitanteColoreado = estilosEquipos.empate(`${nombreVisitante}`);
    const golesLocalColoreados = estilosEquipos.empate(`${golesLocal}`);
    const golesVisitanteColoreados = estilosEquipos.empate(`${golesVisitante}`);

    msg = `${localColoreado} ${golesLocalColoreados} ${guionBlanco} ${visitanteColoreado} ${golesVisitanteColoreados}`;
  }

  if (partidoPO) {
    // Comprobacion partido PlayOffs
    let clasificadoRonda = '';
    const flechaColoreada = estilosMsg.colorFlecha('=>');
    if (empate) {
      const nombreEmpate = estilosEquipos.empate(`${nombreGanador}`);
      clasificadoRonda += ` ${flechaColoreada} ${nombreEmpate}`;
    } else {
      const nombreColoreado = estilosEquipos.ganadorNoUnderline(
        `${nombreGanador}`
      );
      clasificadoRonda += ` ${flechaColoreada} ${nombreColoreado}`;
    }
    msg += clasificadoRonda;
  }

  return msg;
};

export const msgFasePartido = (fasePartido) => {
  /*
        Funcion que nos muestra la fase del partido:
            - PRORROGA
            - PENALTIS
        estilizada
    */
  const barrasColoreadas = estilosMsg.colorBarras('=====');
  const faseColoreada = estilosMsg.colorFasePartido(`${fasePartido}`);
  console.log(`${barrasColoreadas} ${faseColoreada} ${barrasColoreadas}`);
};

export const msgFinPenaltis = (
  nombreLocal,
  nombreVisitante,
  secuenciaLocal,
  secuenciaVisitante,
  nombreGanador
) => {
  /*
        Función que nos mostrará la tanda de penaltis y el ganador de la misma  
    */
  const secuenciaLocalColoreada = secuenciaColoreada(secuenciaLocal);
  const secuenciaVisitanteColoreada = secuenciaColoreada(secuenciaVisitante);

  const nombreLocalColoreado =
    nombreLocal === nombreGanador
      ? estilosEquipos.ganadorNoUnderline(`${nombreLocal}`)
      : estilosEquipos.perdedor(`${nombreLocal}`);
  const nombreVisitanteColoreado =
    nombreVisitante === nombreGanador
      ? estilosEquipos.ganadorNoUnderline(`${nombreVisitante}`)
      : estilosEquipos.perdedor(`${nombreVisitante}`);
  const separadorColoreado = coloresBasicos.blancoBold('------------');
  const nombreGanadorColoreado = estilosEquipos.ganadorNoUnderline(
    `${nombreGanador}`
  );
  const asteriscosColoreados = coloresBasicos.blanco('***');
  const msgGanaPenaltis = coloresBasicos.blanco('GANA POR PENALTIS');

  const msg = chalk`${nombreLocalColoreado} - ${secuenciaLocalColoreada}
${separadorColoreado}
${nombreVisitanteColoreado} - ${secuenciaVisitanteColoreada} 
${asteriscosColoreados} ${nombreGanadorColoreado} ${msgGanaPenaltis} ${asteriscosColoreados}`;

  return msg;
};

const secuenciaColoreada = (secuenciaAcolorear) => {
  /*
        Funcion que nos devuelve la secuencia de penaltis coloreada.
        O en verde y X en rojo
    */
  let secuenciaColoreada = '';
  secuenciaAcolorear.split('').forEach((penalti) => {
    if (penalti === 'O') {
      secuenciaColoreada += `${estilosEquipos.penaltiEncajado(penalti)}`;
    } else {
      secuenciaColoreada += `${estilosEquipos.penaltiFallado(penalti)}`;
    }
  });
  return secuenciaColoreada;
};

export const msgCampeon = (campeon) => {

    const barrasColoreadas = estilosMsg.colorBarrasCampeon('==================================================')
    const msgCampeon = estilosMsg.colorMsgCampeon('campeón de la EURO!')
    const nombreCampeon = estilosMsg.colorCampeon(`${campeon}`)

    console.log(`${barrasColoreadas}`);
    console.log(`¡${nombreCampeon} ${msgCampeon}`);
    console.log(`${barrasColoreadas}`);
    console.log('');
}
