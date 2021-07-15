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

  setVictorias() {}

  getDerrotas() {
    return this.derrotas;
  }

  setDerrotas() {}

  getEmpates() {
    return this.empates;
  }

  setEmpates() {}

  getGolesAfavor() {
    return this.golesAfavor;
  }

  setGolesAfavor() {}

  getGolesEnContra() {
    return this.golesEnContra;
  }

  setGolesEnContra() {}

  getGolAverage() {
    return this.golAverage;
  }

  setGolAverage() {}
}
