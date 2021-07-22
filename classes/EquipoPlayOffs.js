export default class EquipoPlayOffs {
  constructor(nombre) {
    this.nombre = nombre;
    this.golesActuales = 0;
    this.penaltisMarcados = 0;
    this.secuenciaPenaltis = '';
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
