// IMPORTS DE CLASES
import Grupo from './Grupo.js';
import Equipo from './Equipo.js';

// IMPORTS DE CONSTANTES Y HELPERS
import { EQUIPOS, LETRAS_GRUPOS } from '../constantes.js';
import { ordenacion, ordenacionTerceros } from './helpers/ordenacion.js';

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
    this.muestraPartidos();
  }

  muestraInfoInicial() {
    // Mostramos grupos y equipos y sus correspondientes jornadas
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
    // Mostramos la jornada de cada grupo, resultado del partido y la tabla despues de los partidos
    for (let i = 0; i < 3; i++) {
      const nombreJornada = `Jornada ${i + 1}`;
      this.grupos.forEach((grupo) => {
        console.log(`Grupo ${grupo.letra} - ${nombreJornada}`);
        console.log('------------------');
        grupo.calendario[i].forEach((partido) =>
          grupo.juegaPartido(partido.local, partido.visitante)
        );
        grupo.muestraTablaLiguilla();
        console.log('');
      });
    }
  }

  getClasificados() {
    /* 
    equiposClasificados almacenará, en cada posicion, a, 
    primeros, segundos y terceros de cada grupo
    */
    const equiposClasificados = [[], []];
    const tercerosClasificados = this.getTerceros();

    /* 
    Obtenemos los primeros y segundos de cada grupo y los añadimos a 
    equiposClasificados
    */
    this.grupos.forEach((grupo) => {
      const equiposOrdenados = grupo.equipos.sort(ordenacion);
      equiposOrdenados.forEach((equipo, index) => {
        if (index < equiposOrdenados.length - 2) {
          const equipoClasificado = {
            grupo: grupo.letra,
            equipo,
          };
          equiposClasificados[index].push(equipoClasificado);
        }
      });
    });

    //Por último añadimos los terceros clasificados a equiposClasificados

    equiposClasificados.push(tercerosClasificados);

    return equiposClasificados;
  }

  getTerceros() {
    const tercerosClasificados = [];
    // Obtenemos todos los terceros clasificados
    this.grupos.forEach((grupo) => {
      const equiposOrdenados = grupo.equipos.sort(ordenacion);
      equiposOrdenados.forEach((equipo, index) => {
        if (index === 2) {
          const equipoClasificado = {
            grupo: grupo.letra,
            equipo,
          };
          tercerosClasificados.push(equipoClasificado);
        }
      });
    });

    /* Los ordenamos con los siguientes criterios:
      - Puntos
      - Gol Average
      - Nombre
      Y extraemos los 4 primeros del array
    */
    const tercerosOrdenados = tercerosClasificados
      .sort(ordenacionTerceros)
      .splice(0, 4);

    return tercerosOrdenados;
  }
}
