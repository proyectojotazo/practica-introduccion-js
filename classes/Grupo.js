import { ordenacion } from './helpers/ordenacion.js';

export default class Grupo {
  constructor(letra, equipos) {
    this.letra = letra;
    this.equipos = equipos;
    this.calendario = [];
    this.creaCalendario();
  }

  getLetra() {
    return this.letra;
  }

  muestraGruposJornadas() {
    this.muestraGrupo();
    this.muestraJornadas();
  }

  muestraGrupo() {
    console.log(`Grupo ${this.letra}`);
    console.log('-------------------');
    this.equipos.forEach((equipo) => console.log(equipo.nombre));
    console.log('');
  }

  muestraJornadas() {
    this.calendario.forEach((jornada, indiceJornada) => {
      console.log(`Jornada ${indiceJornada + 1}:`);
      jornada.forEach((partido) => {
        console.log(`- ${partido.local.nombre} vs ${partido.visitante.nombre}`);
      });
      console.log('');
    });
  }

  creaCalendario() {
    this.creaJornadas();
    this.addEquiposFijos();
    this.addUltimoEquipo();
  }

  creaJornadas() {
    const jornadas = this.equipos.length - 1;
    const numPartidos = this.equipos.length / 2;
    // const calendario = [[['1' vs '4'], ['2' vs '3']], [['4' vs '3'], ['1' vs '2']], [['2' vs '4'], ['3' vs '1']]]

    for (let i = 0; i < jornadas; i++) {
      this.calendario.push([]);
      for (let j = 0; j < numPartidos; j++) {
        this.calendario[i].push({ local: '', visitante: '' });
      }
    }
  }

  addEquiposFijos() {
    let indiceAux = 0;
    const maxIndex = this.equipos.length - 2;

    /* Añadimos Equipos de 0 a 2 
      (Nos guardamos el último para posicionarlo una vez tengamos toda la tabla)
      Y los posicionamos tal y como indica la fixture*/
    this.calendario.forEach((jornada, indexJornada) => {
      jornada.forEach((partido, indexPartido) => {
        if (indexJornada === 1 && indexPartido === 0) {
          partido.visitante = this.equipos[indiceAux];
        } else {
          partido.local = this.equipos[indiceAux];
        }
        indiceAux++;
        if (indiceAux > maxIndex) {
          indiceAux = 0;
        }
      });
    });

    /* Añadimos a cada jornada, en el segundo partido, como visitante los equipos restantes 
      de 2 a 0 tal y como indica la fixture */
    indiceAux = 2;
    this.calendario.forEach((jornada) => {
      jornada.forEach((partido, indexPartido) => {
        if (indexPartido === 1) {
          partido.visitante = this.equipos[indiceAux];
          indiceAux--;
        }
      });
    });
  }

  addUltimoEquipo() {
    const indexUltimoEquipo = this.equipos.length - 1;

    /* Añadimos el último equipo el cual lo posicionamos (segun fixture) en el primer partido
      de cada jornada intercalandolo entre visitante y local */
    this.calendario.forEach((jornada, indiceJornada) => {
      jornada.forEach((partido, indicePartido) => {
        if (indicePartido === 0) {
          // Solo añadimos el último equipo a los primeros partidos de cada jornada
          if (indiceJornada === 1) {
            // Solo en la segunda jornada el ultimo equipo juega como local
            partido.local = this.equipos[indexUltimoEquipo];
          } else {
            partido.visitante = this.equipos[indexUltimoEquipo];
          }
        }
      });
    });
  }

  juegaPartido(equipoLocal, equipoVisitante) {
    const golesLocal = Math.floor(Math.random() * 9);
    const golesVisitante = Math.floor(Math.random() * 9);
    equipoLocal.addGolesAfavor(golesLocal);
    equipoLocal.addGolesEnContra(golesVisitante);
    equipoVisitante.addGolesAfavor(golesVisitante);
    equipoVisitante.addGolesEnContra(golesLocal);
    equipoLocal.actualizaGolAverage();
    equipoVisitante.actualizaGolAverage();
    this.compruebaResultado(
      equipoLocal,
      equipoVisitante,
      golesLocal,
      golesVisitante
    );
    console.log(
      `${equipoLocal.nombre} ${golesLocal} - ${golesVisitante} ${equipoVisitante.nombre}`
    );
  }

  compruebaResultado(equipoLocal, equipoVisitante, golesLocal, golesVisitante) {
    if (golesLocal > golesVisitante) {
      equipoLocal.addPuntos(3);
      equipoLocal.addVictoria();
      equipoVisitante.addDerrota();
    } else if (golesVisitante > golesLocal) {
      equipoVisitante.addPuntos(3);
      equipoVisitante.addVictoria();
      equipoLocal.addDerrota();
    } else {
      equipoLocal.addPuntos(1);
      equipoLocal.addEmpate();
      equipoVisitante.addPuntos(1);
      equipoVisitante.addEmpate();
    }
  }

  muestraTablaLiguilla() {
    const equiposOrdenados = this.equipos.sort(ordenacion);
    console.log('');
    console.table(equiposOrdenados);
    console.log('');
  }
}
