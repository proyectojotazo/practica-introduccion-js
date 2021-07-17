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
}
