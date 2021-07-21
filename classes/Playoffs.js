import { generaGoles } from './helpers/generadorGoles.js';
import { jugar } from './helpers/jugar.js';

export default class Playoffs {
  constructor(equiposClasificados) {
    this.tabla = [];
    this.equiposClasificados = equiposClasificados;
    this.creaOctavos();
  }

  iniciaPlayoffs() {
    this.mensajeInicial();
    this.mensajeRonda('OCTAVOS DE FINAL');
    this.juegaPartidos();
  }

  mensajeInicial() {
    console.log('==================================================');
    console.log('====== COMIENZO DE LA FASE DE ELIMINATORIAS ======');
    console.log('==================================================');
    console.log('');
  }

  mensajeRonda(ronda) {
    console.log('');
    console.log(`===== ${ronda} =====`);
    console.log('');
  }

  creaOctavos() {
    this.creaTabla();
    this.addPrimerosClasificados();
    this.addSegundosSinTerceros();
    this.addRestoSegundos();
    this.addTercerosClasificados();
  }

  creaTabla() {
    /*
        Creamos la tabla inicial:
        [
            Q1:{local: '', visitante: ''}
            Q2:{local: '', visitante: ''}
            Q3:{local: '', visitante: ''}
            Q4:{local: '', visitante: ''}
            Q5:{local: '', visitante: ''}
            Q6:{local: '', visitante: ''}    
        ]
    */
    for (let i = 0; i < 8; i++) {
      const partido = {
        grupo: `Q${i + 1}`,
        local: '',
        visitante: '',
      };
      this.tabla.push(partido);
    }
  }

  addPrimerosClasificados() {
    /*
      Añadimos los primeros clasificados desde Q1 a Q6 como locales de forma inversa:
        Q1:{local: 'F1', visitante: ''}
        Q2:{local: 'E1', visitante: ''}
        Q3:{local: 'D1', visitante: ''}
        Q4:{local: 'C1', visitante: ''}
        Q5:{local: 'B1', visitante: ''}
        Q6:{local: 'A1', visitante: ''}
    */
    const primerosClasificados = [...this.equiposClasificados[0]];
    let indiceUltimo = primerosClasificados.length - 1;
    primerosClasificados.forEach((equipo) => {
      this.tabla[indiceUltimo].local = equipo;
      indiceUltimo--;
    });
  }

  addSegundosSinTerceros() {
    /* 
      Añadimos los segundos clasificados de los grupos que no se han clasificado sus terceros
      obteniendo, de los terceros SI clasificados la letra de sus grupos y comparando dichas letras de grupo
      con todos los segundos clasificados y recuperando los equipos en los cuales dichas letras no hayan sido
      iguales a la de los segundos clasificados, añadiendo estos ultimos a Q7 y Q8:
        Q7:{local: 'X2', visitante: ''}
        Q8:{local: 'Y2', visitante: ''}
    */
    const letrasTerceros = [];
    const segundosSinTerceros = [];
    const segundosClasificados = [...this.equiposClasificados[1]];

    this.equiposClasificados[2].forEach((equipo) =>
      letrasTerceros.push(equipo.grupo)
    );

    segundosClasificados.forEach((equipo) => {
      if (letrasTerceros.every((letra) => letra !== equipo.grupo)) {
        segundosSinTerceros.push(equipo);
      }
    });

    this.tabla[6].local = segundosSinTerceros[0];
    this.tabla[7].local = segundosSinTerceros[1];
  }

  addRestoSegundos() {
    // De todos los segundos, filtramos y recuperamos los que no estan posicionados en la tabla aún

    const segundosPosicionados = [this.tabla[6].local, this.tabla[7].local]; // Segundos ya posicionados
    const segundosSinPosicionar = this.equiposClasificados[1].filter(
      (equipo) => {
        return equipo.grupo !== segundosPosicionados[0].grupo &&
          equipo.grupo !== segundosPosicionados[1].grupo
          ? equipo
          : null;
      }
    );

    this.tabla.forEach((partido, indexPartido) => {
      if (indexPartido > 3) {
        // Empezaremos a posicionar desde Q5
        segundosSinPosicionar.forEach((equipo, index) => {
          if (partido.visitante === '') {
            // Comprobamos que no haya ningún equipo en la posicion de visitante
            if (equipo.grupo !== partido.local.grupo) {
              partido.visitante = equipo;
              segundosSinPosicionar.splice(index, 1);
            }
          }
        });
      }
    });
  }

  addTercerosClasificados() {
    const tercerosClasificados = [...this.equiposClasificados[2]];

    /*
    Comprobamos si en los terceros clasificados hay alguno del GRUPO C, pues sabemos que Q4 = C1 vs ''
    y puede haber problema de repetición de GRUPO C en Q4
    */
    const equipoMismoGrupo = tercerosClasificados.filter((equipo, index) => {
      if (equipo.grupo === 'C') {
        tercerosClasificados.splice(index, 1);
        return equipo;
      }
    });
    /*
    En caso de haber un tercer clasificado del grupo C, pasamos a colocarlo como visitante en el primer
    partido, pues Q1 = F1 vs '' siempre, dada la tabla de la práctica
    */

    if (equipoMismoGrupo.length !== 0) {
      this.tabla[0].visitante = equipoMismoGrupo[0];
    }

    this.tabla.forEach((partido, indexPartido) => {
      if (indexPartido < 4) {
        // Posicionamos terceros desde Q1 hasta Q4
        tercerosClasificados.forEach((equipo, indexEquipo) => {
          if (partido.visitante === '') {
            // Comprobamos que no haya ningún equipo en la posicion de visitante
            if (equipo.grupo !== partido.local.grupo) {
              // Comprobamos que no sean del mismo grupo
              partido.visitante = equipo;
              tercerosClasificados.splice(indexEquipo, 1);
            }
          }
        });
      }
    });
  }

  juegaPartidos() {
    this.tabla.forEach((partido) => {
      const golesLocal = generaGoles();
      const golesVisitante = generaGoles();
      const equipoLocal = partido.local.equipo;
      const equipoVisitante = partido.visitante.equipo;
      const nombreEquipoLocal = partido.local.equipo.nombre;
      const nombreEquipoVisitante = partido.visitante.equipo.nombre;
      const equipoGanador = jugar(
        equipoLocal,
        equipoVisitante,
        golesLocal,
        golesVisitante
      );
      console.log('');
    });
  }

  muestraPartido(equipoLocal, equipoVisitante, golesLocal, golesVisitante) {
    console.log(
      `${equipoLocal} ${golesLocal} - ${golesVisitante} ${equipoVisitante} `
    );
  }
}
