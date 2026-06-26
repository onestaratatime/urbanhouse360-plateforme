import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  console.error('Assurez-vous que .env.local contient :');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL');
  console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Quartiers de Toulouse
const QUARTIERS = [
  { slug: 'capitole', nom: 'Capitole' },
  { slug: 'jean-jaures', nom: 'Jean Jaurès' },
  { slug: 'carmes', nom: 'Les Carmes' },
  { slug: 'saint-cyprien', nom: 'Saint-Cyprien' },
  { slug: 'arnaud-bernard', nom: 'Arnaud Bernard' },
  { slug: 'esquirol', nom: 'Esquirol' },
  { slug: 'compans-caffarelli', nom: 'Compans-Caffarelli' },
  { slug: 'saint-aubin-dupuy', nom: 'Saint-Aubin-Dupuy' },
  { slug: 'amidonniers', nom: 'Amidonniers' },
  { slug: 'minimes', nom: 'Minimes' },
  { slug: 'guilheméry', nom: 'Guilheméry' },
  { slug: 'purpan', nom: 'Purpan' },
  { slug: 'lalande', nom: 'Lalande' },
  { slug: 'barriere-de-paris', nom: 'Barrière de Paris' },
  { slug: 'croix-daurade', nom: 'Croix-Daurade' },
  { slug: 'roseraie', nom: 'Roseraie' },
  { slug: 'sept-deniers', nom: 'Sept Deniers' },
  { slug: 'bonnefoy', nom: 'Bonnefoy' },
  { slug: 'côte-pavée', nom: 'Côte Pavée' },
  { slug: 'fontaine-lestang', nom: 'Fontaine Lestang' },
  { slug: 'casselardit', nom: 'Casselardit' },
  { slug: 'empalot', nom: 'Empalot' },
  { slug: 'saint-agne', nom: 'Saint-Agne' },
  { slug: 'nuit-de-mai', nom: 'Nuit de Mai' },
  { slug: 'sauzelong', nom: 'Sauzelong' },
  { slug: 'saint-michel', nom: 'Saint-Michel' },
  { slug: 'busca', nom: 'Busca' },
  { slug: 'ramonville', nom: 'Ramonville' }
];

// Prénoms réalistes français
const PRENOMS = [
  'Sophie', 'Thomas', 'Marie', 'Lucas', 'Emma', 'Hugo', 'Léa', 'Mathis',
  'Chloé', 'Alexandre', 'Camille', 'Nicolas', 'Julie', 'Antoine', 'Sarah',
  'Maxime', 'Laura', 'Pierre', 'Manon', 'Paul', 'Océane', 'Julien', 'Clara'
];

// Générateur aléatoire
function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(array: T[]): T {
  return array[random(0, array.length - 1)];
}

function randomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Générateur d'acquéreur test
function generateTestAcquereur(index: number) {
  const prenom = PRENOMS[index % PRENOMS.length];

  // Quartiers (1 à 4 quartiers aléatoires)
  const nbQuartiers = random(1, 4);
  const quartiers = randomItems(QUARTIERS.map(q => q.slug), nbQuartiers);

  // Type de projet
  const typesProjets = ['residence_principale', 'residence_secondaire', 'investissement'] as const;
  const type_projet = randomItem([...typesProjets]);

  // Nature du projet
  const naturesProjet = ['primo_accedant', 'deuxieme_achat', 'investisseur', 'autre'] as const;
  const nature_projet = random(0, 10) > 3 ? randomItem([...naturesProjet]) : undefined;

  // Timing
  const timings = ['court_terme', 'moyen_terme', 'long_terme'] as const;
  const timing = randomItem([...timings]);

  // Types de bien (1 à 2)
  const typesBien = ['appartement', 'maison', 'terrain'] as const;
  const nbTypesBien = random(1, 2);
  const types_bien = randomItems([...typesBien], nbTypesBien);

  // Profil
  const profils = ['individuel', 'couple', 'famille', 'investisseur', 'residence_secondaire'] as const;
  const profil = randomItem([...profils]);

  // Surface (50 à 200 m²)
  const surface_min = random(0, 10) > 2 ? random(5, 20) * 10 : undefined;

  // Pièces (1 à 5)
  const pieces_min = random(0, 10) > 3 ? random(1, 5) : undefined;

  // Budget (150k à 800k)
  const budget_max = random(0, 10) > 2 ? random(15, 80) * 10000 : undefined;

  // Critères principaux (0 à 4)
  const criteresPossibles = ['terrasse', 'balcon', 'jardin', 'plain_pied', 'etage_eleve', 'ascenseur', 'parking', 'garage'];
  const nbCriteres = random(0, 4);
  const criteres_principaux = nbCriteres > 0 ? randomItems(criteresPossibles, nbCriteres) : undefined;

  // Descriptions variées
  const descriptions = [
    'Recherche bien lumineux avec vue dégagée',
    'Idéalement proche des commerces et transports',
    'Quartier calme et familial souhaité',
    'Proche écoles et espaces verts',
    'Bien avec cachet, possibilité travaux',
    'Recherche investissement locatif rentable',
    'Pied-à-terre pour déplacements professionnels',
    'Maison avec jardin pour enfants',
    'Appartement moderne avec parking',
    'Bien avec possibilité d\'extension',
    'Proche métro ligne A ou B',
    'Quartier dynamique avec commerces',
    'Calme, lumineux, bien entretenu',
    'Potentiel locatif étudiant',
    'Résidence récente avec ascenseur',
    'Maison de ville avec cour',
    'Studio ou T2 bien placé',
    'Duplex ou triplex avec caractère',
    'Bien atypique avec charme',
    'Proche centre-ville, toutes commodités',
    'Résidence sécurisée avec parking',
    'Maison rénovée, prête à habiter',
    'Terrain constructible viabilisé'
  ];

  return {
    test: true,
    source: 'claude_code' as const,
    prenom: prenom + ' (Test)',
    email: `test.${prenom.toLowerCase()}.${index}@exemple.fr`,
    telephone: `06${random(10, 99)}${random(10, 99)}${random(10, 99)}${random(10, 99)}`,
    consentement_contact: true,
    quartiers,
    precision_localisation: random(0, 10) > 7 ? `Secteur ${randomItem(quartiers)}` : null,
    type_projet,
    nature_projet: nature_projet || null,
    timing,
    types_bien,
    profil,
    surface_min: surface_min || null,
    pieces_min: pieces_min || null,
    budget_max: budget_max || null,
    criteres_principaux: criteres_principaux || null,
    criteres_principaux_autre: random(0, 10) > 7 ? 'Double vitrage, fibre optique' : null,
    criteres_secondaires: random(0, 10) > 5 ? randomItem(descriptions) : null,
    description_projet: randomItem(descriptions),
    actif: true
  };
}

async function createTestAcquereurs() {
  console.log('🚀 Création de 23 acquéreurs test...\n');

  const acquereurs = [];
  for (let i = 0; i < 23; i++) {
    acquereurs.push(generateTestAcquereur(i));
  }

  // Insertion en lot
  const { data, error } = await supabaseAdmin
    .from('acquereurs')
    .insert(acquereurs)
    .select('id');

  if (error) {
    console.error('❌ Erreur lors de l\'insertion :', error);
    process.exit(1);
  }

  console.log(`✅ ${data?.length} acquéreurs test créés avec succès !`);
  console.log('\nRécapitulatif :');
  console.log(`  - test: true`);
  console.log(`  - source: claude_code`);
  console.log(`  - Quartiers: répartis aléatoirement sur Toulouse`);
  console.log(`  - Profils: individuel, couple, famille, investisseur, résidence secondaire`);
  console.log(`  - Budgets: de 150k€ à 800k€`);
  console.log(`  - Surfaces: de 50m² à 200m²`);
  console.log('\n🗺️  Vérifiez la carte pour voir tous les nouveaux profils !');
}

createTestAcquereurs();
