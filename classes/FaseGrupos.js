const EQUIPOS = [
  'Albania',
  'Andorra',
  'Armenia',
  'Austria',
  'Azerbaijan',
  'Bielorusia',
  'Belgica',
  'Bosnia & Herzegovina',
  'Bulgaria',
  'Croacia',
  'Chipre',
  'Republica Checa',
  'Dinamarca',
  'Inglaterra',
  'Estonia',
  'Islas Feroe',
  'Finlandia',
  'Francia',
  'Georgia',
  'Alemania',
  'Gibraltar',
  'Grecia',
  'Hungria',
  'Islandia',
  'Irlanda',
  'Israel',
  'Italia',
  'Kazakhstan',
  'Kosovo',
  'Letonia',
  'Liechenstein',
  'Lituania',
  'Luxemburgo',
  'Malta',
  'Moldavia',
  'Montenegro',
  'Holanda',
  'Macedonia Norte',
  'Irlanda Norte',
  'Noruega',
  'Polonia',
  'Portugal',
  'Rumania',
  'Rusia',
  'San Marino',
  'Escocia',
  'Serbia',
  'Eslovaquia',
  'Eslovenia',
  'España',
  'Suecia',
  'Suiza',
  'Turquia',
  'Ukrania',
  'Gales',
];

const LETRAS_GRUPOS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default class FaseGrupos {
  constructor() {
    this.grupos = this.creaGrupos();
  }

  creaGrupos() {
    const grupos = [];
    const equipos = [...EQUIPOS];

    for (let letra of LETRAS_GRUPOS) {
      let equiposGrupo = [];
      for (let i = 0; i < 4; i++) {
        const rndNum = Math.floor(Math.random() * equipos.length);
        const [nombreEquipo] = equipos.splice(rndNum, 1);
        const equipoSeleccionado = new Equipo(nombreEquipo);
        equiposGrupo = [...equiposGrupo, equipoSeleccionado];
      }
      const grupo = new Grupo(letra, equiposGrupo);
      grupos.push(grupo);
    }
    return grupos;
  }

  muestraInfoInicial() {
    console.log('Grupos y equipos');
    console.log('=========================');
    console.log('');
    this.grupos.forEach((grupo) => grupo.muestraInfo());
  }
}

class Grupo {
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

class Equipo {
  constructor(nombre) {
    this.nombre = nombre;
    this.victorias = 0;
    this.derrotas = 0;
    this.empates = 0;
    this.golesAfavor = 0;
    this.golesEnContra = 0;
    this.golAverage = 0;
  }

  getNombre() {
    return this.nombre;
  }

  getVictorias() {
    return this.victorias;
  }

  setVictorias() {}

  getDerrotas() {
    return this.derrotas;
  }

  setDerrotas() {}

  getEmpates() {
    return this.empates;
  }

  setEmpates() {}

  getGolesAfavor() {
    return this.golesAfavor;
  }

  setGolesAfavor() {}

  getGolesEnContra() {
    return this.golesEnContra;
  }

  setGolesEnContra() {}

  getGolAverage() {
    return this.golAverage;
  }

  setGolAverage() {}
}
