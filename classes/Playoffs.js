import {
  msgCampeon,
  msgInicioFase,
  msgRonda,
} from './helpers/msgEstilizados.js';

import { PartidoPlayOffs } from './Partido.js';

export default class Playoffs {
  constructor(equiposFaseGrupo) {
    this.tabla = [[], [], [], [], []]; // [0][0] => Octavos / [0][1] => Cuartos / [0][2] => Semis / [0][3] => Tercer y Cuarto Puesto / [0][4] => Final
    this.equiposFaseGrupo = equiposFaseGrupo;
    this.equiposClasificados = [];
    this.campeon = undefined;
    this.creaCuadroPlayOffs();
  }

  iniciaPlayoffs() {
    this.mensajeInicial();
    this.mensajeRonda('EQUIPOS CLASIFICADOS');
    this.muestraEquiposClasificados();
    this.mensajeRonda('OCTAVOS DE FINAL');
    this.addEquiposFaseGrupo();
    this.iniciaOctavos();
    this.addEquiposCuartos();
    this.mensajeRonda('CUARTOS DE FINAL');
    this.iniciaCuartos();
    this.addEquiposSemis();
    this.mensajeRonda('SEMIFINALES');
    this.iniciaSemis();
    this.mensajeRonda('TERCER Y CUARTO PUESTO');
    this.iniciaTercerYcuarto();
    this.mensajeRonda('FINAL');
    this.iniciaFinal();
    this.mensajeCampeon();
  }

  mensajeInicial() {
    msgInicioFase('COMIENZO DE LA FASE DE ELIMINATORIAS');
  }

  muestraEquiposClasificados(){
    this.equiposFaseGrupo.forEach(grupo => {
      grupo.forEach( equipo => console.log(equipo.equipo.nombre))
    })
  }

  mensajeRonda(ronda) {
    msgRonda(ronda);
  }

  mensajeCampeon() {
    msgCampeon(this.campeon.nombre);
    this.campeon.muestraBandera()
  }

  creaCuadroPlayOffs() {
    this.creaOctavos();
    this.creaCuartos();
    this.creaSemis();
    this.creaTercerCuartoPuesto();
    this.creaFinal();
  }

  creaOctavos() {
    /*
        Creamos los octavos (this.tabla[0][0]):
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
      this.tabla[0].push(partido);
    }
  }

  creaCuartos() {
    /**
     * Creamos los cuartos (this.tabla[0][1]):
     */
    const grupos = [
      ['Q1', 'Q8'],
      ['Q3', 'Q6'],
      ['Q7', 'Q2'],
      ['Q5', 'Q4'],
    ];
    grupos.forEach((grupo) => {
      const partido = {
        local: grupo[0],
        visitante: grupo[1],
      };
      this.tabla[1].push(partido);
    });
  }

  creaSemis() {
    for (let i = 0; i < 2; i++) {
      const partido = {
        local: '',
        visitante: '',
      };
      this.tabla[2].push(partido);
    }
  }

  creaTercerCuartoPuesto() {
    const partido = {
      local: '',
      visitante: '',
    };
    this.tabla[3].push(partido);
  }

  creaFinal() {
    const partido = {
      local: '',
      visitante: '',
    };
    this.tabla[4].push(partido);
  }

  addEquiposFaseGrupo() {
    this.addPrimerosClasificados();
    this.addSegundosSinTerceros();
    this.addRestoSegundos();
    this.addTercerosClasificados();
  }

  addPrimerosClasificados() {
    /*
      A??adimos los primeros clasificados desde Q1 a Q6 como locales de forma inversa:
        Q1:{local: 'F1', visitante: ''}
        Q2:{local: 'E1', visitante: ''}
        Q3:{local: 'D1', visitante: ''}
        Q4:{local: 'C1', visitante: ''}
        Q5:{local: 'B1', visitante: ''}
        Q6:{local: 'A1', visitante: ''}
    */
    const primerosClasificados = [...this.equiposFaseGrupo[0]];
    let indiceUltimo = primerosClasificados.length - 1;
    primerosClasificados.forEach((equipo) => {
      this.tabla[0][indiceUltimo].local = equipo;
      indiceUltimo--;
    });
  }

  addSegundosSinTerceros() {
    /* 
      A??adimos los segundos clasificados de los grupos que no se han clasificado sus terceros
      obteniendo, de los terceros SI clasificados la letra de sus grupos y comparando dichas letras de grupo
      con todos los segundos clasificados y recuperando los equipos en los cuales dichas letras no hayan sido
      iguales a la de los segundos clasificados, a??adiendo estos ultimos a Q7 y Q8:
        Q7:{local: 'X2', visitante: ''}
        Q8:{local: 'Y2', visitante: ''}
    */
    const letrasTerceros = [];
    const segundosSinTerceros = [];
    const segundosClasificados = [...this.equiposFaseGrupo[1]];

    this.equiposFaseGrupo[2].forEach(
      (equipo) => letrasTerceros.push(equipo.grupo) // A??adimos las letras de los grupos de los terceros que SI se han clasificado
    );

    segundosClasificados.forEach((equipo) => {
      if (letrasTerceros.every((letra) => letra !== equipo.grupo)) {
        segundosSinTerceros.push(equipo);
      }
    });

    this.tabla[0][6].local = segundosSinTerceros[0];
    this.tabla[0][7].local = segundosSinTerceros[1];
  }

