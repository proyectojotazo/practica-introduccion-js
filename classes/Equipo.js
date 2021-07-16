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
  }

  getNombre() {
    return this.nombre;
  }

  getVictorias() {
    return this.victorias;
  }

  addVictoria() {
    this.victorias++;
  }

  getDerrotas() {
    return this.derrotas;
  }

  addDerrota() {
    this.derrotas++;
  }

  getEmpates() {
    return this.empates;
  }

  addEmpate() {
    this.empates++;
  }

  getPuntos() {
    return this.getPuntos;
  }

  addPuntos(puntos) {
    this.puntos += puntos;
  }

  getGolesAfavor() {
    return this.golesAfavor;
  }

  addGolesAfavor(goles) {
    this.golesAfavor += goles;
  }

  getGolesEnContra() {
    return this.golesEnContra;
  }

  addGolesEnContra(goles) {
    this.golesEnContra += goles;
  }

  getGolAverage() {
    return this.golAverage;
  }

  actualizaGolAverage() {
    this.golAverage = this.golesAfavor - this.golesEnContra;
  }
}
