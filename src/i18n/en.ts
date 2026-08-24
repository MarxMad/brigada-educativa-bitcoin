import type { Diccionario } from './es';

export const en: Diccionario = {
  codigo: 'en',
  htmlLang: 'en',

  proyecto: {
    nombre: 'Bitcoin Education Brigade',
    sede: 'Zacatlán de las Manzanas',
    estado: 'Sierra Norte de Puebla, Mexico',
    inicio: 'August 24, 2026',
    fin: 'September 20, 2026',
    inicioISO: '2026-08-24',
    duracion: '4 weeks',
    presupuesto: '$1,000 USD',
  },

  nav: {
    proyecto: 'Project',
    ruta: 'Plan',
    mapa: 'Map',
    metas: 'Goals',
    prensa: 'Press',
    aliados: 'Partners',
    contacto: 'Contact',
    sumaTuMarca: 'Become a sponsor',
    abrirMenu: 'Open menu',
    secciones: 'Sections',
    cambiarIdioma: 'Ver en español',
  },

  hero: {
    tituloA: 'Bitcoin education for Mexico’s',
    tituloDestacado: 'first Pueblo Mágico',
    tituloB: '',
    bajada:
      'A four-week brigade to switch on the Bitcoin circular economy in Zacatlán de las Manzanas',
    ctaPrimario: 'See the plan',
    ctaSecundario: 'Become a sponsor',
    arrancaEn: 'Starts in',
    enMarcha: 'Under way',
    terminada: 'Brigade complete',
    semanaCorta: 'Week',
    tarjetaLabel: 'People to train',
    tarjetaUnidad: ' people',
    tarjetaBadge: '4 weeks',
    tarjetaFechas: 'Aug 24 – Sep 20, 2026',
    ejes: ['W1', 'W2', 'W3', 'W4', 'Close'],
  },

  marquee: [
    'Zacatlán de las Manzanas',
    'Mexico’s first Bitcoin Pueblo Mágico',
    'Lightning Network',
    'La Cabaña de Satoshi',
    'Circular Economy',
    'Sierra Norte de Puebla',
    'Financial Sovereignty',
    'Unlock Summit 2026',
  ],

  zacatlan: {
    eyebrow: 'The place',
    titulo: 'Zacatlán de las Manzanas',
    bajada:
      'A Pueblo Mágico in the Sierra Norte de Puebla: the Floral Clock, Calle del Arco, the market, the apple orchards and the waterfall.',
    reproducir: 'Play video',
    pausar: 'Pause video',
  },

  proyectoSec: {
    eyebrow: 'The project',
    tituloA: 'A',
    tituloDestacado: 'circular economy',
    tituloB: 'that starts with education',
    tabsLabel: 'Mission, objective and vision',
    tabs: { mision: 'Mission', objetivo: 'Objective', vision: 'Vision' },
    mision:
      'To drive a Circular Economy by running an intensive Bitcoin financial education program in Zacatlán de las Manzanas that, over four weeks, trains merchants, artisans, students and families in the use of Bitcoin and the Lightning Network — switching on the first Bitcoin economic circuit in this Pueblo Mágico of the Sierra Norte de Puebla and laying the groundwork for it to become a Bitcoin-friendly destination.',
    objetivo:
      'To empower the community of Zacatlán de las Manzanas through Bitcoin education, providing practical and accessible tools so that merchants, artisans, students and families can take an active part in the global digital economy — protecting their savings from inflation, cutting transaction costs and removing financial barriers, all without giving up the cultural identity and traditions that make this Pueblo Mágico what it is.',
    vision:
      'That Zacatlán de las Manzanas becomes recognized worldwide as Mexico’s first Bitcoin Pueblo Mágico and a model of social innovation, where blockchain technology and the circular economy converge to build collective well-being; where every merchant, artisan, student and family holds sovereign control over their own money; and where an organized, educated community inspires other towns across Mexico to follow its example of autonomous, inclusive and sustainable development.',
    modeloTitulo: 'Following the model of',
    referentes: [
      { nombre: 'Bitcoin Beach', lugar: 'El Salvador' },
      { nombre: 'Bitcoin Jungle', lugar: 'Costa Rica' },
      { nombre: 'Zacatlán de las Manzanas', lugar: 'Puebla, Mexico', activo: true },
    ],
    valoresEyebrow: 'Our values',
    valoresTitulo: 'Seven principles that hold the brigade together',
    valores: [
      { titulo: 'Accessibility', texto: 'Bitcoin is for everyone, whatever their schooling or income.' },
      { titulo: 'Decentralization', texto: 'Empowering the community without depending on middlemen.' },
      { titulo: 'Education', texto: 'Knowledge first, as the basis for responsible adoption.' },
      { titulo: 'Cultural Identity', texto: 'Technology in service of tradition, not against it.' },
      { titulo: 'Financial Sovereignty', texto: 'Every person owns their money and their future.' },
      { titulo: 'Community', texto: 'Change happens collectively, not individually.' },
      { titulo: 'Transparency', texto: 'An open process, measurable and auditable by the community.' },
    ],
    sedeLabel: 'Home base',
    sedeNombre: 'La Cabaña de Satoshi',
    sedeTexto: 'The educational heart of the Bitcoin circular economy in Zacatlán.',
  },

  brigada: {
    eyebrow: 'How the brigade works',
    titulo: 'We don’t give lectures. We knock on doors.',
    bajada:
      'Bitcoin financial education that reaches the shop counter, the kitchen and the classroom — practical, accessible, and without giving up the cultural identity that sets this Pueblo Mágico apart.',
    monedaAlt: 'Spinning Bitcoin coin',
    pasos: [
      {
        titulo: 'We knock',
        texto: 'House by house, shop by shop, hotel by hotel. Nobody has to come looking for us.',
      },
      {
        titulo: 'We explain one to one',
        texto: 'What is Bitcoin and what is it good for? No bank fees, and it protects your income from inflation.',
      },
      {
        titulo: 'We install the wallet',
        texto: 'Downloaded on their own phone and their keys backed up, right there, before we leave.',
      },
      {
        titulo: 'We leave the sign',
        texto: '“Bitcoin accepted here” on the door, and a pin on the public adoption map.',
      },
    ],
  },

  ruta: {
    eyebrow: 'Operating plan',
    tituloDestacado: 'Four weeks',
    tituloB: ', street by street',
    resultado: 'Outcome',
    semanaLabel: 'Week',
    semanas: [
      {
        id: 's1',
        numero: '01',
        nombre: 'Setting up base and first contact',
        fechas: 'August 24 – 28',
        resumen:
          'La Cabaña de Satoshi becomes the educational heart of the Bitcoin Circular Economy, following the model of Bitcoin Beach in El Salvador and Bitcoin Jungle in Costa Rica.',
        bloques: [
          {
            dias: 'Monday',
            titulo: 'Getting the Cabaña ready',
            puntos: [
              'Install equipment: WiFi, projector and whiteboard.',
              'Prepare materials: infographics, printed manuals and “Bitcoin accepted here” signage.',
              'Train 3 local facilitators in Lightning Network and hands-on teaching.',
            ],
          },
          {
            dias: 'Tuesday to Thursday',
            titulo: 'Brigade to merchants and artisans',
            puntos: [
              'Visit 15 key shops a day in the town center: Reloj Floral, Calle del Arco and the municipal market.',
              'One-to-one explanation: what Bitcoin is and what it does — no bank fees, protects your income from inflation.',
              'Invitation to the First Bitcoin Assembly at La Cabaña.',
            ],
          },
          {
            dias: 'Friday',
            titulo: 'Community assembly at La Cabaña de Satoshi',
            puntos: [
              'Talk: “Starting simple — understanding how money works” and “Why Bitcoin?”.',
              'Presentation of the book “Bitcoin Coach” as an essential learning tool.',
              'How to attract the millions of Bitcoiners worldwide. The competitive edge: first Bitcoin-friendly Pueblo Mágico.',
              'Live demo: paying for a purchase over Lightning.',
              'Wallet download and key backup.',
            ],
          },
        ],
        meta: '15 merchants and artisans informed, each with a wallet on their own phone. Community expectation created.',
      },
      {
        id: 's2',
        numero: '02',
        nombre: 'Families, businesses and tourism',
        fechas: 'August 31 – September 4',
        resumen:
          'The brigade takes to the streets: house by house, business by business and hotel by hotel, so Zacatlán is ready to welcome Bitcoin tourism.',
        bloques: [
          {
            dias: 'Monday and Tuesday',
            titulo: 'Brigade to families',
            puntos: [
              'Visit 10 homes a day to speak with a family member.',
              'One-to-one explanation: what Bitcoin is and what it does — no bank fees, protects your income from inflation.',
              'Invitation to the Second Bitcoin Assembly at La Cabaña.',
            ],
          },
          {
            dias: 'Wednesday',
            titulo: 'Brigade to businesses',
            puntos: [
              'Visit 10 local business owners.',
              'One-to-one explanation of Bitcoin and what it means for the business.',
              'Invitation to the Second Bitcoin Assembly at La Cabaña.',
            ],
          },
          {
            dias: 'Thursday',
            titulo: 'Brigade to hotels and tourism services',
            puntos: [
              'Visit 10 local hotels and tourism operators.',
              'One-to-one explanation of Bitcoin and its benefits.',
              'Invitation to the Second Bitcoin Assembly at La Cabaña.',
            ],
          },
          {
            dias: 'Friday',
            titulo: 'Second assembly at La Cabaña de Satoshi',
            puntos: [
              'Talk: “Starting simple” and “Why Bitcoin?”.',
              'Presentation of the book “Bitcoin Coach”.',
              'Live demo: paying for a purchase over Lightning.',
              'Wallet downloads and key backups.',
            ],
          },
        ],
        meta: '10 families with their own wallet, and 21 hotels, restaurants and tourism operators ready to serve Bitcoin travelers.',
      },
      {
        id: 's3',
        numero: '03',
        nombre: 'Universities and Unlock Summit 2026',
        fechas: 'September 7 – 13',
        resumen:
          'The university route meets the 4th edition of Unlock Summit: three days of talks, workshops and an Investor House stand with the “Bitcoin Coach” books.',
        bloques: [
          {
            dias: 'Monday to Wednesday',
            titulo: 'University route',
            puntos: [
              'The history of money, up to Bitcoin.',
              'Bitcoin as protection for your savings: 21 million units, nobody controls it.',
              'Presentation of the book “Bitcoin Coach” as an essential learning tool.',
              'Hands-on: download a wallet and back up your keys.',
            ],
          },
          {
            dias: 'Thursday',
            titulo: 'Welcome dinner — Unlock Summit 2026',
            puntos: [
              'Screening of the Bitcoin Circular Economy project in Zacatlán de las Manzanas.',
              'Progress report from the Bitcoin Education Brigade.',
              'Presentation of the book “Bitcoin Coach”.',
            ],
          },
          {
            dias: 'Friday and Saturday',
            titulo: 'Day 1 and 2 — Unlock Summit 2026',
            puntos: [
              'Investor House stand with “Bitcoin Coach” books.',
              'Presentation of the Bitcoin Circular Economy project.',
              'Talks and workshops on Bitcoin.',
              'Wallet downloads and key backups.',
            ],
          },
          {
            dias: 'Sunday',
            titulo: 'Day 3 — Consciousness Brunch',
            puntos: [
              'Investor House stand with “Bitcoin Coach” books.',
              'Book presentation, and how Bitcoin is part of the awakening of consciousness.',
            ],
          },
        ],
        meta: '40 students with a wallet for their savings, and 50 women with a wallet for theirs.',
      },
      {
        id: 's4',
        numero: '04',
        nombre: 'Consolidation and measurement',
        fechas: 'September 14 – 20',
        resumen:
          'Follow-up with the pioneers, signage installed, a public adoption map, and a closing assembly that leaves the model documented and repeatable.',
        bloques: [
          {
            dias: 'Monday to Thursday',
            titulo: 'Expansion to more shops',
            puntos: [
              'Team split into 3 groups to visit and follow up with Zacatlán’s Bitcoin pioneers.',
              'Signage installed and everyone who adopted Bitcoin added to the public map.',
              'Invitation to the closing assembly.',
            ],
          },
          {
            dias: 'Friday',
            titulo: 'Grand closing assembly',
            puntos: [
              'Presentation of the results achieved.',
              'Identifying local leaders to carry the project forward.',
              'Establishing a permanent Bitcoiner in Residence.',
              'A celebration for the completion of the first Bitcoin Education Brigade.',
            ],
          },
        ],
        meta: '21 shops running on Lightning. A documented, repeatable model and a self-sustaining community.',
      },
    ],
  },

  mapa: {
    eyebrow: 'Adoption map',
    titulo: 'Where you can pay with Bitcoin',
    bajada:
      'The map fills up as the brigade advances. Every pin is a shop that accepted Bitcoin, put up its sign and registered publicly.',
    contadorLabel: 'shops registered',
    contadorMeta: 'goal at close',
    vacioTitulo: 'No shops registered yet',
    vacioTexto:
      'The brigade starts on August 24, 2026. The first pins will appear during week 1, as shops in the town center put up their signage.',
    rutaTitulo: 'Brigade route',
    rutaTexto: 'The three points where the walk begins in week 1.',
    leyendaActivo: 'Accepts Bitcoin',
    leyendaRuta: 'Route point',
    comoRegistrarse: 'Run a business in Zacatlán?',
    comoRegistrarseTexto: 'Write to us and we’ll come by to train you and add you to the map.',
    atribucion: 'Map © OpenStreetMap contributors · Tiles © CARTO',
  },

  metas: {
    eyebrow: 'Measurable goals',
    titulo: 'What stays behind on day 28',
    bajada:
      'Every number is recorded on a public adoption map. The process is open, measurable and auditable by the community.',
    items: [
      { valor: 21, label: 'Shops running on Lightning', nota: 'Goal at the close of week 4' },
      { valor: 50, label: 'Women with their own wallet', nota: 'Consciousness Brunch · Unlock Summit' },
      { valor: 40, label: 'Students with a wallet', nota: 'University route · week 3' },
      { valor: 15, label: 'Merchants and artisans', nota: 'First assembly · week 1' },
      { valor: 10, label: 'Families trained', nota: 'Door-to-door brigade · week 2' },
      { valor: 21, label: 'Hotels and tourism services', nota: 'Ready for Bitcoin travelers' },
    ],
    equipoTitulo: 'People and responsibility',
    equipo: [
      { rol: 'General Coordinator', detalle: 'Logistics, partnerships and measurement.', cantidad: '1' },
      { rol: 'Facilitators', detalle: 'Workshops, technical support and brigades.', cantidad: '3' },
      { rol: 'Volunteer assistants', detalle: 'Support with logistics and registration.', cantidad: '3' },
    ],
    recursosTitulo: 'What it takes',
    recursos: [
      'Base cabin equipped with WiFi and a projector.',
      'Printed material: signage, infographics and manuals.',
      '“Bitcoin accepted here” signage and registration on the public adoption map.',
    ],
    presupuestoLabel: 'Execution\nbudget',
  },

  prensa: {
    eyebrow: 'Media impact',
    titulo: 'The world is already watching Zacatlán',
    intro:
      'Since the project was announced, international outlets such as Crypto India Magazine have interviewed us to learn more about emerging Bitcoin circular economies — a sign of how much interest there is in this kind of initiative.',
    puntos: [
      'Documenting the project throughout will give worldwide visibility to everyone taking part, drawing brands and media from around the world interested in backing educational projects that push technological development in Mexico’s municipalities.',
      'We already have the backing of the Government of the State of Puebla and nearby municipalities with Pueblo Mágico status who are interested in what we are doing.',
      'A documentary about the wider project is in the works: a unique and enormous visibility opportunity for partner brands that decide to come on board as sponsors.',
    ],
    enMedios: 'In the media',
    medio: 'Crypto India Magazine',
    nota: 'Published on August 15, 2026 in Crypto India Magazine.',
    cita:
      'An interview on emerging Bitcoin circular economies and the role of Zacatlán de las Manzanas as a case study.',
    respaldoTitulo: 'Institutional backing',
    respaldos: [
      { nombre: 'Government of the State of Puebla', estado: 'Confirmed' },
      { nombre: 'Nearby Pueblo Mágico municipalities', estado: 'Interested' },
      { nombre: 'Documentary on the wider project', estado: 'In progress' },
    ],
  },

  aliados: {
    titulo: 'Project partners',
    lista: [
      { nombre: 'Escuela Bitcoin México', img: '/img/logo-escuela-bitcoin.png', alto: 'h-16 sm:h-20' },
      { nombre: 'Investor House', img: '/img/logo-investor-house.png', alto: 'h-12 sm:h-14' },
      { nombre: 'Unlock Summit 4th Edition', img: '/img/logo-unlock-summit.png', alto: 'h-10 sm:h-12' },
      { nombre: 'Unlock Agency', img: '/img/logo-unlock-agency.png', alto: 'h-10 sm:h-12' },
    ],
  },

  donar: {
    eyebrow: 'Every satoshi counts',
    titulo: 'Fund a whole brigade',
    bajada:
      'The project’s execution budget is $1,000 USD: the cabin equipped, the printed material, and the facilitators’ stipends across the four weeks.',
    escanea: 'Scan to donate over Lightning',
    copiar: 'Copy address',
    copiado: 'Copied',
    sinConfigurar: 'Lightning address not configured yet',
    sinConfigurarTexto:
      'Add your Lightning address in src/config/donaciones.ts to switch this section on.',
    destinoTitulo: 'Where every satoshi goes',
    destino: [
      { concepto: 'Getting the Cabaña ready', detalle: 'WiFi, projector and whiteboard.' },
      { concepto: 'Printed material', detalle: 'Signage, infographics and manuals.' },
      { concepto: 'Facilitator stipends', detalle: 'Three people across four weeks.' },
      { concepto: 'Brigade logistics', detalle: 'Transport and map registration.' },
    ],
    nota: 'We do not convert donations to pesos. The sats go straight into the project.',
  },

  contacto: {
    arrancaEn: 'The brigade starts in',
    enMarcha: 'The brigade is under way',
    unidades: { dias: 'days', horas: 'hours', minutos: 'min', segundos: 'sec' },
    eyebrow: 'Join in',
    tituloA: 'Your brand can be in the',
    tituloDestacado: 'first Bitcoin Pueblo Mágico',
    bajada:
      'A documentary, international coverage, and a whole community learning to use Bitcoin. Write to us for the sponsorship packages.',
    ctaPrimario: 'Review the operating plan',
    ctaSecundario: 'See the coverage',
    nombre: 'Steph Serrano',
    rol: 'General coordination · Bitcoin Education Brigade',
    canal: 'WhatsApp contact',
    qrTexto: 'Scan the code with your phone camera to reach us.',
  },

  footer: {
    descripcion: (inicio: string, fin: string) =>
      `Bitcoin Education Brigade · Zacatlán de las Manzanas, Sierra Norte de Puebla. From ${inicio} to ${fin}.`,
    lema: 'An open process, measurable and auditable by the community.',
  },
};
