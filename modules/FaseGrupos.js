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

module.exports = class FaseGrupos {
  constructor() {
    this.grupos = this.creaGrupos();
  }

  creaGrupos() {
    const grupos = [];
    const equipos = [...EQUIPOS];

    for (const letra of LETRAS_GRUPOS) {
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
};

class Grupo {
  constructor(letra, equipos) {
    this.letra = letra;
    this.equipos = equipos;
    this.jornada = 1;
    // this.calendario = creaCalendario();
  }

  getLetra() {
    return this.letra;
  }

  getJornada() {
    return this.jornada;
  }

  setJornada(nuevaJornada) {
    this.jornada = nuevaJornada;
  }

  creaCalendario() {
    return 0;
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
