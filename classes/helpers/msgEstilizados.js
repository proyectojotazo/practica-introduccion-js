import chalk from 'chalk';

export const msgFinPartido = (
  nombreLocal,
  nombreVisitante,
  golesLocal,
  golesVisitante
) => {
  const msg =
    golesLocal > golesVisitante
      ? chalk`{green {bold {underline ${nombreLocal}}}} {green {bold ${golesLocal}}} - {red {bold ${golesVisitante}}} {red {bold ${nombreVisitante}}}`
      : golesLocal < golesVisitante
      ? chalk`{red {bold ${nombreLocal}}} {red {bold ${golesLocal}}} - {green {bold ${golesVisitante}}} {green {bold {underline ${nombreVisitante}}}}`
      : chalk`{yellow {bold ${nombreLocal}}} {yellow {bold ${golesLocal}}} - {yellow {bold ${golesVisitante}}} {yellow {bold ${nombreVisitante}}}`;

  return msg;
};
