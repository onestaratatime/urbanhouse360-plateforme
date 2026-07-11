export interface Quartier {
  slug: string;
  nom: string;
  secteur: string;
  coords: [number, number]; // [lat, lng]
}

export const QUARTIERS: Quartier[] = [
  // CENTRE
  {
    slug: 'capitole',
    nom: 'Capitole',
    secteur: 'Centre',
    coords: [43.6045, 1.4442]
  },
  {
    slug: 'carmes',
    nom: 'Carmes',
    secteur: 'Centre',
    coords: [43.5978, 1.4428]
  },
  {
    slug: 'saint-etienne',
    nom: 'Saint-Étienne',
    secteur: 'Centre',
    coords: [43.5995, 1.4388]
  },
  {
    slug: 'saint-georges',
    nom: 'Saint-Georges',
    secteur: 'Centre',
    coords: [43.5948, 1.4475]
  },
  {
    slug: 'les-chalets',
    nom: 'Les Chalets',
    secteur: 'Centre',
    coords: [43.6012, 1.4515]
  },
  {
    slug: 'saint-aubin-dupuy',
    nom: 'Saint-Aubin / Dupuy',
    secteur: 'Centre',
    coords: [43.6095, 1.4398]
  },
  {
    slug: 'busca',
    nom: 'Busca',
    secteur: 'Centre',
    coords: [43.6058, 1.4352]
  },
  {
    slug: 'saint-michel',
    nom: 'Saint-Michel',
    secteur: 'Centre',
    coords: [43.5925, 1.4365]
  },

  // RIVE GAUCHE
  {
    slug: 'saint-cyprien',
    nom: 'Saint-Cyprien',
    secteur: 'Rive gauche',
    coords: [43.6015, 1.4275]
  },
  {
    slug: 'patte-doie',
    nom: 'Patte d\'Oie',
    secteur: 'Rive gauche',
    coords: [43.6125, 1.4182]
  },
  {
    slug: 'arenes',
    nom: 'Arènes',
    secteur: 'Rive gauche',
    coords: [43.5985, 1.4195]
  },
  {
    slug: 'croix-de-pierre',
    nom: 'Croix-de-Pierre',
    secteur: 'Rive gauche',
    coords: [43.5892, 1.4248]
  },
  {
    slug: 'fontaine-lestang',
    nom: 'Fontaine-Lestang',
    secteur: 'Rive gauche',
    coords: [43.5835, 1.4125]
  },

  // NORD
  {
    slug: 'compans-caffarelli',
    nom: 'Compans-Caffarelli',
    secteur: 'Nord',
    coords: [43.6105, 1.4342]
  },
  {
    slug: 'minimes',
    nom: 'Minimes',
    secteur: 'Nord',
    coords: [43.6185, 1.4335]
  },
  {
    slug: 'barriere-de-paris',
    nom: 'Barrière de Paris',
    secteur: 'Nord',
    coords: [43.6245, 1.4265]
  },
  {
    slug: 'lalande',
    nom: 'Lalande',
    secteur: 'Nord',
    coords: [43.6385, 1.4358]
  },
  {
    slug: 'croix-daurade',
    nom: 'Croix-Daurade',
    secteur: 'Nord',
    coords: [43.6425, 1.4585]
  },
  {
    slug: 'borderouge',
    nom: 'Borderouge',
    secteur: 'Nord',
    coords: [43.6485, 1.4448]
  },
  {
    slug: 'trois-cocus',
    nom: 'Trois Cocus',
    secteur: 'Nord',
    coords: [43.6375, 1.4685]
  },

  // EST
  {
    slug: 'marengo-jolimont',
    nom: 'Marengo / Jolimont',
    secteur: 'Est',
    coords: [43.6085, 1.4625]
  },
  {
    slug: 'cote-pavee',
    nom: 'Côte Pavée',
    secteur: 'Est',
    coords: [43.6158, 1.4735]
  },
  {
    slug: 'guilhemery',
    nom: 'Guilheméry',
    secteur: 'Est',
    coords: [43.6025, 1.4685]
  },
  {
    slug: 'roseraie',
    nom: 'Roseraie',
    secteur: 'Est',
    coords: [43.5985, 1.4748]
  },
  {
    slug: 'soupetard',
    nom: 'Soupetard',
    secteur: 'Est',
    coords: [43.5925, 1.4625]
  },
  {
    slug: 'montaudran',
    nom: 'Montaudran',
    secteur: 'Est',
    coords: [43.5795, 1.4785]
  },

  // SUD
  {
    slug: 'empalot',
    nom: 'Empalot',
    secteur: 'Sud',
    coords: [43.5825, 1.4425]
  },
  {
    slug: 'rangueil',
    nom: 'Rangueil',
    secteur: 'Sud',
    coords: [43.5685, 1.4658]
  },
  {
    slug: 'saint-agne',
    nom: 'Saint-Agne',
    secteur: 'Sud',
    coords: [43.5738, 1.4485]
  },
  {
    slug: 'pont-des-demoiselles',
    nom: 'Pont des Demoiselles',
    secteur: 'Sud',
    coords: [43.5865, 1.4555]
  },
  {
    slug: 'pouvourville',
    nom: 'Pouvourville',
    secteur: 'Sud',
    coords: [43.5595, 1.4385]
  },

  // OUEST
  {
    slug: 'purpan',
    nom: 'Purpan',
    secteur: 'Ouest',
    coords: [43.6165, 1.4085]
  },
  {
    slug: 'saint-martin-du-touch',
    nom: 'Saint-Martin-du-Touch',
    secteur: 'Ouest',
    coords: [43.6015, 1.3985]
  },
  {
    slug: 'lardenne',
    nom: 'Lardenne',
    secteur: 'Ouest',
    coords: [43.6235, 1.3885]
  },
  {
    slug: 'saint-simon',
    nom: 'Saint-Simon',
    secteur: 'Ouest',
    coords: [43.5825, 1.3985]
  },
  {
    slug: 'mirail',
    nom: 'Mirail',
    secteur: 'Ouest',
    coords: [43.5715, 1.3845]
  },
  {
    slug: 'bagatelle',
    nom: 'Bagatelle',
    secteur: 'Ouest',
    coords: [43.5895, 1.4085]
  },

  // Note : les villes de proche périphérie (Blagnac, Colomiers, Tournefeuille,
  // Balma, Ramonville, Cugnaux, Castanet-Tolosan, Saint-Orens…) sont définies dans
  // VILLES_PERIPHERIQUES avec un secteur plus précis (Ouest, Est, Sud-Est…).
  // Ne pas les redupliquer ici : cela créerait des slugs en double.
];

