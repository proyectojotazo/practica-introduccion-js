export const ordenacion = (a, b) => {
  // Comprobamos primero los puntos. En caso de empate pasamos a comprobar GolAverage
  if (a.puntos < b.puntos) {
    return 1;
  } else if (b.puntos < a.puntos) {
    return -1;
  } else {
    // Comprobamos el Gol Average. En caso de empate pasamos a ordenar por Nombre
    if (a.golAverage < b.golAverage) {
      return 1;
    } else if (b.golAverage < a.golAverage) {
      return -1;
    } else {
      // Último caso. Orden por Nombre
      if (a.nombre > b.nombre) {
        return 1;
      } else if (b.nombre > a.nombre) {
        return -1;
      } else {
        return 0;
      }
    }
  }
};
