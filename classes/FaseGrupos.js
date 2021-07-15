// IMPORTS DE CLASES
import Grupo from './Grupo.js';
import Equipo from './Equipo.js';

// IMPORTS DE CONSTANTES
import { EQUIPOS, LETRAS_GRUPOS } from '../constantes.js';

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
