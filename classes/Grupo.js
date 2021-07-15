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

  muestraInfo() {
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
        console.log(`- ${partido.local} vs ${partido.visitante}`);
      });
      console.log('');
    });
  }

  creaCalendario() {
    this.creaTabla();
    this.añadeEquiposFijos();
    this.añadeUltimoEquipo();
  }

  creaTabla() {
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

  añadeEquiposFijos() {
    let indiceAux = 0;
    const maxIndex = this.equipos.length - 2;

    /* Añadimos Equipos de 0 a 2 
      (Nos guardamos el último para posicionarlo una vez tengamos toda la tabla)
      Y los posicionamos tal y como indica la fixture*/
    this.calendario.forEach((jornada, indexJornada) => {
      jornada.forEach((partido, indexPartido) => {
        if (indexJornada === 1 && indexPartido === 0) {
          partido.visitante = this.equipos[indiceAux].nombre;
        } else {
          partido.local = this.equipos[indiceAux].nombre;
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
          partido.visitante = this.equipos[indiceAux].nombre;
          indiceAux--;
        }
      });
    });
  }

  añadeUltimoEquipo() {
    const indexUltimoEquipo = this.equipos.length - 1;

    /* Añadimos el último equipo el cual lo posicionamos (segun fixture) en el primer partido
      de cada jornada intercalandolo entre visitante y local */
    this.calendario.forEach((jornada, indiceJornada) => {
      jornada.forEach((partido, indicePartido) => {
        if (indicePartido === 0) {
          // Solo añadimos el último equipo a los primeros partidos de cada jornada
          if (indiceJornada === 1) {
            // Solo en la segunda jornada el ultimo equipo juega como local
            partido.local = this.equipos[indexUltimoEquipo].nombre;
          } else {
            partido.visitante = this.equipos[indexUltimoEquipo].nombre;
          }
        }
      });
    });
  }
}
