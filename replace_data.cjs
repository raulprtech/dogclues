const fs = require('fs');
const content = fs.readFileSync('src/lib/data.ts', 'utf-8');

const newPlaces = `export const PLACES: Place[] = [
  {
    id: 'lugar-1',
    name: 'Baluarte de San Carlos',
    slug: 'baluarte-san-carlos',
    categoryId: 'turismo',
    zone: 'Centro Histórico',
    description: 'Uno de los principales baluartes de la ciudad, alberga el museo de la ciudad.',
    footprints: 3,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0807-09.jpg',
    address: 'Circuito Baluartes, Centro'
  },
  {
    id: 'lugar-2',
    name: 'Fuerte de San Miguel',
    slug: 'fuerte-san-miguel',
    categoryId: 'turismo',
    zone: 'Resurgimiento',
    description: 'Impresionante fortaleza que alberga el Museo Arqueológico de Campeche.',
    footprints: 3,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0826.jpg',
    address: 'Av. Escénica s/n'
  },
  {
    id: 'lugar-3',
    name: 'El Malecón de Campeche',
    slug: 'malecon-campeche',
    categoryId: 'experiencias',
    zone: 'Malecón',
    description: 'El lugar perfecto para caminar al atardecer y disfrutar de la brisa marina.',
    footprints: 3,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/86/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0850.jpg',
    address: 'Av. Justo Sierra Mendez'
  },
  {
    id: 'lugar-4',
    name: 'Los Cocteleros',
    slug: 'los-cocteleros',
    categoryId: 'restaurantes',
    zone: 'Malecón',
    description: 'La zona tradicional por excelencia para disfrutar de los mejores cocteles de mariscos a la orilla del mar.',
    footprints: 2,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Campeche_Campeche_Nov_2018_01.jpg',
    address: 'Av. Resurgimiento'
  },
  {
    id: 'lugar-5',
    name: 'Playa Bonita',
    slug: 'playa-bonita',
    categoryId: 'experiencias',
    zone: 'Lerma',
    description: 'El principal balneario inclusivo de la ciudad, ideal para pasar el día en familia.',
    footprints: 2,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/54/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_1.jpg',
    address: 'Carretera a Lerma'
  },
  {
    id: 'lugar-6',
    name: 'Los Cacitos',
    slug: 'los-cacitos',
    categoryId: 'cocina-campechana',
    zone: 'Centro Histórico',
    description: 'Lugar de tradición para disfrutar de antojitos típicos campechanos, frappes y esquites.',
    footprints: 2,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_9.jpg',
    address: 'Centro Histórico'
  },
  {
    id: 'lugar-7',
    name: 'La Pagoda',
    slug: 'la-pagoda',
    categoryId: 'restaurantes',
    zone: 'Centro Histórico',
    description: 'Un clásico de la ciudad, conocido por su sazón tradicional y ambiente local.',
    footprints: 2,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0789.jpg',
    address: 'Calle 10, Centro'
  },
  {
    id: 'lugar-8',
    name: 'Gambos',
    slug: 'gambos',
    categoryId: 'restaurantes',
    zone: 'Malecón',
    description: 'Excelente lugar para disfrutar comida local y mariscos con un gran ambiente frente al mar.',
    footprints: 2,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0793.jpg',
    address: 'Malecón'
  },
  {
    id: 'lugar-9',
    name: 'El Son Jarocho',
    slug: 'el-son-jarocho',
    categoryId: 'restaurantes',
    zone: 'Malecón',
    description: 'Tradición y sabor en antojitos, comida mexicana y mariscos deliciosos.',
    footprints: 2,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/15-07-15-Centro_hist%C3%B3rico_de_San_Francisco_de_Campeche-RalfR-WMA_0817.jpg',
    address: 'Malecón'
  }
];`;

const newGuideEditions = `export const GUIDE_EDITIONS: GuideEdition[] = [
  {
    id: 'edicion-fundadora',
    title: 'Selección fundadora Dogclues',
    slug: 'seleccion-fundadora',
    subtitle: 'Lugares icónicos para comenzar a descubrir Campeche',
    description: 'Nuestra curaduría editorial incluye baluartes, museos importantes, el malecón y lugares tradicionales como Los Cocteleros, La Pagoda y Gambos, evitando lugares exclusivos para una experiencia más auténtica.',
    publishedAt: '2023-10-01',
    coverImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/San_Francisco_de_Campeche%2C_Campeche_Mexico%2C_dic_2023_-_12.jpg',
    sponsorId: 'sponsor-1',
    places: ['lugar-1', 'lugar-2', 'lugar-3', 'lugar-4', 'lugar-5', 'lugar-6', 'lugar-7', 'lugar-8', 'lugar-9']
  }
];`;

let newContent = content.replace(/export const PLACES: Place\[\] = \[[\s\S]*?\];/, newPlaces);
newContent = newContent.replace(/export const GUIDE_EDITIONS: GuideEdition\[\] = \[[\s\S]*?\];/, newGuideEditions);

fs.writeFileSync('src/lib/data.ts', newContent, 'utf-8');
console.log('Done!');
