export default class Equipo {
  constructor(nombre) {
    this.nombre = nombre;
    this.victorias = 0;
    this.derrotas = 0;
    this.empates = 0;
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

  añadeVictoria() {
    this.victorias++;
  }

  getDerrotas() {
    return this.derrotas;
  }

  añadeDerrota() {
    this.derrotas++;
  }

  getEmpates() {
    return this.empates;
  }

  añadeEmpates() {
    this.empates++;
  }

  getGolesAfavor() {
    return this.golesAfavor;
  }

  añadeGolesAfavor(goles) {
    this.golesAfavor += goles;
  }

  getGolesEnContra() {
    return this.golesEnContra;
  }

  añadeGolesEnContra(goles) {
    this.golesEnContra += goles;
  }

  getGolAverage() {
    return this.golAverage;
  }

  actualizaGolAverage() {
    this.golAverage = this.golesAfavor - this.golesEnContra;
  }
}
