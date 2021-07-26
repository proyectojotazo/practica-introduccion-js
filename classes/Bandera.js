import chalk from 'chalk';

const BANDERAS = {
  horizontal: {
    tricolor: [
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'],
      ['OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'],
      ['OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'],
    ],
    bicolor: [
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
    ],
  },
  vertical: {
    tricolor: [
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXOOOOOOOOOOOOOO'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXOOOOOOOOOOOOOO'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXOOOOOOOOOOOOOO'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXOOOOOOOOOOOOOO'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXOOOOOOOOOOOOOO'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXOOOOOOOOOOOOOO'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXOOOOOOOOOOOOOO'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXOOOOOOOOOOOOOO'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXOOOOOOOOOOOOOO'],
    ],
  },
  cruces: {
    cruzDesplazada: [
      ['TTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTTTTTTTTT'],
    ],
    cruzRelleno: [
      ['TTTTTTTTTOOXXXOOTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTOOXXXOOTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTOOXXXOOTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['OOOOOOOOOOOXXXOOOOOOOOOOOOOOOOOOOOOOOOOOO'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['OOOOOOOOOOOXXXOOOOOOOOOOOOOOOOOOOOOOOOOOO'],
      ['TTTTTTTTTOOXXXOOTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTOOXXXOOTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTOOXXXOOTTTTTTTTTTTTTTTTTTTTTTTTT'],
    ],
    cruzCentral: [
      // Irlanda norte, inglaterra, georgia
      ['TTTTTTTTTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTT'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTT'],
    ],
  },
  especiales: {
    georgia: [
      ['TTTTTTTTTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTXTTTTTTTTTXXXXTTTTTTTTTXTTTTTTTTT'],
      ['TTTTTTTTXXXTTTTTTTTXXXXTTTTTTTTXXXTTTTTTTT'],
      ['TTTTTTTTTXTTTTTTTTTXXXXTTTTTTTTTXTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTT'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTXTTTTTTTTTXXXXTTTTTTTTTXTTTTTTTTT'],
      ['TTTTTTTTXXXTTTTTTTTXXXXTTTTTTTTXXXTTTTTTTT'],
      ['TTTTTTTTTXTTTTTTTTTXXXXTTTTTTTTTXTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTXXXXTTTTTTTTTTTTTTTTTTT'],
    ],
    israel: [
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXTXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXTXTXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXTTTTTTTTTTTTTXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXTXTXXXXXTXTXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXTXXXXXXXTXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXTXTXXXXXTXTXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXTTTTTTTTTTTTTXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXTXTXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXTXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
    ],
    grecia: [
      ['TTTTXXTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTXXTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTXXTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTXXTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
    ],
    gibraltar: [
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
    ],
    letonia: [
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
    ],
    malta: [
      ['TTTTTTTTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTOOOTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXX'],
      ['TTOOOOOOOTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTOOOTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXX'],
    ],
    montenegro: [
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT'],
      ['TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT'],
      ['TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT'],
      ['TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT'],
      ['TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT'],
      ['TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT'],
      ['TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
    ],
    portugal: [
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
      ['TTTTTTTTTTTTTTXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
    ],
    suiza: [
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTXXXXXTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTXXXXXTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTXXXXXXXXXXXXXXXTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTXXXXXXXXXXXXXXXTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTXXXXXTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTXXXXXTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
      ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
    ],
  },
  noflag: [
    ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
    ['TTTTTTTTTTTTTTTTTTTTTTXXTTTTTTTTTTTTTTTTTTTTTT'],
    ['TTTTTTTTTTTTTTTTTTXXTTTTTTXXTTTTTTTTTTTTTTTTTT'],
    ['TTTTTTTTTTTTTTXXTTTTTTTTTTTTTTXXTTTTTTTTTTTTTT'],
    ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
    ['TTTTTTTTTTTXXTTTTTTTTTTTTTTTTTTTTXXTTTTTTTTTTT'],
    ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
    ['TTTTTTTTTTTTTTXXTTTTTTTTTTTTTTXXTTTTTTTTTTTTTT'],
    ['TTTTTTTTTTTTTTTTTTXXTTTTTTXXTTTTTTTTTTTTTTTTTT'],
    ['TTTTTTTTTTTTTTTTTTTTTTXXTTTTTTTTTTTTTTTTTTTTTT'],
    ['TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT'],
  ],
};

const colores = {
  negro: chalk.bgHex('#000000').hex('#000000'),
  blanco: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
};

const PAISES = {
  alemania: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: colores.negro,
    colorX: chalk.bgHex('#F21F02').hex('#F21F02'),
    colorO: chalk.bgHex('#FFCF00').hex('#FFCF00'),
  },
  armenia: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#DA000A').hex('#DA000A'),
    colorX: chalk.bgHex('#0D25F5').hex('#0D25F5'),
    colorO: chalk.bgHex('#F2A900').hex('#F2A900'),
  },
  austria: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#EE2436').hex('#EE2436'),
    colorX: colores.blanco,
    colorO: chalk.bgHex('#EE2436').hex('#EE2436'),
  },
  azerbaijan: {
    // Falta simbolo central
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#00B6E3').hex('#00B6E3'),
    colorX: chalk.bgHex('#EF303E').hex('#EF303E'),
    colorO: chalk.bgHex('#4F9F2B').hex('#4F9F2B'),
  },
  bielorusia: {
    // Falta barra lateral blanca
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#CF101A').hex('#CF101A'),
    colorX: chalk.bgHex('#CF101A').hex('#CF101A'),
    colorO: chalk.bgHex('#007D2C').hex('#007D2C'),
  },
  bulgaria: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: colores.blanco,
    colorX: chalk.bgHex('#00976E').hex('#00976E'),
    colorO: chalk.bgHex('#D7210A').hex('#D7210A'),
  },
  croacia: {
    // Falta escudo central
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#FF0000').hex('#FF0000'),
    colorX: colores.blanco,
    colorO: chalk.bgHex('#101097').hex('#101097'),
  },
  eslovaquia: {
    // Falta escudo central
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#034DA3').hex('#034DA3'),
    colorO: chalk.bgHex('#EF1520').hex('#EF1520'),
  },
  eslovenia: {
    // Falta escudo central
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#005CE6').hex('#005CE6'),
    colorO: chalk.bgHex('#FF0000').hex('#FF0000'),
  },
  españa: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#C70318').hex('#C70318'),
    colorX: chalk.bgHex('#FFC500').hex('#FFC500'),
    colorO: chalk.bgHex('#C70318').hex('#C70318'),
  },
  estonia: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#0073CF').hex('#0073CF'),
    colorX: chalk.bgHex('#000000').hex('#000000'),
    colorO: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
  },
  hungria: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#CF2436').hex('#CF2436'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorO: chalk.bgHex('#45704F').hex('#45704F'),
  },
  lituania: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#FDBA0B').hex('#FDBA0B'),
    colorX: chalk.bgHex('#006A42').hex('#006A42'),
    colorO: chalk.bgHex('#C22229').hex('#C22229'),
  },
  luxemburgo: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#EE2436').hex('#EE2436'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorO: chalk.bgHex('#00A2DF').hex('#00A2DF'),
  },
  holanda: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#AF1523').hex('#AF1523'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorO: chalk.bgHex('#1B448C').hex('#1B448C'),
  },
  rusia: {
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#0036A7').hex('#0036A7'),
    colorO: chalk.bgHex('#D62718').hex('#D62718'),
  },
  serbia: {
    // Falta escudo central
    bandera: BANDERAS.horizontal.tricolor,
    colorT: chalk.bgHex('#C73339').hex('#C73339'),
    colorX: chalk.bgHex('#043E77').hex('#043E77'),
    colorO: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
  },

  andorra: {
    // Falta escudo central
    bandera: BANDERAS.vertical.tricolor,
    colorT: chalk.bgHex('#0D25F5').hex('#0D25F5'),
    colorX: chalk.bgHex('#FFCF00').hex('#FFCF00'),
    colorO: chalk.bgHex('#F21F02').hex('#F21F02'),
  },
  belgica: {
    bandera: BANDERAS.vertical.tricolor,
    colorT: colores.negro,
    colorX: chalk.bgHex('#FFCF00').hex('#FFCF00'),
    colorO: chalk.bgHex('#F21F02').hex('#F21F02'),
  },
  francia: {
    bandera: BANDERAS.vertical.tricolor,
    colorT: chalk.bgHex('#001E96').hex('#001E96'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorO: chalk.bgHex('#EE2436').hex('#EE2436'),
  },
  irlanda: {
    bandera: BANDERAS.vertical.tricolor,
    colorT: chalk.bgHex('#0E9C62').hex('#0E9C62'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorO: chalk.bgHex('#FF893C').hex('#FF893C'),
  },
  italia: {
    bandera: BANDERAS.vertical.tricolor,
    colorT: chalk.bgHex('#009344').hex('#009344'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorO: chalk.bgHex('#CF2734').hex('#CF2734'),
  },
  moldavia: {
    // Falta escudo central
    bandera: BANDERAS.vertical.tricolor,
    colorT: chalk.bgHex('#0044AF').hex('#0044AF'),
    colorX: chalk.bgHex('#FFD300').hex('#FFD300'),
    colorO: chalk.bgHex('#CD022B').hex('#CD022B'),
  },
  rumania: {
    bandera: BANDERAS.vertical.tricolor,
    colorT: chalk.bgHex('#002780').hex('#002780'),
    colorX: chalk.bgHex('#FCD20F').hex('#FCD20F'),
    colorO: chalk.bgHex('#CF0921').hex('#CF0921'),
  },
  dinamarca: {
    bandera: BANDERAS.cruces.cruzDesplazada,
    colorT: chalk.bgHex('#C7042C').hex('#C7042C'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
  },
  finlandia: {
    bandera: BANDERAS.cruces.cruzDesplazada,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#003281').hex('#003281'),
  },
  gales: {
    // Falta dragon central
    bandera: BANDERAS.horizontal.bicolor,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#00B23E').hex('#00B23E'),
  },
  georgia: {
    bandera: BANDERAS.especiales.georgia,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#FF0000').hex('#FF0000'),
  },
  gibraltar: {
    bandera: BANDERAS.especiales.gibraltar,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#DB0004').hex('#DB0004'),
  },
  grecia: {
    bandera: BANDERAS.especiales.grecia,
    colorT: chalk.bgHex('#055EB0').hex('#055EB0'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
  },
  israel: {
    bandera: BANDERAS.especiales.israel,
    colorT: chalk.bgHex('#0035B9').hex('#0035B9'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
  },
  inglaterra: {
    bandera: BANDERAS.cruces.cruzCentral,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#C9072A').hex('#C9072A'),
  },
  irlandanorte: {
    // Falta escudo central
    bandera: BANDERAS.cruces.cruzCentral,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#C9072A').hex('#C9072A'),
  },
  islasferoe: {
    bandera: BANDERAS.cruces.cruzRelleno,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#EE2436').hex('#EE2436'),
    colorO: chalk.bgHex('#0065BE').hex('#0065BE'),
  },
  islandia: {
    bandera: BANDERAS.cruces.cruzRelleno,
    colorT: chalk.bgHex('#00519D').hex('#00519D'),
    colorX: chalk.bgHex('#DD1832').hex('#DD1832'),
    colorO: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
  },
  letonia: {
    bandera: BANDERAS.especiales.letonia,
    colorT: chalk.bgHex('#9F2C36').hex('#9F2C36'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
  },
  liechtenstein: {
    // Falta corona superior
    bandera: BANDERAS.horizontal.bicolor,
    colorT: chalk.bgHex('#002780').hex('#002780'),
    colorX: chalk.bgHex('#CF0921').hex('#CF0921'),
  },
  malta: {
    bandera: BANDERAS.especiales.malta,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#D00C27').hex('#D00C27'),
    colorO: chalk.bgHex('#CDCDCD').hex('#CDCDCD'),
  },
  montenegro: {
    // Falta simbolo central
    bandera: BANDERAS.especiales.montenegro,
    colorT: chalk.bgHex('#D4AF38').hex('#D4AF38'),
    colorX: chalk.bgHex('#C50002').hex('#C50002'),
  },
  noruega: {
    bandera: BANDERAS.cruces.cruzRelleno,
    colorT: chalk.bgHex('#BB042B').hex('#BB042B'),
    colorX: chalk.bgHex('#001A5B').hex('#001A5B'),
    colorO: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
  },
  polonia: {
    bandera: BANDERAS.horizontal.bicolor,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#DD0C39').hex('#DD0C39'),
  },
  portugal: {
    // Falta escudo central
    bandera: BANDERAS.especiales.portugal,
    colorT: chalk.bgHex('#006600').hex('#006600'),
    colorX: chalk.bgHex('#FF0000').hex('#FF0000'),
  },
  sanmarino: {
    // Falta escudo central
    bandera: BANDERAS.horizontal.bicolor,
    colorT: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
    colorX: chalk.bgHex('#5EB7E5').hex('#5EB7E5'),
  },
  suecia: {
    bandera: BANDERAS.cruces.cruzDesplazada,
    colorT: chalk.bgHex('#006AA8').hex('#006AA8'),
    colorX: chalk.bgHex('#FECD00').hex('#FECD00'),
  },
  suiza: {
    bandera: BANDERAS.especiales.suiza,
    colorT: chalk.bgHex('#FF0000').hex('#FF0000'),
    colorX: chalk.bgHex('#FFFFFF').hex('#FFFFFF'),
  },
  ucrania: {
    bandera: BANDERAS.horizontal.bicolor,
    colorT: chalk.bgHex('#005BBC').hex('#005BBC'),
    colorX: chalk.bgHex('#FFD600').hex('#FFD600'),
  },
  europa: {
    bandera: BANDERAS.noflag,
    colorT: chalk.bgHex('#0000F1').hex('#0000F1'),
    colorX: chalk.bgHex('#F0E403').hex('#F0E403'),
  },
};

const PAISES_SIN_BANDERA = [
  'Albania',
  'Bosnia',
  'Chipre',
  'Escocia',
  'Kazakhstan',
  'Kosovo',
  'Macedonia Norte',
  'Republica Checa',
  'Turquia',
];

export default class Bandera {
  constructor(nombrePais) {
    this.pais = nombrePais;
    this.bandera = this.creaBandera()
  }

  creaBandera() {
    let nombrePais = ''
    if (this.noTieneBandera()) {
      nombrePais = 'europa';
    } else {
      this.pais.split(' ').forEach((palabra) => (nombrePais += palabra));
    }
    this.pais = nombrePais
    console.log(this.pais)
    const bandera = PAISES[`${this.pais.toLowerCase()}`].bandera;
    const colores = PAISES[`${this.pais.toLowerCase()}`];

    return this.pintaBandera(bandera, colores);
  }

  pintaBandera(bandera, colores) {
    let arrayFranjas = [];

    bandera.forEach((franja) => {
      let franjaVacia = '';
      const franjaDiseccionada = franja[0].split('');
      franjaDiseccionada.forEach((caracter) => {
        franjaVacia += this.pintaCaracter(caracter, colores);
      });
      arrayFranjas.push(franjaVacia);
    });
    return arrayFranjas
  }

  pintaCaracter(caracter, colores) {
    if (caracter === 'T') {
        return colores.colorT(`${caracter}`);
      } else if (caracter === 'X') {
        return colores.colorX(`${caracter}`);
      } else if (caracter === 'O') {
        return colores.colorO(`${caracter}`);
      } else {
        new Error('Caracter invalido');
      }
  }

  noTieneBandera() {
    return PAISES_SIN_BANDERA.includes(this.pais)
  }
}
