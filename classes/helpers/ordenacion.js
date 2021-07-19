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

export const ordenacionTerceros = (a, b) => {
  // Comprobamos primero los puntos. En caso de empate pasamos a comprobar GolAverage
  if (a.equipo.puntos < b.equipo.puntos) {
    return 1;
  } else if (b.equipo.puntos < a.equipo.puntos) {
    return -1;
  } else {
    // Comprobamos el Gol Average. En caso de empate pasamos a ordenar por Nombre
    if (a.equipo.golAverage < b.equipo.golAverage) {
      return 1;
    } else if (b.equipo.golAverage < a.equipo.golAverage) {
      return -1;
    } else {
      // Último caso. Orden por Nombre
      if (a.equipo.nombre > b.equipo.nombre) {
        return 1;
      } else if (b.equipo.nombre > a.equipo.nombre) {
        return -1;
      } else {
        return 0;
      }
    }
  }
};
