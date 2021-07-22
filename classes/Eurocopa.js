import FaseGrupos from './FaseGrupos.js';
import Playoffs from './Playoffs.js';

export default class Eurocopa {
  constructor() {
    this.faseGrupos = undefined;
    this.playoffs = undefined;
  }

  iniciaEurocopa() {
    this.faseGrupos = new FaseGrupos();
    this.faseGrupos.iniciaFaseGrupos();

    const equiposClasificados = this.faseGrupos.getClasificados();
    this.playoffs = new Playoffs(equiposClasificados);
    this.playoffs.iniciaPlayoffs();
  }
}
