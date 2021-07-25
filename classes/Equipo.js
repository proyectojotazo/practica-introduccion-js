export default class Equipo {
  constructor(nombre) {
    this.nombre = nombre;
    this.victorias = 0;
    this.derrotas = 0;
    this.empates = 0;
    this.puntos = 0;
    this.golesAfavor = 0;
    this.golesEnContra = 0;
    this.golAverage = 0;
    // Atributos para playoffs
    this.golesActuales = 0; 
    this.penaltisMarcados = 0;
    this.secuenciaPenaltis = '';
  }

  addVictoria() {
    this.victorias++;
  }

  addDerrota() {
    this.derrotas++;
  }

  addEmpate() {
    this.empates++;
  }

  addPuntos(puntos) {
    this.puntos += puntos;
  }

  addGolesAfavor(goles) {
    this.golesAfavor += goles;
  }

  addGolesEnContra(goles) {
    this.golesEnContra += goles;
  }

  actualizaGolAverage() {
    this.golAverage = this.golesAfavor - this.golesEnContra;
  }

  addGolesActuales(goles) {
    this.golesActuales += goles;
  }

  resetGolesActuales() {
    this.golesActuales = 0;
  }

  chutaPenalti() {
    const penaltiMarcado = Math.round(Math.random());
    this.penaltisMarcados += penaltiMarcado;
    this.setSecuenciaPenaltis(penaltiMarcado);
  }

  setSecuenciaPenaltis(penaltiMarcado) {
    this.secuenciaPenaltis += penaltiMarcado === 1 ? 'O' : 'X';
  }

  resetPenaltis() {
    this.penaltisMarcados = 0;
    this.secuenciaPenaltis = '';
  }
}
