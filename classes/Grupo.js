import { ordenacion } from './helpers/ordenacion.js';
import { generaGoles } from './helpers/generadorGoles.js';

export default class Grupo {
  constructor(letra, equipos) {
    this.letra = letra;
    this.equipos = equipos;
    this.calendario = [];
    this.creaCalendario();
  }

  muestraGruposJornadas() {
    this.muestraGrupo();
    this.muestraJornadas();
  }

  muestraGrupo() {
    // Mostramos los grupos con sus correspondientes equipos
    console.log(`Grupo ${this.letra}`);
    console.log('-------------------');
    this.equipos.forEach((equipo) => console.log(equipo.nombre));
    console.log('');
  }

  muestraJornadas() {
    // Mostramos los grupos con sus correspondientes jornadas
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
    /*
    Creamos el calendario con sus correspondientes jornadas y partidos, sabiendo que:
      - El numero de jornadas será: numEquipos - 1
      - El numero de partidos será: numEquipos / 2
    */
    const jornadas = this.equipos.length - 1;
    const numPartidos = this.equipos.length / 2;

    for (let i = 0; i < jornadas; i++) {
      this.calendario.push([]);
      for (let j = 0; j < numPartidos; j++) {
        this.calendario[i].push({ local: '', visitante: '' });
      }
    }

    /*
    El calendario de cada grupo quedaría así:
      [
        [{local: '', visitante: ''}, {local: '', visitante: ''}],
        [{local: '', visitante: ''}, {local: '', visitante: ''}],
        [{local: '', visitante: ''}, {local: '', visitante: ''}]
      ]
    */
  }

  addEquiposFijos() {
    // Variables que nos permitiran mantener el rango de equipos a seleccionar

    let indiceAux = 0;
    const maxIndex = this.equipos.length - 2;

    /* Añadimos Equipos de 0 a 2 tal y como indica la fixture 'Todos contra Todos'
      (Nos guardamos el último equipo para posicionarlo una vez tengamos el resto de equipos colocados)
    */
    this.calendario.forEach((jornada, indexJornada) => {
      jornada.forEach((partido, indexPartido) => {
        if (indexJornada === 1 && indexPartido === 0) {
          // Todas las asignaciones son en local menos en la segunda jornada/primer partido
          partido.visitante = this.equipos[indiceAux];
        } else {
          partido.local = this.equipos[indiceAux];
        }
        indiceAux++;
        //En este caso indiceAux llegará a 2 MAX, pues tenemos solamente 4 equipos
        if (indiceAux > maxIndex) {
          indiceAux = 0;
        }
      });
    });

    /*
      Este seria actualmente nuestro calendario
      [
        [{local: 'EQ1', visitante: ''}, {local: 'EQ2', visitante: ''}],
        [{local: '', visitante: 'EQ3'}, {local: 'EQ1', visitante: ''}],
        [{local: 'EQ2', visitante: ''}, {local: 'EQ3', visitante: ''}]
      ]
    */

    /* Añadimos a cada jornada, en el segundo partido, como visitante los equipos restantes 
      de 2 a 0 tal y como indica la fixture 
      Iniciamos el aux en 2 para poder reducirla e invertir la colocación
    */
    indiceAux = 2;
    this.calendario.forEach((jornada) => {
      jornada.forEach((partido, indexPartido) => {
        if (indexPartido === 1) {
          // Introducimos solo los equipos restantes en el 2o partido como visitantes
          partido.visitante = this.equipos[indiceAux];
          indiceAux--;
        }
      });
    });

    /*
      Este seria actualmente nuestro calendario
      [
        [{local: 'EQ1', visitante: ''}, {local: 'EQ2', visitante: 'EQ3'}],
        [{local: '', visitante: 'EQ3'}, {local: 'EQ1', visitante: 'EQ2'}],
        [{local: 'EQ2', visitante: ''}, {local: 'EQ3', visitante: 'EQ1'}]
      ]
    */
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

    /*
      Este seria actualmente nuestro calendario
      [
        [{local: 'EQ1', visitante: 'EQ4'}, {local: 'EQ2', visitante: 'EQ3'}],
        [{local: 'EQ4', visitante: 'EQ3'}, {local: 'EQ1', visitante: 'EQ2'}],
        [{local: 'EQ2', visitante: 'EQ4'}, {local: 'EQ3', visitante: 'EQ1'}]
      ]
      El cual tendriamos totalmente creado
    */
  }

  juegaPartido(equipoLocal, equipoVisitante) {
    /* 
    Se simula el resultado de los partidos de forma aleatoria
    */
    const equipos = [equipoLocal, equipoVisitante];
    const golesLocal = generaGoles();
    const golesVisitante = generaGoles();

    equipos.forEach((equipo, index) => {
      const golesAfavor = index === 0 ? golesLocal : golesVisitante;
      const golesEnContra = index === 0 ? golesVisitante : golesLocal;
      equipo.addGolesAfavor(golesAfavor);
      equipo.addGolesEnContra(golesEnContra);
      equipo.actualizaGolAverage();
    });

    //Comprobamos el resultado del partido
    this.compruebaResultado(equipos, golesLocal, golesVisitante);
    console.log(
      `${equipoLocal.nombre} ${golesLocal} - ${golesVisitante} ${equipoVisitante.nombre}`
    );
  }

  compruebaResultado(equipos, golesLocal, golesVisitante) {
    if (golesLocal !== golesVisitante) {
      const equipoGanador =
        golesLocal > golesVisitante ? equipos[0] : equipos[1];
      const equipoPerdedor =
        golesLocal < golesVisitante ? equipos[0] : equipos[1];

      equipoGanador.addPuntos(3);
      equipoGanador.addVictoria();
      equipoPerdedor.addDerrota();
    } else {
      equipos.forEach((equipo) => {
        equipo.addPuntos(1);
        equipo.addEmpate();
      });
    }
  }

  muestraTablaLiguilla() {
    // Mostramos la tabla de clasificaciones de cada grupo
    const equiposOrdenados = this.equipos.sort(ordenacion);
    console.log('');
    console.table(equiposOrdenados);
    console.log('');
  }
}
