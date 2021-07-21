import { generaGoles } from './generadorGoles.js';

export const jugar = (
  equipoLocal,
  equipoVisitante,
  golesLocal,
  golesVisitante
) => {
  let ganador = equipoGanador(
    equipoLocal,
    equipoVisitante,
    golesLocal,
    golesVisitante
  );
  msgPartido(
    equipoLocal.nombre,
    equipoVisitante.nombre,
    golesLocal,
    golesVisitante,
    ganador
  );
  if (ganador !== null) {
    return ganador;
  } else {
    // Prorroga
    ganador = prorroga(
      equipoLocal,
      equipoVisitante,
      golesLocal,
      golesVisitante
    );

    if (ganador !== null) return ganador;
    else {
      //Penaltis

      ganador = penaltis(equipoLocal, equipoVisitante);

      if (ganador !== null) return ganador;
      else {
        // Penaltis muerte subita
        ganador = penaltisMuerteSubita(equipoLocal, equipoVisitante);
        return ganador;
      }
    }
  }
};

const prorroga = (equipoLocal, equipoVisitante, golesLocal, golesVisitante) => {
  const golesLocalProrroga = generaGoles(3);
  const golesVisitanteProrroga = generaGoles(3);
  const golesLocalTotales = golesLocal + golesLocalProrroga;
  const golesVisitanteTotales = golesVisitante + golesVisitanteProrroga;

  const ganador = equipoGanador(
    equipoLocal,
    equipoVisitante,
    golesLocalTotales,
    golesVisitanteTotales
  );

  console.log('== PRÓRROGA ==');
  msgPartido(
    equipoLocal.nombre,
    equipoVisitante.nombre,
    golesLocalTotales,
    golesVisitanteTotales,
    ganador
  );

  return ganador;
};

const penaltis = (equipoLocal, equipoVisitante) => {
  let penaltisLocal = 0;
  let penaltisVisitante = 0;
  let secuenciaPenaltisLocal = '';
  let secuenciaPenaltisVisitante = '';

  for (let i = 0; i < 10; i++) {
    const penalti = Math.round(Math.random());
    if (i % 2 === 0) {
      // Penaltis del local
      penaltisLocal += penalti;
      if (penalti > 0) secuenciaPenaltisLocal += 'O';
      else secuenciaPenaltisLocal += 'X';
    } else {
      // Penaltis visitante
      penaltisVisitante += penalti;
      if (penalti > 0) secuenciaPenaltisVisitante += 'O';
      else secuenciaPenaltisVisitante += 'X';
    }
  }

  console.log('== PENALTIS ==');

  if (penaltisLocal === penaltisVisitante) {
    const ganador = penaltisMuerteSubita(
      equipoLocal,
      equipoVisitante,
      penaltisLocal,
      penaltisVisitante
    );
    msgPenaltis(
      equipoLocal.nombre,
      equipoVisitante.nombre,
      secuenciaPenaltisLocal,
      secuenciaPenaltisVisitante,
      ganador
    );
    return ganador;
  }
  const ganador = equipoGanador(
    equipoLocal,
    equipoVisitante,
    penaltisLocal,
    penaltisVisitante
  );

  msgPenaltis(
    equipoLocal.nombre,
    equipoVisitante.nombre,
    secuenciaPenaltisLocal,
    secuenciaPenaltisVisitante,
    ganador
  );
  //   console.log(equipoLocal.nombre);
  //   console.log(secuenciaPenaltisLocal);
  //   console.log('----------');
  //   console.log(secuenciaPenaltisVisitante);
  //   console.log(equipoVisitante.nombre);

  return ganador;
};

const penaltisMuerteSubita = (
  equipoLocal,
  equipoVisitante,
  penaltisLocal,
  penaltisVisitante,
  secuenciaLocalActual,
  secuenciaVisitanteActual
) => {
  let hayGanador = false;
  let penaltisLocalTotales = penaltisLocal;
  let penaltisVisitanteTotales = penaltisVisitante;
  let secuenciaLocal = secuenciaLocalActual;
  let secuenciaVisitante = secuenciaVisitanteActual;

  while (!hayGanador) {
    const penaltiLocal = Math.round(Math.random());
    penaltisLocalTotales += penaltiLocal;
    if (penaltiLocal > 0) secuenciaLocal += 'O';
    else secuenciaLocal += 'X';
    const penaltiVisitante = Math.round(Math.random());
    penaltisVisitanteTotales += penaltiVisitante;
    if (penaltiVisitante > 0) secuenciaVisitante += 'O';
    else secuenciaVisitante += 'X';
    if (penaltisLocalTotales !== penaltisVisitanteTotales) hayGanador = true;
  }

  console.log(equipoLocal.nombre);
  console.log(secuenciaLocal);
  console.log('----------');
  console.log(equipoVisitante.nombre);
  console.log(secuenciaVisitante);

  const ganador = equipoGanador(
    equipoLocal,
    equipoVisitante,
    penaltisLocalTotales,
    penaltisVisitanteTotales
  );

  msgPartido(
    equipoLocal.nombre,
    equipoVisitante.nombre,
    penaltisLocalTotales,
    penaltisVisitanteTotales
  );

  return ganador;
};

const equipoGanador = (
  equipoLocal,
  equipoVisitante,
  golesLocal,
  golesVisitante
) => {
  // Nos devuelve el equipo que mas goles haya marcado. En caso de empate devuelve null
  return golesLocal > golesVisitante
    ? equipoLocal
    : golesVisitante > golesLocal
    ? equipoVisitante
    : null;
};

const msgPartido = (
  nombreLocal,
  nombreVisitante,
  golesLocal,
  golesVisitante,
  ganador
) => {
  const equipoGanador = ganador ? ganador.nombre : 'EMPATE';
  console.log(
    `${nombreLocal} ${golesLocal} - ${golesVisitante} ${nombreVisitante} => ${equipoGanador}`
  );
};

const msgPenaltis = (
  nombreLocal,
  nombreVisitante,
  secuenciaPenaltisLocal,
  secuenciaPenaltisVisitante,
  ganador
) => {
  console.log(
    `${nombreLocal} - ${secuenciaPenaltisLocal} 
------------
${nombreVisitante} - ${secuenciaPenaltisVisitante} 
    ***${ganador.nombre} GANA POR PENALTIS***`
  );
};
