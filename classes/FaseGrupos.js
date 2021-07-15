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
}

class Grupo {
  constructor(letra, equipos) {
    this.letra = letra;
    this.equipos = equipos;
    this.calendario = this.creaCalendario();
  }

  getLetra() {
    return this.letra;
  }

  muestraInfo() {
    this.muestraGrupo();
  }

  muestraGrupo() {
    console.log(`Grupo ${this.letra}`);
    console.log('-------------------');
    this.equipos.forEach((equipo) => console.log(equipo.nombre));
    console.log('');
  }

  creaCalendario() {
    // TODO Montar el calendario
    const tabla = this.creaTabla();
    return tabla;
  }

  creaTabla() {
    const jornadas = this.equipos.length - 1;
    const numPartidos = this.equipos.length / 2;
    // const calendario = [[['1' vs '4'], ['2' vs '3']], [['4' vs '3'], ['1' vs '2']], [['2' vs '4'], ['3' vs '1']]]
    const calendario = [];

    for (let i = 0; i < jornadas; i++) {
      calendario.push([]);
      for (let j = 0; j < numPartidos; j++) {
        calendario[i].push({ local: '', visitante: '' });
      }
    }
    return calendario;
  }

  añadeEquiposFijos() {
    // TODO Añadir equipos fijos a la tabla
    let indiceAux = 0;
  }

  añadeUltimoEquipo() {
    // TODO Añadir ultimo equipo a la tabla
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
