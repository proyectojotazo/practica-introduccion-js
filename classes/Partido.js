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

  jugar() {}

  generaMarcador() {
    this.golesLocal = this.generaGoles();
    this.golesVisitante = this.generaGoles();
  }

  addGolesEquipos() {}

  compruebaGanador() {}

  muestraResultado() {}

  generaGoles(range = 6) {
    return Math.floor(Math.random() * range);
  }
}

class PartidoFaseGrupos extends Partido {
  constructor(equipoLocal, equipoVisitante) {
    super(equipoLocal, equipoVisitante);
  }

  jugar() {
    // Generamos los goles aleatorios y los introducimos en goles locales y visitantes
    this.generaMarcador();
    // Añádimos a cada equipo los Goles a favor y encontra encajados
    this.addGolesEquipos();
    // Comprobamos resultados y declaramos el equipo ganador
    this.compruebaGanador();
    // Mostramos el resultado del partido
    this.muestraResultado();
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
    this.equipoGanador =
      this.golesLocal > this.golesVisitante
        ? this.equipoLocal
        : this.golesLocal < this.golesVisitante
        ? this.equipoVisitante
        : null;
    this.equipoPerdedor =
      this.golesLocal < this.golesVisitante
        ? this.equipoLocal
        : this.golesLocal > this.golesVisitante
        ? this.equipoVisitante
        : null;
    // En caso de que haya un ganador y un perdedor
    if (this.equipoGanador !== null && this.equipoPerdedor !== null) {
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

  muestraResultado() {
    console.log(
      `${this.equipoLocal.nombre} ${this.golesLocal} - ${this.golesVisitante} ${this.equipoVisitante.nombre}`
    );
  }
}