// Groupement par secteur pour l'affichage dans le formulaire
export const QUARTIERS_PAR_SECTEUR = QUARTIERS.reduce((acc, quartier) => {
  if (!acc[quartier.secteur]) {
    acc[quartier.secteur] = [];
  }
  acc[quartier.secteur].push(quartier);
  return acc;
}, {} as Record<string, Quartier[]>);

// Fonction utilitaire pour récupérer un quartier par slug
export function getQuartierBySlug(slug: string): Quartier | undefined {
  return TOUTES_LOCALISATIONS.find(q => q.slug === slug);
}

// Fonction pour générer un jitter déterministe basé sur l'ID
// Villes périphériques de Toulouse (50km autour)
export const VILLES_PERIPHERIQUES: Quartier[] = [
  // Ouest (10-20km)
  {
    slug: 'blagnac',
    nom: 'Blagnac',
    secteur: 'Périphérie Ouest',
    coords: [43.6364, 1.3892]
  },
  {
    slug: 'colomiers',
    nom: 'Colomiers',
    secteur: 'Périphérie Ouest',
    coords: [43.6107, 1.3343]
  },
  {
    slug: 'tournefeuille',
    nom: 'Tournefeuille',
    secteur: 'Périphérie Ouest',
    coords: [43.5847, 1.3437]
  },
  {
    slug: 'plaisance-du-touch',
    nom: 'Plaisance-du-Touch',
    secteur: 'Périphérie Ouest',
    coords: [43.5628, 1.2989]
  },
  {
    slug: 'cornebarrieu',
    nom: 'Cornebarrieu',
    secteur: 'Périphérie Ouest',
    coords: [43.6506, 1.3286]
  },
  {
    slug: 'mondonville',
    nom: 'Mondonville',
    secteur: 'Périphérie Ouest',
    coords: [43.6714, 1.2842]
  },

  // Sud-Ouest (10-30km)
  {
    slug: 'cugnaux',
    nom: 'Cugnaux',
    secteur: 'Périphérie Sud-Ouest',
    coords: [43.5367, 1.3453]
  },
  {
    slug: 'villeneuve-tolosane',
    nom: 'Villeneuve-Tolosane',
    secteur: 'Périphérie Sud-Ouest',
    coords: [43.5253, 1.3392]
  },
  {
    slug: 'frouzins',
    nom: 'Frouzins',
    secteur: 'Périphérie Sud-Ouest',
    coords: [43.5189, 1.3306]
  },
  {
    slug: 'seysses',
    nom: 'Seysses',
    secteur: 'Périphérie Sud-Ouest',
    coords: [43.4983, 1.3128]
  },

  // Est (5-20km)
  {
    slug: 'balma',
    nom: 'Balma',
    secteur: 'Périphérie Est',
    coords: [43.6111, 1.4989]
  },
  {
    slug: 'lunion',
    nom: 'L\'Union',
    secteur: 'Périphérie Est',
    coords: [43.6545, 1.4825]
  },
  {
    slug: 'quint-fonsegrives',
    nom: 'Quint-Fonsegrives',
    secteur: 'Périphérie Est',
    coords: [43.5886, 1.5208]
  },
  {
    slug: 'pins-justaret',
    nom: 'Pins-Justaret',
    secteur: 'Périphérie Est',
    coords: [43.4992, 1.4414]
  },

  // Sud-Est (10-25km)
  {
    slug: 'ramonville-saint-agne',
    nom: 'Ramonville-Saint-Agne',
    secteur: 'Périphérie Sud-Est',
    coords: [43.5461, 1.4733]
  },
  {
    slug: 'saint-orens-de-gameville',
    nom: 'Saint-Orens-de-Gameville',
    secteur: 'Périphérie Sud-Est',
    coords: [43.5514, 1.5342]
  },
  {
    slug: 'labege',
    nom: 'Labège',
    secteur: 'Périphérie Sud-Est',
    coords: [43.5405, 1.5144]
  },
  {
    slug: 'castanet-tolosan',
    nom: 'Castanet-Tolosan',
    secteur: 'Périphérie Sud-Est',
    coords: [43.5156, 1.4981]
  },
  {
    slug: 'escalquens',
    nom: 'Escalquens',
    secteur: 'Périphérie Sud-Est',
    coords: [43.5192, 1.5631]
  },
  {
    slug: 'auzeville-tolosane',
    nom: 'Auzeville-Tolosane',
    secteur: 'Périphérie Sud-Est',
    coords: [43.5281, 1.4842]
  },
  {
    slug: 'pechbonnieu',
    nom: 'Pechbonnieu',
    secteur: 'Périphérie Sud-Est',
    coords: [43.7031, 1.4561]
  },

  // Nord-Est (10-20km)
  {
    slug: 'l-union',
    nom: 'L\'Union',
    secteur: 'Périphérie Nord-Est',
    coords: [43.6594, 1.4853]
  },
  {
    slug: 'launaguet',
    nom: 'Launaguet',
    secteur: 'Périphérie Nord-Est',
    coords: [43.6778, 1.4536]
  },
  {
    slug: 'castelginest',
    nom: 'Castelginest',
    secteur: 'Périphérie Nord-Est',
    coords: [43.6939, 1.4300]
  },

  // Nord (10-20km)
  {
    slug: 'aucamville',
    nom: 'Aucamville',
    secteur: 'Périphérie Nord',
    coords: [43.6711, 1.4289]
  },
  {
    slug: 'fenouillet',
    nom: 'Fenouillet',
    secteur: 'Périphérie Nord',
    coords: [43.6833, 1.3972]
  },
  {
    slug: 'saint-jory',
    nom: 'Saint-Jory',
    secteur: 'Périphérie Nord',
    coords: [43.7578, 1.3639]
  },
  {
    slug: 'gratentour',
    nom: 'Gratentour',
    secteur: 'Périphérie Nord',
    coords: [43.7208, 1.4256]
  },
  {
    slug: 'saint-alban',
    nom: 'Saint-Alban',
    secteur: 'Périphérie Nord',
    coords: [43.6914, 1.4139]
  },

  // Nord-Ouest (10-20km)
  {
    slug: 'saint-jean',
    nom: 'Saint-Jean',
    secteur: 'Périphérie Nord-Ouest',
    coords: [43.6639, 1.5050]
  },
  {
    slug: 'gagnac-sur-garonne',
    nom: 'Gagnac-sur-Garonne',
    secteur: 'Périphérie Nord-Ouest',
    coords: [43.7000, 1.3667]
  },
  {
    slug: 'seilh',
    nom: 'Seilh',
    secteur: 'Périphérie Nord-Ouest',
    coords: [43.6969, 1.3567]
  },

  // Sud (15-30km)
  {
    slug: 'portet-sur-garonne',
    nom: 'Portet-sur-Garonne',
    secteur: 'Périphérie Sud',
    coords: [43.5228, 1.4069]
  },
  {
    slug: 'muret',
    nom: 'Muret',
    secteur: 'Périphérie Sud',
    coords: [43.4644, 1.3267]
  },
  {
    slug: 'roques',
    nom: 'Roques',
    secteur: 'Périphérie Sud',
    coords: [43.5083, 1.3642]
  },
  {
    slug: 'pinsaguel',
    nom: 'Pinsaguel',
    secteur: 'Périphérie Sud',
    coords: [43.5058, 1.3928]
  },

  // Plus loin (20-50km) - Villes importantes
  {
    slug: 'leguevin',
    nom: 'Léguevin',
    secteur: 'Périphérie 20-50km',
    coords: [43.5989, 1.2328]
  },
  {
    slug: 'pibrac',
    nom: 'Pibrac',
    secteur: 'Périphérie 20-50km',
    coords: [43.6192, 1.2867]
  },
  {
    slug: 'aussonne',
    nom: 'Aussonne',
    secteur: 'Périphérie 20-50km',
    coords: [43.6833, 1.3167]
  },
  {
    slug: 'saint-lys',
    nom: 'Saint-Lys',
    secteur: 'Périphérie 20-50km',
    coords: [43.5144, 1.1756]
  },
  {
    slug: 'montgiscard',
    nom: 'Montgiscard',
    secteur: 'Périphérie 20-50km',
    coords: [43.4558, 1.5883]
  },
  {
    slug: 'verfeil',
    nom: 'Verfeil',
    secteur: 'Périphérie 20-50km',
    coords: [43.6564, 1.6539]
  },
  {
    slug: 'grenade',
    nom: 'Grenade',
    secteur: 'Périphérie 20-50km',
    coords: [43.7731, 1.2919]
  },
  {
    slug: 'revel',
    nom: 'Revel',
    secteur: 'Périphérie 20-50km',
    coords: [43.4578, 2.0047]
  },
  {
    slug: 'carbonne',
    nom: 'Carbonne',
    secteur: 'Périphérie 20-50km',
    coords: [43.2972, 1.2244]
  },
  {
    slug: 'auterive',
    nom: 'Auterive',
    secteur: 'Périphérie 20-50km',
    coords: [43.3500, 1.4744]
  }
];

// Toutes les localisations (quartiers + villes)
export const TOUTES_LOCALISATIONS = [...QUARTIERS, ...VILLES_PERIPHERIQUES];

export function getJitteredCoords(
  coords: [number, number],
  id: string,
  maxOffsetKm: number = 0.3
): [number, number] {
  // Convertir l'ID en nombre déterministe
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }

  // Générer des offsets pseudo-aléatoires mais déterministes
  const offsetLat = ((hash % 1000) / 1000 - 0.5) * (maxOffsetKm / 111); // ~111km par degré de latitude
  const offsetLng = (((hash >> 10) % 1000) / 1000 - 0.5) * (maxOffsetKm / (111 * Math.cos(coords[0] * Math.PI / 180)));

  return [
    coords[0] + offsetLat,
    coords[1] + offsetLng
  ];
}
