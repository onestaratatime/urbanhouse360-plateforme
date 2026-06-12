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

  // PÉRIPHÉRIE
  {
    slug: 'blagnac',
    nom: 'Blagnac',
    secteur: 'Périphérie',
    coords: [43.6365, 1.3895]
  },
  {
    slug: 'colomiers',
    nom: 'Colomiers',
    secteur: 'Périphérie',
    coords: [43.6105, 1.3355]
  },
  {
    slug: 'tournefeuille',
    nom: 'Tournefeuille',
    secteur: 'Périphérie',
    coords: [43.5845, 1.3425]
  },
  {
    slug: 'balma',
    nom: 'Balma',
    secteur: 'Périphérie',
    coords: [43.6115, 1.4985]
  },
  {
    slug: 'lunion',
    nom: 'L\'Union',
    secteur: 'Périphérie',
    coords: [43.6545, 1.4825]
  },
  {
    slug: 'ramonville-saint-agne',
    nom: 'Ramonville-Saint-Agne',
    secteur: 'Périphérie',
    coords: [43.5445, 1.4745]
  },
  {
    slug: 'saint-orens',
    nom: 'Saint-Orens',
    secteur: 'Périphérie',
    coords: [43.5535, 1.5285]
  },
  {
    slug: 'cugnaux',
    nom: 'Cugnaux',
    secteur: 'Périphérie',
    coords: [43.5365, 1.3485]
  },
  {
    slug: 'castanet-tolosan',
    nom: 'Castanet-Tolosan',
    secteur: 'Périphérie',
    coords: [43.5155, 1.4985]
  }
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
  return QUARTIERS.find(q => q.slug === slug);
}

// Fonction pour générer un jitter déterministe basé sur l'ID
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
