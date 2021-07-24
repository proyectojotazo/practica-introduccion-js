import {
  msgFasePartido,
  msgFinPartido,
  msgFinPenaltis,
} from './helpers/msgEstilizados.js';

class Partido {
  constructor(equipoLocal, equipoVisitante) {
    this.equipoLocal = equipoLocal;
    this.equipoVisitante = equipoVisitante;
    this.golesLocal = 0;
    this.golesVisitante = 0;
    this.equipoGanador = undefined;
    this.equipoPerdedor = undefined;
    this.listaEquipos = [this.equipoLocal, this.equipoVisitante];
  }

  devuelveEquipoGanador() {
    return this.golesLocal > this.golesVisitante
      ? this.equipoLocal
      : this.golesLocal < this.golesVisitante
      ? this.equipoVisitante
      : null;
  }

  devuelveEquipoPerdedor() {
    return this.golesLocal < this.golesVisitante
      ? this.equipoLocal
      : this.golesLocal > this.golesVisitante
      ? this.equipoVisitante
      : null;
  }

  hayGanador() {
    return (
      this.devuelveEquipoGanador() !== null &&
      this.devuelveEquipoPerdedor() !== null
    );
  }

  jugar() {
    // Generamos los goles aleatorios y los introducimos en goles locales y visitantes
    this.generaMarcador();
  }

  generaMarcador(range = 6) {
    this.golesLocal = this.generaGoles(range);
    this.golesVisitante = this.generaGoles(range);
  }

  addGolesEquipos() {}

  compruebaGanador() {}

  muestraFinPartido() {}

  generaGoles(range) {
    return Math.floor(Math.random() * range);
  }
}

export class PartidoFaseGrupos extends Partido {
  constructor(equipoLocal, equipoVisitante) {
    super(equipoLocal, equipoVisitante);
  }

  jugar() {
    super.jugar();
    // Añádimos a cada equipo los Goles a favor y encontra encajados
    this.addGolesEquipos();
    // Comprobamos resultados y declaramos el equipo ganador
    this.compruebaGanador();
    // Mostramos el resultado del partido
    this.muestraFinPartido();
  }

  addGolesEquipos() {
    /*
       Añadimos a los equipos los goles a favor y en contra y 
       actualizamos el golAverage
      */

    this.listaEquipos.forEach((equipo, index) => {
      const golesFavor = index === 0 ? this.golesLocal : this.golesVisitante;
      const golesContra = index === 0 ? this.golesVisitante : this.golesLocal;
      equipo.addGolesAfavor(golesFavor);
      equipo.addGolesEnContra(golesContra);
      equipo.actualizaGolAverage();
    });
  }

  compruebaGanador() {
    /*
       Asignamos en funcion de los goles, al equipo ganador y perdedor del partido
       En caso de empate los equipos 'Ganador' y 'Perdedor' seran null
      */
    this.equipoGanador = this.devuelveEquipoGanador();
    this.equipoPerdedor = this.devuelveEquipoPerdedor();

    // En caso de que haya un ganador y un perdedor
    if (this.hayGanador()) {
      /* 
        Añadimos la victoria y los puntos al equipo ganador y la derrota
        al equipo perdedor.
      */
      this.equipoGanador.addVictoria();
      this.equipoGanador.addPuntos(3);
      this.equipoPerdedor.addDerrota();
    } else {
      //En caso de empate añadimos el empate y el punto a ambos equipos
      this.listaEquipos.forEach((equipo) => {
        equipo.addEmpate();
        equipo.addPuntos(1);
      });
    }
  }

  muestraFinPartido() {
    const msgColoreado = msgFinPartido(
      this.equipoLocal.nombre,
      this.equipoVisitante.nombre,
      this.golesLocal,
      this.golesVisitante
    );

    console.log(msgColoreado);
  }
}

export class PartidoPlayOffs extends Partido {
  constructor(equipoLocal, equipoVisitante) {
    super(equipoLocal, equipoVisitante);
    this.penaltisLocal = 0;
    this.penaltisVisitante = 0;
  }

  jugar() {
    super.jugar();
    // Comprobamos resultados y declaramos el equipo ganador
    this.compruebaGanador();
    // Mostramos el resultado del partido
  }

  compruebaGanador() {
    this.muestraFinPartido(); // Mensaje mostrando resultado 90 minutos
    // Se comprobará que no haya empate
    if (!this.hayGanador()) {
      // Si hay empate, pasamos a prorroga
      msgFasePartido('PRÓRROGA')
      this.prorroga();
      if (!this.hayGanador()) {
        msgFasePartido('PENALTIS')
        // Si vuelve a haber empate, pasamos a penaltis
        this.penaltis();
        // Al final de penaltis ya tenemos ganador
      } else {
        // Si en la prorroga hay ganador
        this.asignaGanador();
      }
    } else {
      // Si hay ganador en los 90 minutos
      this.asignaGanador();
    }
    // Tenemos un ganador y un perdedor así que los asignamos a los equipos correspondientes
  }

