import FaseGrupos from './classes/FaseGrupos.js';
import Playoffs from './classes/Playoffs.js';

const faseGr = new FaseGrupos();
faseGr.iniciaFaseGrupos();

const equiposClasificados = faseGr.getClasificados();
const playoffs = new Playoffs(equiposClasificados);
playoffs.iniciaPlayoffs();

// TODO: Documentar codigo