  addRestoSegundos() {
    // De todos los segundos, filtramos y recuperamos los que no estan posicionados en la tabla a??n

    const segundosPosicionados = [
      this.tabla[0][6].local,
      this.tabla[0][7].local,
    ]; // Segundos ya posicionados
    const segundosSinPosicionar = this.equiposFaseGrupo[1].filter((equipo) => {
      /**
       * Recorremos todos los segundos y comparamos con los ya posicionados
       */
      return (
        equipo.grupo !== segundosPosicionados[0].grupo &&
        equipo.grupo !== segundosPosicionados[1].grupo
      );
      // ? equipo
      // : null;
    });

    this.tabla[0].forEach((partido, indexPartido) => {
      if (indexPartido > 3) {
        // Empezaremos a posicionar desde Q5
        segundosSinPosicionar.forEach((equipo, index) => {
          if (partido.visitante === '') {
            // Comprobamos que no haya ning??n equipo en la posicion de visitante
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
    const tercerosClasificados = [...this.equiposFaseGrupo[2]];

    /*
    Comprobamos si en los terceros clasificados hay alguno del GRUPO C, pues sabemos que Q4 = C1 vs ''
    y puede haber problema de repetici??n de GRUPO C en Q4.
    En caso de haber un tercer clasificado del grupo C, pasamos a colocarlo 
    como visitante en el primer partido, pues Q1 = F1 vs '' siempre, dada la tabla 
    de la pr??ctica
    */
    tercerosClasificados.forEach((equipo, index) => {
      if (equipo.grupo === 'C') {
        tercerosClasificados.splice(index, 1);
        this.tabla[0][0].visitante = equipo;
      }
    });

    this.tabla[0].forEach((partido, indexPartido) => {
      if (indexPartido < 4) {
        // Posicionamos terceros desde Q1 hasta Q4
        tercerosClasificados.forEach((equipo, indexEquipo) => {
          if (partido.visitante === '') {
            // Comprobamos que no haya ning??n equipo en la posicion de visitante
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

  addEquiposCuartos() {
    this.tabla[1].forEach((partido) => {
      const equipoLocal = this.equiposClasificados.find(
        (equipo) => equipo.grupo === partido.local
      );
      const equipoVisitante = this.equiposClasificados.find(
        (equipo) => equipo.grupo === partido.visitante
      );
      partido.local = equipoLocal.equipo;
      partido.visitante = equipoVisitante.equipo;
    });

    // Reseteamos los equipos clasificados para a??adir los siguientes clasificados una vez finalicen los cuartos
    this.equiposClasificados = [];
  }

  addEquiposSemis() {
    this.tabla[2][0].local = this.equiposClasificados[0].equipo;
    this.tabla[2][0].visitante = this.equiposClasificados[1].equipo;
    this.tabla[2][1].local = this.equiposClasificados[2].equipo;
    this.tabla[2][1].visitante = this.equiposClasificados[3].equipo;

    this.equiposClasificados = []; // Reseteamos los equipos clasificados para a??adir los siguientes
  }

  iniciaOctavos() {
    this.tabla[0].forEach((partido) => {
      const equipoLocal = partido.local.equipo;
      const equipoVisitante = partido.visitante.equipo;
      const nuevoPartido = new PartidoPlayOffs(equipoLocal, equipoVisitante);
      nuevoPartido.jugar();
      console.log('');
      const equipoClasificado = {
        grupo: partido.grupo,
        equipo: nuevoPartido.equipoGanador,
      };
      this.equiposClasificados.push(equipoClasificado);
    });
  }

  iniciaCuartos() {
    this.tabla[1].forEach((partido) => {
      const equipoLocal = partido.local;
      const equipoVisitante = partido.visitante;
      const nuevoPartido = new PartidoPlayOffs(equipoLocal, equipoVisitante);
      nuevoPartido.jugar();
      console.log('');
      const equipoClasificado = {
        equipo: nuevoPartido.equipoGanador,
      };
      this.equiposClasificados.push(equipoClasificado);
    });
  }

  iniciaSemis() {
    this.tabla[2].forEach((partido, indexPartido) => {
      const equipoLocal = partido.local;
      const equipoVisitante = partido.visitante;
      const nuevoPartido = new PartidoPlayOffs(equipoLocal, equipoVisitante);
      nuevoPartido.jugar();
      console.log('');

      const equipoClasificado = {
        equipo: nuevoPartido.equipoGanador,
      };
      const equipoNoClasificado = {
        equipo: nuevoPartido.equipoPerdedor,
      };
      /*
        Del primer enfrentamiento de semis, salen, los locales de 3er y 4o puesto y de la Final
        Del segundo enfrentamiento de semis, salen, los visitantes 
      */
      if (indexPartido === 0) {
        this.tabla[3][0].local = equipoNoClasificado.equipo;
        this.tabla[4][0].local = equipoClasificado.equipo;
      } else {
        this.tabla[3][0].visitante = equipoNoClasificado.equipo;
        this.tabla[4][0].visitante = equipoClasificado.equipo;
      }
    });
  }

  iniciaTercerYcuarto() {
    this.tabla[3].forEach((partido) => {
      const equipoLocal = partido.local;
      const equipoVisitante = partido.visitante;
      const nuevoPartido = new PartidoPlayOffs(equipoLocal, equipoVisitante);
      nuevoPartido.jugar();
      console.log('');
    });
  }

  iniciaFinal() {
    this.tabla[4].forEach((partido) => {
      const equipoLocal = partido.local;
      const equipoVisitante = partido.visitante;
      const nuevoPartido = new PartidoPlayOffs(equipoLocal, equipoVisitante);
      nuevoPartido.jugar();
      console.log('');
      this.campeon = nuevoPartido.equipoGanador;
    });
  }
}
