const FaseGrupos = require('./modules/FaseGrupos');

const faseGr = new FaseGrupos();
faseGr.grupos.forEach((grupo) => {
  console.log(`Grupo ${grupo.letra}`);
  console.log('---------------------');
  grupo.equipos.forEach((equipo, i) => {
    console.log(`${i + 1} - ${equipo.nombre}`);
  });
  console.log('---------------------');
});
