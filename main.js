import FaseGrupos from './classes/FaseGrupos.js';

const faseGr = new FaseGrupos();
// console.log('Grupos y equipos');
// console.log('=========================');
// console.log('');
// faseGr.grupos.forEach((grupo) => grupo.muestraInfo());
faseGr.grupos.forEach((grupo) => {
  console.log(`Grupo ${grupo.letra}`);
  console.log(grupo.calendario);
});
