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

  iniciaFaseGrupos() {
    this.muestraInfoInicial();
    this.muestraInicioEuro();
  }

  muestraInfoInicial() {
    console.log('Grupos y equipos');
    console.log('=========================');
    console.log('');
    this.grupos.forEach((grupo) => grupo.muestraGruposJornadas());
  }

  muestraInicioEuro() {
    console.log('==================================================');
    console.log('============== COMIENZA LA EUROCOPA ==============');
    console.log('==================================================');
    console.log('');
  }

  muestraPartidos() {
    for (let i = 0; i < 3; i++) {
      const nombreJornada = `Jornada ${i + 1}`;
      this.grupos.forEach((grupo) => {
        console.log(`Grupo ${grupo.letra} - ${nombreJornada}`);
        console.log('------------------');
        grupo.calendario[i].forEach((partido) =>
          // console.log(`${partido.local.nombre} - ${partido.visitante.nombre}`)
          grupo.juegaPartido(partido.local, partido.visitante)
        );
        grupo.muestraTablaLiguilla();
        console.log('');
      });
    }
  }

  // TODO Sacar los equipos clasificados
  // TODO Sacar los primeros de cada grupo
  // TODO Sacar los segundos de cada grupo
  /* TODO Sacar los terceros. De los 6 hay que escoger 4:
      - Criterio de orden:
        - Puntos
        - Gol Average
        - Nombre
  */
}
