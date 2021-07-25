// IMPORTS DE CLASES
import Grupo from './Grupo.js';
import Equipo from './Equipo.js';
import { PartidoFaseGrupos } from './Partido.js';

// IMPORTS DE CONSTANTES Y HELPERS
import { EQUIPOS, LETRAS_GRUPOS } from '../constantes.js';
import { ordenacion, ordenacionTerceros } from './helpers/ordenacion.js';
import { msgCabeceraGrupos, msgGrupo, msgInicioFase } from './helpers/msgEstilizados.js';

export default class FaseGrupos {
  constructor() {
    this.grupos = this.creaGrupos();
  }

  creaGrupos() {
    const grupos = [];
    const equipos = [...EQUIPOS];
    const maxEquipos = 4;

    for (let letra of LETRAS_GRUPOS) {
      let equiposGrupo = [];
      for (let i = 0; i < maxEquipos; i++) {
        // Creamos grupos de 4 equipos
        const rndNum = Math.floor(Math.random() * equipos.length);
        const [nombreEquipo] = equipos.splice(rndNum, 1); // Seleccionamos el nombre de un equipo aleatoriamente
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
    msgCabeceraGrupos()
    this.grupos.forEach((grupo) => grupo.muestraGruposJornadas());
  }

  muestraInicioEuro() {
    msgInicioFase('COMIENZA LA EUROCOPA');
  }

  muestraPartidos() {
    /* 
      Mostramos la jornada de cada grupo, resultado del partido 
      y la tabla despues de los partidos
    */
    for (let i = 0; i < 3; i++) {
      const nombreJornada = `Jornada ${i + 1}`;
      this.grupos.forEach((grupo) => {
        msgGrupo(grupo.letra, nombreJornada)
        grupo.calendario[i].forEach((partido) => {
          const nuevoPartido = new PartidoFaseGrupos(
            partido.local,
            partido.visitante
          );
          nuevoPartido.jugar();
        });
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
      //Iteramos para cada grupo que tenemos
      /* 
        Por cada grupo ordenaremos segun criterios de practica:
          - Puntos
          - Gol Average
          - Nombre
        los equipos de cada uno
      */

      const equiposOrdenados = grupo.equipos.sort(ordenacion);
      equiposOrdenados.forEach((equipo, index) => {
        if (index < equiposOrdenados.length - 2) {
          // Solo cogeremos los 2 primeros
          const equipoClasificado = {
            grupo: grupo.letra,
            equipo: equipo,
          };
          /*
            Añadiremos a equiposClasificados[0] a los primeros 
            y a equiposClasificados[1] a los segundos
          */
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
          // Estos seran los que estén en 3a posicion...
          const equipoClasificado = {
            grupo: grupo.letra,
            equipo,
          };
          /*
            Añadimos todos los terceros al array tercerosClasificados
          */
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
      .splice(0, 4)
    return tercerosOrdenados; // Se devuelven los 4 mejores terceros
  }

}