  asignaGanador() {
    /*
        Asignamos el equipo ganador y reseteamos sus goles actuales para
        el/los siguientes partidos
    */
    this.equipoGanador = this.devuelveEquipoGanador();
    this.equipoPerdedor = this.devuelveEquipoPerdedor();
    this.equipoGanador.resetGolesActuales();
  }

  asignaGanadorPenaltis() {
    /*
        Asignamos el equipo ganador de los penaltis y reseteamos sus goles actuales
        para el/los siguientes partidos
    */
    this.equipoGanador = this.devuelveGanadorPenaltis();
    this.equipoPerdedor = this.devuelvePerdedorPenaltis();
    this.equipoGanador.resetGolesActuales();
    this.equipoGanador.resetPenaltis();
  }

  prorroga() {
    /*
        En la prorroga, primero añadiremos los goles, tanto locales como
        visitantes a cada equipo en 'golesActuales' y generaremos nuevos goles
        para cada equipo. Volveremos a comprobar si han encajado el mismo numero 
        de goles o no. En caso de empate se pasará a penaltis.
    */
    this.equipoLocal.addGolesActuales(this.golesLocal);
    this.equipoVisitante.addGolesActuales(this.golesVisitante);
    this.generaMarcador(3); // Generamos nuevos goles para cada equipo
    this.equipoLocal.addGolesActuales(this.golesLocal);
    this.equipoVisitante.addGolesActuales(this.golesVisitante);
    this.msgFinProrroga();
  }

  penaltis() {
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        // Penaltis del local
        this.equipoLocal.chutaPenalti();
        this.penaltisLocal = this.equipoLocal.penaltisMarcados;
      } else {
        // Penaltis visitante
        this.equipoVisitante.chutaPenalti();
        this.penaltisVisitante = this.equipoVisitante.penaltisMarcados;
      }
    }

    if (!this.hayGanadorPenaltis()) {
      this.penaltisMuerteSubita();
    }

    this.msgFinPenaltis();
    this.asignaGanadorPenaltis();
  }

  penaltisMuerteSubita() {
    while (!this.hayGanadorPenaltis()) {
      this.equipoLocal.chutaPenalti();
      this.penaltisLocal = this.equipoLocal.penaltisMarcados;
      this.equipoVisitante.chutaPenalti();
      this.penaltisVisitante = this.equipoVisitante.penaltisMarcados;
    }
  }

  hayGanadorPenaltis() {
    return (
      this.devuelveGanadorPenaltis() !== null &&
      this.devuelvePerdedorPenaltis() !== null
    );
  }

  devuelveGanadorPenaltis() {
    return this.penaltisLocal > this.penaltisVisitante
      ? this.equipoLocal
      : this.penaltisLocal < this.penaltisVisitante
      ? this.equipoVisitante
      : null;
  }

  devuelvePerdedorPenaltis() {
    return this.penaltisLocal > this.penaltisVisitante
      ? this.equipoVisitante
      : this.penaltisLocal < this.penaltisVisitante
      ? this.equipoLocal
      : null;
  }

  muestraFinPartido() {
    const nombreEquipoGanador =
      this.devuelveEquipoGanador() === null
        ? 'EMPATE'
        : this.devuelveEquipoGanador().nombre;

    // const msg = `${this.equipoLocal.nombre} ${this.golesLocal} - ${this.golesVisitante} ${this.equipoVisitante.nombre} => ${nombreEquipoGanador}`;
    const msg = msgFinPartido(
      this.equipoLocal.nombre,
      this.equipoVisitante.nombre,
      this.golesLocal,
      this.golesVisitante,
      nombreEquipoGanador
    );

    console.log(msg);
  }

  msgFinProrroga() {
    const nombreEquipoGanador =
      this.devuelveEquipoGanador() === null
        ? 'EMPATE'
        : this.devuelveEquipoGanador().nombre;

    // const msg = `${this.equipoLocal.nombre} ${this.equipoLocal.golesActuales} - ${this.equipoVisitante.golesActuales} ${this.equipoVisitante.nombre} => ${nombreEquipoGanador}`;
    const msg = msgFinPartido(
      this.equipoLocal.nombre,
      this.equipoVisitante.nombre,
      this.equipoLocal.golesActuales,
      this.equipoVisitante.golesActuales,
      nombreEquipoGanador
    );

    console.log(msg);
  }

  msgFinPenaltis() {
    const nombreEquipoGanador = this.devuelveGanadorPenaltis().nombre;
    const msg = msgFinPenaltis(
      this.equipoLocal.nombre,
      this.equipoVisitante.nombre,
      this.equipoLocal.secuenciaPenaltis,
      this.equipoVisitante.secuenciaPenaltis,
      nombreEquipoGanador
    );
    //     console.log(
    //       `${this.equipoLocal.nombre} - ${this.equipoLocal.secuenciaPenaltis}
    // ------------
    // ${this.equipoVisitante.nombre} - ${this.equipoVisitante.secuenciaPenaltis}
    // ***${nombreEquipoGanador} GANA POR PENALTIS***`
    //     );
    console.log(msg);
  }
}
